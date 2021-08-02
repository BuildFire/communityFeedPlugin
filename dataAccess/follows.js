class Follows {
  static TAG = 'follows'

  static followUser = (toFollow , callback) =>{
    buildfire.auth.getCurrentUser((err , resp) => {
      if(err) followErrorMsg.innerHTML = err;
      else {
          let userId = resp._id;
          buildfire.appData.search({filter :{"$json.userId" : userId}} , Follows.TAG , (e , f) =>{
            if(e) return callback(e , null);
            else {
              if(f.length == 0){
                Follows.add({userId, followedPlugins : [] , followedUsers : [toFollow]} , (addErr , addResp) => addErr ? console.log(addErr) : console.log(addResp));
              }
              else{
                let {data , id} = f[0]; 
                let index = data.followedUsers.findIndex((e) => e == toFollow);
                if(index >= 0){
                  return callback("You are already following this user" , null);
                }
                else {
                  let updatedObj = {...data , followedUsers : [...data.followedUsers , toFollow]};
                  buildfire.appData.update(id , updatedObj , Follows.TAG , (err , res) => {
                    if(err) return callback(err , null);
                    else return callback(null , res)
                  })
                }
              }
            }
          })
      }
    })
  }

  static getFollowedUsers = (callback) =>{
    buildfire.auth.getCurrentUser((err , resp) => {
      if(err) return callback(err , null)
      else {
        let userId = resp._id;
        buildfire.appData.search({filter :{"$json.userId" : userId} }, Follows.TAG , (e , f) =>{
          if(e) return callback(e , null);
          else {
            if(Array.isArray(f) && f.length > 0){
              if(f[0].data.followedUsers.length == 0) return callback(null , "You don't follow any users yet");
              else {
                let usernamesList = [];
                for(let i = 0 ; i < f[0].data.followedUsers.length ; i++){
                  buildfire.auth.getUserProfile({userId: f[0].data.followedUsers[i]} , (err , temp) =>{
                    usernamesList.push(temp.username);
                    if( i == f[0].data.followedUsers.length - 1){
                      return callback(null , usernamesList);
                    }
                  })
                }
              }
            }
            else return (null , "You are not following anyone yet")
          }
        });
      }


    });
    }

  /**
     * Returns all Follows
     * @param {Function} callback callback for handling response
     */
    // static getAllByFilter = (filter , callback) => {
    //   buildfire.appData.search(filter, Follows.TAG, (error, record) => {
    //     if (error) return callback(error);
    //     const records = record.map(data => new Post(data))
    //     return callback(null, records);
    //   });
    // };


    static getDataByUserId = (filter, callback) => {
      buildfire.appData.search(
        {
          filter: filter,
        }, Follows.TAG, (error, record) => {
        if (error) return callback(error);
        const records = record.map(data => new Follow(data.data))
        return callback(null, records);
      });
    };

  /**
     * Returns Post with given id
     * @param {String} id id of member to be retrieved
     * @param {Function} callback callback for handling response
     */
  // static getById = (id, callback) => {
  //   buildfire.appData.getById(id, Follows.TAG, (error, record) => {
  //     if (error) return callback(error);

  //     return callback(null, new Post(record));
  //   });
  // };


  // static getAllData = (callback) =>{
  //   buildfire.appData.search({} , Follows.TAG , (err , record) =>{
  //     if(err) callback(err , null);
  //     else{
  //       const records = record.map(data => new Follow(data.data))
  //       return callback(null, records);
  //     }
  //   })
  // }

  /**
     * Adds a Follows
     * @param {Object} data data of Post to be added
     * @param {Function} callback callback for handling response
     */
  static add = (data, callback) => {
    data.createdBy = `${authManager.currentUser.email} - ${authManager.currentUser.username}`;
    data.createdOn = new Date();
    // data._buildfire.index = Follows.buildIndex(data);
    buildfire.appData.insert(data, Follows.TAG, (error, record) => {
      if (error) return callback(error);
      return callback(null, new Follow(record.data));
    });
  };

  /**
     * Updates a Post 
     * @param {Object} data data of Post to be updated
     * @param {Function} callback callback for handling response
     */
  // static set = (data, callback) => {
  //   data.lastUpdatedBy = `${authManager.currentUser.email} - ${authManager.currentUser.username}`;
  //   data.lastUpdatedOn = new Date();
  //   data._buildfire.index = Follows.buildIndex(data);

  //   buildfire.appData.update(data.id, data, Follows.TAG, (error, record) => {
  //     if (error) return callback(error);


  //     return callback(null, new Post(record));
  //   });
  // };

  /**
     * Archives a Post
     * @param {Object} data data of member to be deleted
     * @param {Function} callback callback for handling response
     */
  // static delete = (data, callback) => {
  //   data.deletedBy = `${authManager.currentUser.email} - ${authManager.currentUser.username}`;
  //   data.deletedOn = new Date();
  //   data.isActive = false;

  //   buildfire.appData.update(data.id, data, Post.TAG, (error, record) => {
  //     if (error) return callback(error);
  
  //     return callback(null, new Post(record));
  //   });
  // };

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

  static clearAppData = () =>{
    buildfire.appData.search({} , Follows.TAG , (err , resp) =>{
      if(err) console.log(err);
      else{
        resp.forEach(r =>{
          buildfire.appData.delete(r.id , Follows.TAG , (err2 , resp2) =>{
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