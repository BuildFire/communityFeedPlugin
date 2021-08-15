// PLEASE IMPORT BUILDFIRE.JS BEFORE ATTEMPTING TO EXECUTE ANY FUNCTION
if(typeof(buildfire) === "undefined") throw "Please add buildfire.js first to use BuildFire services";

class Follow {
  constructor(data = {}) {
    this.isActive = data.isActive || true; 
    this.createdOn = data.createdOn || new Date(); 
    this.createdBy = data.createdBy || null; 
    this.lastUpdatedOn = data.lastUpdatedOn || null; 
    this.lastUpdatedBy = data.lastUpdatedBy || null; 
    this.deletedOn = data.deletedOn || null; 
    this.deletedBy = data.deletedBy || null; 
    this.userId = data.userId || null;
    this.followedUsers = data.followedUsers || [];
    this.followedPlugins = data.followedPlugins || [];
    this._buildfire = data._buildfire || {};
  }
}



class Follows {
  static TAG = 'follows';
  // updated
  static toggleFollowUser = (fUserId , callback) =>{
    if(Follows.validData(fUserId)){
      buildfire.auth.getCurrentUser((err , user) => {        
        if(err || !user) return callback("You must be logged in to follow a user" , null);
        else {
          buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}} , Follows.TAG , async(err , resp) =>{
            if(err) return callback(err , "first return callback");
            else if(!(Array.isArray(resp))) return callback(resp , null);
            else{
              buildfire.auth.getUserProfile({userId : fUserId},(err , _) =>{
                if(err || !_) console.log("User not found" , null);
                else {
                  if(resp.length == 0){                    
                    return buildfire.appData.insert(new Follow({
                      userId : user._id , 
                      followedUsers : [fUserId] ,
                      followedPlugins : [],
                      createdBy : `${user.email} - ${user.username}` , 
                      createdOn : new Date(),
                      _buildfire : {
                        index : Follows.buildIndex(user._id)
                      }
                    }) , Follows.TAG, (error, record) => {
                      if (error) return callback(error , null);
                      return callback(null, new Follow(record.data));
                    });
                  }
                  else {
                    let {data , id} = resp[0];
                    let followedUsers = data.followedUsers;
                    let index = followedUsers.findIndex(e => e == fUserId);
                    if(index >= 0){
                      console.log("going to remove");
                      let newFollowedUsers = [...followedUsers];
                      newFollowedUsers.splice(index , 1);
                      let update = {...data , followedUsers : newFollowedUsers};
                      buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                        if(err) return callback(err , null)
                        else return callback(null , new Follow(resp.data))
                      });
                    }
                    else{
                      console.log(" going to add ");
                      let update = {...data , followedUsers : [...followedUsers , fUserId]};
                      buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                        if(err) return callback(err , null)
                        else return callback(null , new Follow(resp.data))
                      })
                      }

                  }
                }
              });
            }
          })
        }
      })
    }
    else{
      return callback("Malformatted data" , null);
    }
  }

  // updated
  static followUser = (fUserId , callback) =>{
    
    if(Follows.validData(fUserId)){
      buildfire.auth.getCurrentUser((err , user) => {        
        if(err || !user) return callback("You must be logged in to follow a user" , null);
        else {
          buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}} , Follows.TAG , async(err , resp) =>{
            if(err) return callback(err , "first return callback");
            else if(!(Array.isArray(resp))) return callback(resp , null);
            else{
              buildfire.auth.getUserProfile({userId : fUserId},(err , _) =>{
                if(err || !_) return callback("User not found" , null);              
                if(resp.length == 0){
                  buildfire.appData.insert(new Follow({
                    userId : user._id , 
                    followedUsers : [fUserId] ,
                    followedPlugins : [],
                    createdBy : `${user.email} - ${user.username}` , 
                    createdOn : new Date(),
                    _buildfire : {
                      index : Follows.buildIndex(user._id)
                    }
                  }), Follows.TAG, (error, record) => {
                    if (error) return callback(error , null);
                    return callback(null, new Follow(record.data));
                  });
                }
                else {
                  let {data , id} = resp[0];
                  let followedUsers = data.followedUsers;
                  let index = followedUsers.findIndex(e => e == fUserId);
                  if(index >= 0) return callback("You are already following this user" , null);
                  else{
                    let update = {...data , followedUsers : [...followedUsers , fUserId]};
                    buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                      if(err) return callback(err , null)
                      else return callback(null , new Follow(resp.data))
                    })
                  }
  
                }
              });
            }
          })
        }
      })
    }
    else{
      return callback("Malformatted data" , null);
    }
  }

  static unfollowUser = (fUserId , callback) =>{
    if(Follows.validData(fUserId)){
      buildfire.auth.getCurrentUser((err , user) => {        
        if(err || !user) return callback("You must be logged in to unfollow a user" , null);
        else {
              buildfire.appData.search( {filter :{"_buildfire.index.string1" : user._id}} , Follows.TAG , async(err , resp) =>{
                if(err) return callback(err , null);
                else if(!(Array.isArray(resp))) return callback(resp , null);
                else if(resp.length <= 0) return callback("You are not following anyone yet" , null);
                else{
                  
                  buildfire.auth.getUserProfile({userId : fUserId} , (err , _) => {
                    if(err || !_) return callback("Couldn't find user" , null);
                    else{
                      let {data , id} = resp[0];
                      let followedUsers = data.followedUsers;
                      let index = followedUsers.findIndex(e => e == fUserId);
                      if(index < 0) return callback("Must be following the user to unfollow" , null);
                      let newFollowedUsers = [...followedUsers];
                      newFollowedUsers.splice(index , 1);
                      let update = {...data , followedUsers : newFollowedUsers};
                      buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                        if(err) return callback(err , null)
                        else return callback(null , new Follow(resp.data))
                      })
                    }
                  });

                }
            });
          }
        });

        }
     
  }
  // updated
  static getFollowedUsers = (callback) =>{
    buildfire.auth.getCurrentUser((err , user) =>{
      if(err) return callback(err , null);
      else if(!user) return callback("Please login first");
      else {
        buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}}, Follows.TAG , (err , resp) => {
          if(err) return callback(err , null);
          else if(!(Array.isArray(resp))) return callback(resp , null);
          else if(resp.length == 0) return callback("You are not following anyone yet" , null);
          else if(resp.length == 1) {
            if(resp[0].data.followedUsers.length == 0) return callback("You are not following any users yet" , null);
            return callback(null , resp[0].data.followedUsers);
          } 
        })
      }
    })
  }
  // updated
  static getFollowedPlugins = (callback) =>{
    buildfire.auth.getCurrentUser((err , user) =>{
      if(err) return callback(err , null);
      else if(!user) return callback("Please login first");
      else {
        buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}}, Follows.TAG , (err , resp) => {
          if(err) return callback(err , null);
          else if(!(Array.isArray(resp))) return callback(resp , null);
          else if(resp.length == 0) return callback("You are not following any plugin yet" , null);
          else if(resp.length == 1) {
            if(resp[0].data.followedPlugins.length == 0) return callback("You are not following any plugin yet" , null);
            return callback(null , resp[0].data.followedPlugins);
          } 
        })
      }
    })
  }
  // updated
  static getUserFollowData = (callback) =>{
    buildfire.auth.getCurrentUser((err , user) =>{
      if(err) return callback(err , null);
      else if(!user) return callback("Please login first" , null);
      else {
        buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}}, Follows.TAG , (err , resp) => {
          if(err) return callback(err , null);
          else if(!(Array.isArray(resp))) return callback(resp , null);
          else if(resp.length == 0) return callback("You are not following anyone yet" , null);
          else if(resp.length == 1) {
            if(resp[0].data.followedUsers.length == 0 && resp[0].data.followedPlugins.length == 0) return callback("You are not following any users / plugins yet" , null);
            return callback(null , new Follow(resp[0].data));
          } 
        })
      }
    })
  }
  // updated
  static followPlugin = (pluginId , callback) => {
      buildfire.auth.getCurrentUser((err , user) => {        
        if(err || !user) return callback("You must be logged in to follow a plugin" , null);
        else {
          buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}} , Follows.TAG , async(err , resp) =>{
            if(err) return callback(err , "first return callback");
            else if(!(Array.isArray(resp))) return callback(resp , null);
            else if(resp.length == 0){
              
              return buildfire.appData.insert(new Follow({
                userId : user._id , 
                followedUsers : [] ,
                followedPlugins : [pluginId],
                createdBy : `${user.email} - ${user.username}` , 
                createdOn : new Date(),
                _buildfire : {
                  index : Follows.buildIndex(user._id)
                }
              }), Follows.TAG, (error, record) => {
                if (error) return callback(error , null);
                return callback(null, new Follow(record.data));
              });
            }
            else {
              let {data , id} = resp[0];
              let followedPlugins = data.followedPlugins;
                
                let index = followedPlugins.findIndex(e => e == pluginId);
                if(index >= 0) return callback("You are already following this plugin" , null);
                else{
                  let update = {...data , followedPlugins : [...followedPlugins , pluginId]};
                  return await buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                    if(err) return callback(err , null)
                    else return callback(null , new Follow(resp.data))
                  })
                }
            }
          })
        }
      })

  }

  // updated
  static toggleFollowPlugin = (pluginId , callback) => {
      buildfire.auth.getCurrentUser((err , user) => {        
        if(err || !user) return callback("You must be logged in to follow a plugin" , null);
        else {
          buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}} , Follows.TAG , async(err , resp) =>{
            if(err) return callback(err , "first return callback");
            else if(!(Array.isArray(resp))) return callback(resp , null);
            else if(resp.length == 0){

              
              return buildfire.appData.insert(new Follow({
                userId : user._id , 
                followedUsers : [] ,
                followedPlugins : [pluginId],
                createdBy : `${user.email} - ${user.username}` , 
                createdOn : new Date(),
                _buildfire : {
                  index : Follows.buildIndex(user._id)
                }
              })  , Follows.TAG, (error, record) => {
                if (error) return callback(error , null);
                return callback(null, new Follow(record.data));
              });
            }
            else {
              let {data , id} = resp[0];
              let followedPlugins = data.followedPlugins;
                
                let index = followedPlugins.findIndex(e => e == pluginId);
                if(index >= 0){
                  let newfollowedPlugins = [...followedPlugins];
                  newfollowedPlugins.splice(index , 1);
                  let update = {...data , followedPlugins : newfollowedPlugins};
                  return await buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                    if(err) return callback(err , null)
                    else return callback(null , new Follow(resp.data))
                  })
                }
                else{
                  let update = {...data , followedPlugins : [...followedPlugins , pluginId]};
                  return await buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                    if(err) return callback(err , null)
                    else return callback(null , new Follow(resp.data))
                  })
                }
            }
          })
        }
      })

  }
  
  static unfollowPlugin = (fUserId , callback) =>{

    buildfire.auth.getCurrentUser((err , user) => {        
      if(err || !user) return callback("You must be logged in to unfollow a plugin" , null);
      else {
        buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}} , Follows.TAG , async(err , resp) =>{
          if(err) return callback(err , "first return callback");
          else{
            buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}} , Follows.TAG , async(err , resp) =>{
              if(err) return callback(err , null);
              else if(!(Array.isArray(resp))) return callback(resp , null);
              else if(resp.length <= 0) return callback("You are not following any plugin yet" , null);
              else{
                let {data , id} = resp[0];
                let followedPlugins = data.followedPlugins;
                let index = followedPlugins.findIndex(e => e == fUserId);
                if(index < 0) return callback("Must be following the plugin to unfollow" , null);

                let newfollowedPlugins = [...followedPlugins];
                newfollowedPlugins.splice(index , 1);
                let update = {...data , followedPlugins : newfollowedPlugins};
                return await buildfire.appData.update(id , update , Follows.TAG, (err , resp) =>{
                  if(err) return callback(err , null)
                  else return callback(null , resp)
                })

              }
            });
          }
        });

      }
    })

  }
  
  static isFollowingUser = (userId , callback) =>{
    let result;
    buildfire.auth.getCurrentUser((err , user) =>{
      if(err) return callback(err, null)
      else if(!user) return callback("Must be logged in first" , null);
      else {
        buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}}, Follows.TAG , (err , resp) => {
          if(err) return callback()
          else {
            if(!(Array.isArray(resp))) return callback(resp , null);
            else if(resp.length == 0) return callback(null , false)
            else {
              let index = resp[0].data.followedUsers.findIndex(e => e == userId);
              if(index >= 0) return callback(null , true);
              else return callback(null , false);
            } 
          }
        })
      }
    });
  }

  static isFollowingPlugin = (pluginId , callback) =>{
    let result;
    buildfire.auth.getCurrentUser((err , user) =>{
      if(err) return callback(err, null)
      else if(!user) return callback("Must be logged in first" , null);
      else {
        buildfire.appData.search({filter :{"_buildfire.index.string1" : user._id}}, Follows.TAG , (err , resp) => {
          if(err) return callback()
          else {
            if(!(Array.isArray(resp))) return callback(resp , null);
            else if(resp.length == 0) return callback(null , false)
            else {
              let index = resp[0].data.followedPlugins.findIndex(e => e == pluginId);
              if(index >= 0) return callback(null , true);
              else return callback(null , false);
            } 
          }
        })
      }
    });
  }

  static validData = (fUserId) =>{
    return fUserId.length == 24 ? 1 : 0;
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


  static buildIndex = userId => {
    const index = {
      string1: userId 
    };
    return index;
  }


}