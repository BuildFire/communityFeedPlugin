class Posts {
    static TAG = 'posts'

    // TEST
    static editPost = (postId , postText , callback) =>{
      buildfire.auth.getCurrentUser((err , user) =>{
        if(err) return callback(err , null);
        else {
          let userId = user._id;
          buildfire.appData.getById(postId , Posts.TAG , (err , resp) =>{
            if(err) return callback(err , null);
            else {
              let data = resp.data;
              if(data.userId != userId) return callback("You can only edit your own posts" , null);
              let updatedData = {...data , postText };
              buildfire.appData.update(postId , updatedData , Posts.TAG , (err , resp) =>{
                if(err) return callback(err , null);
                else return callback(null , "Updated successfully");
              })
            }
          });
        }
      });
    }

    // TEST
    static deletePost = (postId , callback) =>{
      buildfire.auth.getCurrentUser((err , user) =>{
        if(err) return callback(err , null);
        else {
          let userId = user._id;
          buildfire.appData.getById(postId , Posts.TAG , (err , resp) =>{
            if(err) return callback(err , null);
            else {
              let data = resp.data;
              if(data.userId != userId) return callback("You can only delete your own posts" , null);
              buildfire.appData.delete(postId , Posts.TAG , (err , result) => {
                if(err) return callback(err , null);
                else return callback(null , "Deleted successfully")
              })
            }
          });
        }
      });
    }

    /**
       * Returns posts based on username
       * @param {Object} filter Filtering the Posts records
       * @param {Function} callback callback for handling response
       */
      static getPostsByUsername = (filter, callback) => {
        buildfire.appData.search(
          {
            filter: filter,
          }, Posts.TAG, (error, record) => {
          if (error) return callback(error);
          return callback(null, record);
        });
      };

      /**
         * Returns All Posts saved in appData
         * @param {Function} callback callback for handling response
         */
      static getAllData = (callback) => {
        buildfire.appData.search({}, Posts.TAG, (error, record) => {
          if (error) return callback(error);
          return callback(null, record);
        });
      };
      // TEST
      static getUserPosts = (callback) =>{
        buildfire.auth.getCurrentUser((err , user) =>{
          if(err) return callback(err , null);
          else {
            let id = user._id;
            console.log(id);
            buildfire.appData.search({filter :{"$json.userId" : id} } , Posts.TAG , (err , resp) =>{
              if(err) return callback(err , null);
              else {
                if(Array.isArray(resp) && resp.length > 0){
                  return callback(null, resp);
                }
              }
            });

          }
        });
      }


    /**
       * Returns Post of users / plugins followed by current user
       * @param {Function} cb callback for handling response
       */

    static getFollowedPosts = (callback) =>{
      // to change to authmanager getId later

      buildfire.auth.getCurrentUser((err, user) =>{
        if(err || !user) return callback(err , null);
        else {
          let userId = user._id;
          Follows.getDataByUserId({"$json.userId" : userId} , (err , resp) =>{
            if(err) return callback(err , null);
            else {
              if(Array.isArray(resp) && resp.length > 0){
                let tempArray = [];
                resp[0].followedUsers.forEach(id => tempArray.push({"$json.userId" : id}));
                resp[0].followedPlugins.forEach(id => tempArray.push({"json.pluginName" : id}));
                buildfire.appData.search({filter : {$or: tempArray}} , Posts.TAG , (err , record) =>{
                  if (err) return callback(err);
                  return callback(null, record);
                })
              }
              else {
                return callback("You are not following anyone" , null);
              }
            }
          });
        }
      });

    }
    /**
       * Returns Post with given id
       * @param {String} id id of member to be retrieved
       * @param {Function} callback callback for handling response
       */
    static getById = (id, callback) => {
      buildfire.appData.getById(id, Posts.TAG, (error, record) => {
        if (error) return callback(error);
  
        return callback(null, new Post(record));
      });
    };

    /**
       * Adds a Posts
       * @param {Object} data data of Post to be added
       * @param {Function} callback callback for handling response
       */
      // TEST
    static add = (data, callback) => {
      
      buildfire.auth.getCurrentUser((err , resp) =>{
        if(err) return callback("Please login first" , null);
        else {
          data.createdBy = `${authManager.currentUser.email} - ${authManager.currentUser.username}`;
          data.createdOn = new Date();
          data.userId = resp._id;
          data.username = resp.username;
          let temp = new Post(data)
          buildfire.appData.insert(temp, Posts.TAG, (error, record) => {
            if (error) return callback(error);
            return callback(null, new Post(record.data));
          });
        };
      })
    }
  
    /**
       * Updates a Post 
       * @param {Object} data data of Post to be updated
       * @param {Function} callback callback for handling response
       */
    static set = (data, callback) => {
      data.lastUpdatedBy = `${authManager.currentUser.email} - ${authManager.currentUser.username}`;
      data.lastUpdatedOn = new Date();
      data._buildfire.index = Posts.buildIndex(data);
  
      buildfire.appData.update(data.id, data, Posts.TAG, (error, record) => {
        if (error) return callback(error);
  
  
        return callback(null, new Post(record));
      });
    };
  
    /**
       * Archives a Post
       * @param {Object} data data of member to be deleted
       * @param {Function} callback callback for handling response
       */
    static delete = (data, callback) => {
      data.deletedBy = `${authManager.currentUser.email} - ${authManager.currentUser.username}`;
      data.deletedOn = new Date();
      data.isActive = false;
  
      buildfire.appData.update(data.id, data, Post.TAG, (error, record) => {
        if (error) return callback(error);
    
        return callback(null, new Post(record));
      });
    };
  
    /**
       * Builds index
       * @param {Object} data data for which index will be built
       */
    static buildIndex = data => {
     /**
      * Example index 
      * const index = {
        text: data.firstName + ' ' + data.lastName + ' ' + data.email,
        string1: data.email
       };
      */
      let array = [data.userId , data.username ];
      const index = {
        array1:array
      };
      return index;
    }

    // ONLY USE WHEN YOU NEED TO CLEAR POSTS APP DATA
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