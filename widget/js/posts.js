// PLEASE IMPORT BUILDFIRE.JS BEFORE ATTEMPTING TO EXECUTE ANY FUNCTION

class Post {
    constructor(data = {}) {
      // DONT DELETE THESE DATA OBJECTS 
    //   this.isActive = data.isActive || true; 
      this.createdOn = data.createdOn || new Date(); 
      this.createdBy = data.createdBy || this.displayName; 
      this.lastUpdatedOn = data.lastUpdatedOn; 
      this.lastUpdatedBy = data.lastUpdatedBy || null; 
    //   this.deletedOn = data.deletedOn || null; 
    //   this.deletedBy = data.deletedBy || null; 
      this.userId = data.userId || null;
      this.displayName = data.username || null;
      this.postText = data.postText || null;      
      this.postImages  = data.postImages  || [];          
      this.pluginInstance  = data.pluginInstace || {};     
      // pluginInstance {ID , TITLE}
      this.isPublic = data.isPublic || false;
    }
}

class Posts{
    static TAG = "posts";
    // fix object structure inside the function
    static addPost = (post , callback) =>{
        if(!post.postText && !post.postImages) return callback("Post text cannot be empty" , null);
            else {
                buildfire.auth.getCurrentUser((err , user) =>{
                    if(err) return callback(err , null);
                    else if(!user) return callback("Must be logged in to add a post" ,null );
                    else{
                        return buildfire.appData.insert(new Post({
                            userId : user._id,
                            username : user.displayName || user.username || user.email,
                            postText : post?.postText || null,
                            postImages : post?.postImages || [],
                            isPublic : post?.isPublic || false
                        }) , Posts.TAG, (error, record) => {
                            if (error) return callback(error , null);
                            return callback(null, record);
                            // if theres a record response
                            // add the analytics
                          });
                    }
                })
            }
    }
    // change update to post
    static updatePost = (id , update , callback) =>{
        if(!id) return callback("Post ID cannot be null" , null);
        else if(!update || !update.postText || update.postText == "") return callback("Post text cannot be empty" , null);
        else {
            buildfire.auth.getCurrentUser((err , user) =>{
                if(err) return callback(err , null);
                else if(!user) return callback("Must be logged in to update a post", null);
                else{
                    buildfire.appData.getById(id , Posts.TAG ,  (err , resp) =>{
                        if(err) return callback(err , null);
                        else if(!(resp)) return callback(resp , null);
                        else if(resp.data.userId != user._id) return callback("You can only update your own posts" , null);
                        else {
                            return buildfire.appData.update(id , new Post({
                                postText : update?.postText || "",
                                postImages : update?.postImages || []
                            }) , Posts.TAG ,  (err , resp) =>{
                                if(err) return callback(err , null);
                                else return callback(null , resp);
                            })
                        }
                    })

                }
            });
        }
    }

    static getById = (id , callback) =>{
        buildfire.auth.getCurrentUser((err , user) =>{
            if(err) return callback(err , null);
            else if(!user) return callback("Must be logged in first" , null);
            else{
                buildfire.appData.getById(id , Posts.TAG ,  (err , resp) =>{
                    if(err) return callback(err , null);
                    else if(!resp) return callback("Couldn't find Post with this ID" , null);
                    else return callback(null , resp)
                });
            }
        });
    }

    static deletePost = (id , callback) =>{
        buildfire.auth.getCurrentUser((err , user) =>{
            if(err) return callback(err , null);
            else if(!user) return callback("Must be logged in first" , null);
            else {
                buildfire.appData.delete(id, Posts.TAG, (err, result) => {
                    if(err) return callback(err ,  null);
                    else return callback(null , result);
                });
            }
        })
    }

    static getPublicPosts = (callback) =>{
        buildfire.appData.search({filter : {"$json.isPublic" : true}} , Posts.TAG , (err , resp) =>{
            if(err) return callback(err , null);
            else if(!resp || !Array.isArray(resp)) return callback(resp , null);
            else if(resp.length == 0) return callback(null , []);
            else return resp;
        })
    }
    // add parameter for pagination (options)
    static getFollowedPosts = (callback) =>{

        Follows.getUserFollowData((err , resp) => {
            if(err) return callback(err , null);
            else{
                let followedUsers = resp.data.followedUsers;
                let followedPlugins = resp.data.followedPlugins;
                let tempArray = [];
                followedPlugins.forEach(id => tempArray.push({"json.pluginInstance.id" : id}));
                followedUsers.forEach(id => tempArray.push({"$json.userId" : id}));
                buildfire.appData.search({filter : {$or: tempArray} , sort:{createdOn : -1} ,skip: 0,limit: 10} , Posts.TAG , (err , resp) =>{
                    if (err) return callback(err , null);
                    return callback(null, resp);
                });
            }
        })
    
        
    }

    // A FUNCTION THAT RETRIEVES POSTS BASED ON SKIP AND LIMIT
    // FOR LAZY LOADING AND PAGINATION
    
    static getPosts = (options , callback) =>{
        if(typeof(options) === 'undefined') return callback("Error: options cannot be undefined" , null);
        Follows.getUserFollowData((err , resp) => {
            if(err) return callback(err , null);
            else{
                let followedUsers = resp.data.followedUsers;
                let followedPlugins = resp.data.followedPlugins;
                let tempArray = [];
                followedPlugins.forEach(id => tempArray.push({"json.pluginInstance.id" : id}));
                followedUsers.forEach(id => tempArray.push({"$json.userId" : id}));
                buildfire.appData.search({filter : {$or: tempArray} , sort:{createdOn : -1} ,skip: options?.skip || 0,limit: options?.limit || 5} , Posts.TAG , (err , resp) =>{
                    if (err) return callback(err , null);
                    return callback(null, resp);
                });
            }
        })

    }

    static getFollowedUsersPosts = (callback) =>{

        Follows.getUserFollowData((err , resp) => {
            if(err) return callback(err , null);
            else{
                let followedUsers = resp.data.followedUsers;
                let tempArray = [];
                followedUsers.forEach(id => tempArray.push({"$json.userId" : id}));
                buildfire.appData.search({filter : {$or: tempArray} , sort:{createdOn : -1}} , Posts.TAG , (err , resp) =>{
                    if (err) return callback(err , null);
                    return callback(null, resp);
                });
            }
        })
    }

    static getFollowedPluginsPosts = (callback) =>{

        Follows.getUserFollowData((err , resp) => {
            if(err) return callback(err , null);
            else{
                let followedPlugins = resp.data.followedPlugins;
                // if(Array.isArray(followedPlugins) && followedPlugins.length == 0) return callback(err , []);
                let tempArray = [];
                followedPlugins.forEach(id => tempArray.push({"json.pluginInstance.id" : id}));

                buildfire.appData.search({filter : {$or : tempArray} , sort:{createdOn : -1}} , Posts.TAG , (err , resp) =>{
                    console.log("returning from here");
                    if(err) return callback(err , null)
                    else return callback(null , resp)
                });
            }
        })
        
    }
    static search = (options , callback) =>{
        buildfire.auth.getCurrentUser((err , user) => {
            if(err) return callback(err , null);
            else if(!user) return callback("Must be logged in", null);
            else {
                let searchFilter = options?.filter || null;
                let sortFilter = options?.sort || null;
                let sortFields = options?.fields || null;
                let sortrecordCount = options?.recordCount || null;
                let sortPage = options?.page || null;
                let sortPageSize = options?.pageSize || null;
                let sortSkip = options?.skip || null;
                let sortLimit = options?.limit || null;
                let tempObj = {};
                if(searchFilter) tempObj.filter = searchFilter;
                if(sortFilter) tempObj.sort = sortFilter;
                if(sortFields) tempObj.fields = sortFields;
                if(sortrecordCount) tempObj.recordCount = sortrecordCount;
                if(sortPage) tempObj.page = sortPage;
                if(sortPageSize) tempObj.pageSize = sortPageSize;
                if(sortSkip) tempObj.skip = sortSkip;
                if(sortLimit) tempObj.limit = sortLimit;
                console.log(options);
                buildfire.appData.search( options, Posts.TAG , (err , resp) =>{
                    if(err) return callback(err , null);
                    else return callback(null , resp);
                })
            }
        })
    }

}
  