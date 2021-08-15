// PLEASE IMPORT BUILDFIRE.JS BEFORE ATTEMPTING TO EXECUTE ANY FUNCTION

if(typeof(buildfire) === "undefined") throw "Please add buildfire.js first to use BuildFire services";

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

    

    // updated
    static addPost = (post , callback) =>{
        if(!post.postText && !post.postImages) return callback("Post text cannot be empty" , null);
            else {
                buildfire.auth.getCurrentUser((err , user) =>{
                    if(err) return callback(err , null);
                    else if(!user) return callback("Must be logged in to add a post" ,null );
                    else{
                        buildfire.appData.insert(new Post({
                            userId : user._id,
                            displayName : user.displayName || user.username || user.email,
                            postText : post?.postText || null,
                            postImages : post?.postImages || [],
                            isPublic : post?.isPublic || false,
                            pluginInstance : {
                                pluginInstanceId : buildfire.context.instanceId,
                                pluginInstanceTitle : buildfire.context.title || buildfire.context.pluginId
                            },
                            _buildfire:{
                                index : Posts.buildIndex({displayName : user.displayName || user.username || user.email , userId : user._id})
                            }
                        }) , Posts.TAG, (error, record) => {
                            if (error) return callback(error , null);
                            callback(null, record);
                            Posts.AnalayticPostAdd();
                            // if theres a record response
                            // add the analytics
                          });
                    }
                })
            }
    }
    // updated
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
                    callback(null , result);
                    AnalayticPostDelete();
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
                
                let followedUsers = resp.followedUsers;
                let followedPlugins = resp.followedPlugins;
                let tempArray = [];
                followedPlugins.forEach(id => tempArray.push({"$json.pluginInstance.pluginInstanceId" : id}));
                followedUsers.forEach(id => tempArray.push({"_buildfire.index.array1.string1" : `userId_${id}`}));
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
                let followedUsers = resp.followedUsers;
                let followedPlugins = resp.followedPlugins;
                let tempArray = [];
                followedPlugins.forEach(id => tempArray.push({"json.pluginInstance.id" : id}));
                followedUsers.forEach(id => tempArray.push({"_buildfire.index.array1.string1" : `userId_${id}`}));
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
                let followedUsers = resp.followedUsers;
                let tempArray = [];
                followedUsers.forEach(id => tempArray.push({"_buildfire.index.array1.string1" : `userId_${id}`}));
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
                let followedPlugins = resp.followedPlugins;
                let tempArray = [];
                followedPlugins.forEach(id => tempArray.push({"$json.pluginInstance.pluginInstanceId" : id}));
                buildfire.appData.search({filter : {$or : tempArray} , sort:{createdOn : -1}} , Posts.TAG , (err , resp) =>{
                    console.log("returning from here");
                    if(err) return callback(err , null)
                    else return callback(null , resp)
                });
            }
        })
        
    }
    // static search = (options , callback) =>{
    //     buildfire.auth.getCurrentUser((err , user) => {
    //         if(err) return callback(err , null);
    //         else if(!user) return callback("Must be logged in", null);
    //         else {
    //             let searchFilter = options?.filter || null;
    //             let sortFilter = options?.sort || null;
    //             let sortFields = options?.fields || null;
    //             let sortrecordCount = options?.recordCount || null;
    //             let sortPage = options?.page || null;
    //             let sortPageSize = options?.pageSize || null;
    //             let sortSkip = options?.skip || null;
    //             let sortLimit = options?.limit || null;
    //             let tempObj = {};
    //             if(searchFilter) tempObj.filter = searchFilter;
    //             if(sortFilter) tempObj.sort = sortFilter;
    //             if(sortFields) tempObj.fields = sortFields;
    //             if(sortrecordCount) tempObj.recordCount = sortrecordCount;
    //             if(sortPage) tempObj.page = sortPage;
    //             if(sortPageSize) tempObj.pageSize = sortPageSize;
    //             if(sortSkip) tempObj.skip = sortSkip;
    //             if(sortLimit) tempObj.limit = sortLimit;
    //             console.log(options);
    //             buildfire.appData.search( options, Posts.TAG , (err , resp) =>{
    //                 if(err) return callback(err , null);
    //                 else return callback(null , resp);
    //             })
    //         }
    //     })
    // }


    static search = (options , callback) => {
        if(typeof(options) === "undefined" || typeof(options.username) == "undefined") return callback("Malformatted data");
        if(options.username === "") return callback("Username cannot be empty");
        console.log(options.limit);
        buildfire.appData.search({
            filter :{"_buildfire.index.array1.string1":{"$regex":`displayName_${options.username}`}},
            sort : {createdOn : -1},
            skip : options.skip || 0,
            limit : options.limit || 10,
        } , Posts.TAG , (err , res) => {
            if(err) return callback(err , null);
            else if(!Array.isArray(res)) return callback(res,null);
            else{
                return callback(null , res);
            }
        })
    }

    static buildIndex = data => {
        const index = {
            array1 : [
                {string1 : 'userId_' + data.userId},
                {string1 : 'displayName_' + data.displayName},
                {string1 : 'pluginTitle' + data.pluginTitle}
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
 
      
      static AnalayticPostAdd = () =>{
        buildfire.analytics.registerEvent(
            {
              title: "Post Created",
              key: "PostsCreated",
              description: "Number of posts created",
            },
            { silentNotification: true },(err , r) => {
                err ? console.log(err) : console.log(r);
            }
          );
      }

      
      static AnalayticPostDelete = () =>{
        buildfire.analytics.registerEvent(
            {
              title: "Post Deleted",
              key: "PostsDeleted",
              description: "Number of posts deleted",
            },
            { silentNotification: true },(err , r) => {
                err ? console.log(err) : console.log(r);
            }
          );
      }


}
  