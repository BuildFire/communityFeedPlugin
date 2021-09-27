class Posts{
    static TAG = "posts";

    static createPost = (post, user, isPublic = false) =>{
        return new Post({
            userId: !isPublic ? user._id : "publicPost",
            createdBy:!isPublic ? (user.displayName || user.email || "Someone") : "publicPost",
            displayName: !isPublic ? ( user.displayName || user.email || "Someone") : (post.title || buildfire.getContext().title || buildfire.getContext().instanceId),
            postText: post.postText || "",
            postImages: post.postImages || [],
            isPublic,
            pluginInstance : {
                pluginInstanceId : post?.pluginInstance?.pluginInstanceId || buildfire.getContext().instanceId,
                pluginInstanceTitle : post?.pluginInstance?.pluginInstanceTitle ||  buildfire.getContext().title || buildfire.getContext().pluginId
            },
            _buildfire:{index : Posts.buildIndex({
                displayName : !isPublic ? (user.displayName || user.username || user.email) : "publicPost" , 
                userId : !isPublic ? user?._id : "publicPost", 
                pluginTitle : buildfire.getContext().title || buildfire.getContext().pluginId,
                isPublic : post?.isPublic ? 1 : 0,
                pluginInstanceId: buildfire.getContext().instanceId
            })}
        })
    }

    static addPost = (post , callback) =>{
        if((!post.postText && !post.postImages) ||  post?.postImages && !Array.isArray(post.postImages) || (post?.postImages && Array.isArray(post.postImages) && post.postImages.length == 0)) return callback({code:errorsList.ERROR_400,message:"Must have atleast post text or post images, post images must be an array of atleast one image url"});
        buildfire.auth.getCurrentUser((err, currentUser) =>{
            if(err || !currentUser) return callback({code: errorsList.ERROR_401,message:"Must be logged in"});
            else if(!(post.postText || (post.postImages && post.postImages.length > 0))) return callback({code:errorsList.ERROR_400,message:"Must have atleast post text or post images, post images must be an array of atleast one image url"});
            post = Posts.createPost(post, currentUser);
            buildfire.appData.insert(post, Posts.TAG, (err, rPost) =>{
                if(err || !rPost) return callback({code:errorsList.ERROR_404,message:"Couldn't find matching data"});
                callback(null, rPost)
            })
        });
    }

    static addPublicPost = (post, callback ) =>{
        if((!post.postText && !post.postImages) ||  post?.postImages && !Array.isArray(post.postImages) || (post?.postImages && Array.isArray(post.postImages) && post.postImages.length == 0)) return callback({code:errorsList.ERROR_400,message:"Must have atleast post text or post images, post images must be an array of atleast one image url"});
        post = Posts.createPost(post,null,true);
        buildfire.appData.insert(post, Posts.TAG, (err, rPost) =>{
            if(err || !rPost) return callback({code:errorsList.ERROR_404,message:"Couldn't find matching data"});
            callback(null, rPost)
        })
    }

    static deletePost = (id, callback) =>{
        buildfire.auth.getCurrentUser((err, currentUser) =>{
            if(err || !currentUser) return callback({code: errorsList.ERROR_401,message:"Must be logged in"});
            buildfire.appData.getById(id, Posts.TAG, (err, r) =>{
                if(err || !r) return callback({code:errorsList.ERROR_404,message:"Couldn't find matching data"});
                else if(r.data.userId != currentUser._id) return callback({code: errorsList.ERROR_402, message: "You are not authorized to modify this post"});
                buildfire.appData.delete(id, Posts.TAG, (err, r) =>{
                    if(err) return console.error(err);
                    callback(r);
                })
            })
        })
    }

    static getPosts = (options , callback) =>{
        let tempArray = [];
        if(!options) tempArray.push({"$json.isPublic" : true});
        else if((options.hasOwnProperty('publicPosts') && options.publicPosts) || !options.hasOwnProperty('publicPosts')) tempArray.push({"$json.isPublic" : true});
        buildfire.auth.getCurrentUser((err, currentUser) =>{
            if(err || !currentUser) buildfire.appData.search({filter : {$or: tempArray} , skip : options?.skip || 0 , limit : options?.limit || 10 , sort:{createdOn : -1}} , Posts.TAG , (e , r) => e ? callback(e , null) : callback(null , r))
            else{
                Follows.getUserFollowData((err , resp) =>{            
                    if( ( (options.hasOwnProperty('byFollowedUsers') && options.byFollowedUsers) || !options.hasOwnProperty('byFollowedUsers')) && resp?.followedUsers) resp.followedUsers.forEach(id => tempArray.push({"_buildfire.index.array1.string1" : `userId_${id}`}));
                    if( ( (options.hasOwnProperty('byFollowedPlugins') && options.byFollowedPlugins) || !options.hasOwnProperty('byFollowedPlugins') ) && resp?.followedPlugins ) resp.followedPlugins.forEach(id => tempArray.push({"_buildfire.index.array1.string1" : `pluginId_${id}`.toLowerCase()}));
                    buildfire.appData.search({filter : {$or: tempArray} , skip : options?.skip || 0 , limit : options?.limit || 10 , sort:{createdOn : -1}} , Posts.TAG , (e , r) => e ? callback(e , null) : callback(null , r))                
                })

            }
        })
        
            
    }

    static updatePost = (id , post , callback) =>{
        if(!id) return callback({code:errorsList.ERROR_400,message:"id cannot be null"});
        if((!post.postText && !post.postImages) ||  post?.postImages && !Array.isArray(post.postImages) || (post?.postImages && Array.isArray(post.postImages) && post.postImages.length == 0)) return callback({code:errorsList.ERROR_400,message:"Must have atleast post text or post images, post images must be an array of atleast one image url"});
        buildfire.auth.getCurrentUser((err, currentUser) => {
            if(err || !currentUser) return callback({code: errorsList.ERROR_401,message:"Must be logged in"});
            buildfire.appData.getById(id , Posts.TAG , (e , r) => {
                if(e) return callback({code:errorsList.ERROR_404,message:"Couldn't find matching data"});
                else if(!r || !r?.data) return callback({code:errorsList.ERROR_404,message:"Couldn't find matching data"});
                else if(r.data.userId != currentUser._id) callback({code: errorsList.ERROR_402, message: "You are not authorized to modify this post"});
                else {
                    buildfire.appData.update( id, {...r.data , postText : post?.postText || "", postImages : post?.postImages || [] , isPublic : post?.isPublic || false}, Posts.TAG, (e , r) => {
                        if(e) return callback({code:errorsList.ERROR_400,message:e});
                        callback(null , r);
                        // buildfire.analytics.trackAction(analyticKeys.POST_postD.key);
                    });
                }
            })


        })

    }



    static buildIndex = data => {
        const index = {
            array1 : [
                {string1 : 'userId_' + data.userId},
                {string1 : 'displayName_' + data.displayName.toLowerCase()},
                {string1 : 'pluginId_' + data.pluginInstanceId.toLowerCase()},
                {string1 : 'pluginTitle_' + data.pluginTitle.toLowerCase()},
                {string1 : 'isPublic_'+ data.isPublic}
            ]
        }
        return index;
    }

}