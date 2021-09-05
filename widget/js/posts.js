class Post {
    constructor(data = {}) {
      this.createdOn = data.createdOn || new Date(); 
      this.createdBy = data.createdBy || this.displayName; 
      this.lastUpdatedOn = data.lastUpdatedOn; 
      this.lastUpdatedBy = data.lastUpdatedBy || null; 
      this.userId = data.userId || null;
      this.displayName = data.displayName || null;
      this.postText = data.postText || null;      
      this.postImages  = data.postImages  || [];          
      this.pluginInstance  = data.pluginInstance || {};     
      this.isPublic = data.isPublic || false;
      this._buildfire = data._buildfire || {};
    }
}

class Posts{
    static TAG = "posts";

    static createPostObj = (post , user) =>{
        if(user && post){
            return new Post({
                userId : user._id,
                displayName : user.displayName || user.username || user.email,
                postText : post?.postText || null,
                postImages : post?.postImages || [],
                isPublic : post?.isPublic || false,
                pluginInstance : {pluginInstanceId : buildfire.context.instanceId,pluginInstanceTitle : buildfire.context.title || buildfire.context.pluginId},
                _buildfire:{index : Posts.buildIndex({displayName : user.displayName || user.username || user.email , userId : user._id , pluginTitle : buildfire.context.title || buildfire.context.pluginId , isPublic : post?.isPublic ? 1 : 0})}
            });
        }
        else {
            return new Post(post)
        }
    }

    static addPost = (post , callback) =>{
        if(!post) return callback("Post cannot be null")
        if(!post.postText && !post.postImages) return callback("Post text cannot be empty");
        let user = authManager.currentUser;
        if(!user) return callback("Must be logged in to add a post");
        buildfire.appData.insert( Posts.createPostObj(post , user) , Posts.TAG , (e , r) => {
            if(e) callback(e);
            else {
                callback(null , r);
                buildfire.analytics.trackAction(analyticKeys.POST_ADDED.key);
            }
        });
    }

    static updatePost = (id , update , callback) =>{
        // checking if logged in
        if(!authManager.currentUser) return callback("Must be logged in to update a post");
        // checking for post id if null
        if(!id) return callback("Post ID cannot be null");
        // checking if postimages exists but not in form of array
        else if(update?.postImages && typeof(update.postImages) !== "undefined" && !Array.isArray(update.postImages)) return callback("Post images must be an array")
        // checking if update is empty (text and images)
        else if(!update || (!update.postText && !update.postImages) || (update.postText == "" && (update.postImages == null || update.postImages.length == 0))) return callback("Post cannot be empty");
        buildfire.appData.getById(id , Posts.TAG , (e , r) => {
            if(e) return callback(e);
            else if(!r && !r.data) return callback("Couldn't find post with this ID.");
            else if(r.data.userId != authManager.currentUser._id) callback("You can only update your own posts.");
            else {
                buildfire.appData.update(
                    id ,
                    Posts.createPostObj({...r.data , postText : update?.postText || "", postImages : update?.postImages || []}) , 
                    Posts.TAG , (e , r) => {
                    if(e) return callback(e);
                    else{
                        callback(null , r);
                        buildfire.analytics.trackAction(analyticKeys.POST_UPDATED.key);
                    } 
                } )
            }
        })

    }

    static getPosts = (options , callback) =>{
        let tempArray = [];
        if((options.hasOwnProperty('publicPosts') && options.publicPosts) || !options.hasOwnProperty('publicPosts')) tempArray.push({"$json.isPublic" : true});
        if(authManager.currentUser){
        Follows.getUserFollowData((err , resp) =>{
                if((options.hasOwnProperty('byFollowedUsers') && options.byFollowedUsers) || !options.hasOwnProperty('byFollowedUsers')) resp.followedUsers.forEach(id => tempArray.push({"_buildfire.index.array1.string1" : `userId_${id}`}));
                if((options.hasOwnProperty('byFollowedPlugins') && options.byFollowedPlugins) || !options.hasOwnProperty('byFollowedPlugins')) resp.followedPlugins.forEach(id => tempArray.push({"_buildfire.index.array1.string1" : `pluginTitle__${id}`.toLowerCase()}));
                buildfire.appData.search({filter : {$or: tempArray} , skip : options?.skip || 0 , limit : options?.limit || 10 , sort:{createdOn : -1}} , Posts.TAG , (e , r) => e ? callback(e , null) : callback(null , r))                
            })
        }
        else buildfire.appData.search({filter : {$or: tempArray} , skip : options?.skip || 0 , limit : options?.limit || 10 , sort:{createdOn : -1}} , Posts.TAG , (e , r) => e ? callback(e , null) : callback(null , r))                
    }

    static getById = (id , callback) =>{
        buildfire.appData.getById(id , Posts.TAG , (e , r) => {
            if(e) return callback(e);
            else return callback(null , r);
        });
    }

    static searchPosts = (option , callback) =>{
        if(!option || !option?.text || option.text == "" || option.text.replace(/\s/g,'') == "") return callback("Option text cannot be empty");
        else{
            let tempArray = [];
            tempArray.push({"_buildfire.index.array1.string1" : {"$regex":`displayName_(.|\n)*?${option.text.toLowerCase()}`}});
            tempArray.push({"_buildfire.index.array1.string1" : {"$regex":`pluginTitle_(.|\n)*?${option.text.toLowerCase()}`}});
            tempArray.push({"_buildfire.index.array1.string1" : "isPublic_1"});
            buildfire.appData.search({filter : {$or: tempArray} , sort:{createdOn : -1} , skip : option.skip || 0 , limit : option.limit || 15 } , Posts.TAG , (e , r) => e ?  callback(e) : callback(r));;
        }
    }

    static addPublicPost = (post , callback) =>{
        if(!post.postText && !post.postImages) return callback("Post text cannot be empty");
        buildfire.appData.insert(new Post({
            isPublic : true,
            postText : post.postText || "",
            postImages : post.postImages || [],
            _buildfire:{index : Posts.buildIndex({
                displayName : "PUBLIC" , userId : "PUBLIC" , pluginTitle : buildfire.context.title || buildfire.context.pluginId , isPublic : 1})}
        }),Posts.TAG , (e , r) => {
            e ? callback(e , null) : callback(null , r);
        } )
    }

    static deletePost = (id , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in before deleting a post");
        if(!id) return callback("Couldn't find a post with this ID");
        buildfire.appData.getById(id , Posts.TAG , (e , r) => {
            if(e) return callback(e);
            else if(r.data.userId != authManager.currentUser._id) return callback("You can only delete your own posts");
            else{
                buildfire.appData.delete(id , Posts.TAG , (e , r) => {
                    if(e) return callback(e);
                    callback(null , r);
                    buildfire.analytics.trackAction(analyticKeys.POST_DELETED.key);

                })
            }
        });
    }

    static buildIndex = data => {
        const index = {
            array1 : [
                {string1 : 'userId_' + data.userId},
                {string1 : 'displayName_' + data.displayName.toLowerCase()},
                {string1 : 'pluginTitle_' + data.pluginTitle.toLowerCase()},
                {string1 : 'isPublic_'+ data.isPublic}
            ]
        }
        return index;
    }

    static clearAppData = () =>{
        buildfire.appData.search({} , Posts.TAG , (err , resp) =>{
          if(err) console.log(err);
          else{
            resp.forEach(r =>{
              buildfire.appData.delete(r.id , Posts.TAG , (err2 , resp2) =>{
                if(err2) console.log(err2);
                else {
                  console.log(resp2);
                } 
              })
            })
          }
        })
    }

    
}