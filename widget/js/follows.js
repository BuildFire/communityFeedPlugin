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

    static createFollowData = (user , fUser , fPlugin) =>{
        let data = {
            userId : user._id,
            _buildfire:{index : Follows.buildIndex(user._id)}
        }
        if(user && fUser) return new Follow({ ...data, followedUsers : [fUser], _buildfire: {index: Follows.buildIndex(user._id) } });
        else if(user && !fUser && fPlugin) return new Follow({ ...data, followedPlugins : [fPlugin], _buildfire: {index: Follows.buildIndex(user._id) }  })
        else return "error missing arguments"
        
    }

    static followPlugin = (pluginId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in before following a user");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            else if(r.length == 0){
                buildfire.appData.insert(Follows.createFollowData(authManager.currentUser , null , pluginId),Follows.TAG , (e , r) => {
                    if(e) return callback(e);
                    else return callback(null , r)
                });
            }
            else{
                if(r[0].data.followedPlugins.findIndex(e => e == pluginId) >= 0) return callback("Already following this plugin");
                buildfire.appData.update(r[0].id , {...r[0].data , followedPlugins : [...r[0].data.followedPlugins , pluginId]} , Follows.TAG , (e , r) =>{
                    if(e) return callback(e);
                    callback(null , r)
                    // IN CASE OF ANALYTICS
                })
            }

        })
    }

    static unfollowPlugin = (pluginId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in before following a user");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            if(e) return callback(e);
            else if(r.length == 0) return callback("You are not following this plugin")
            else{
                let obj = {...r[0].data};
                let index = obj.followedPlugins.findIndex(e => e == pluginId);
                if(index < 0) return callback("You are not following this plugin");
                else{
                    obj.followedPlugins.splice(index , 1);
                    buildfire.appData.update(r[0].id , obj , Follows.TAG , (e , r) => {
                        if(e) return callback(e);
                        callback(r)
                    })
                }
            }
        })
    }

    static toggleFollowPlugin = (pluginId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in before following a user");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            else if(r.length == 0){
                buildfire.appData.insert(Follows.createFollowData(authManager.currentUser , null , pluginId),Follows.TAG , (e , r) => {
                    if(e) return callback(e);
                    else return callback(null , r)
                });
            }
            else{
                let obj = {...r[0].data};
                let index = obj.followedPlugins.findIndex(e => e == pluginId);
                if(index >= 0){
                    obj.followedPlugins.splice(index , 1);
                    buildfire.appData.update(r[0].id , obj , Follows.TAG , (e , r) => {
                        if(e) return callback(e);
                        callback(r)
                    })
                }
                else{
                    buildfire.appData.update(r[0].id , {...r[0].data , followedPlugins : [...r[0].data.followedPlugins , pluginId]} , Follows.TAG , (e , r) =>{
                        if(e) return callback(e);
                        callback(null , r)
                        // IN CASE OF ANALYTICS
                    })
                }
            }

        })
    }

    static followUser = (fUserId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in before following a user");
        if(!fUserId) return callback("User ID cannot be null");
        if(fUserId == authManager.currentUser._id) return callback("You can't follow yourself");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            buildfire.auth.getUserProfile({userId : fUserId} , (e , u) => {
                if(e) return callback(e);
                else if(!u) return callback("User does not exist");
                console.log(r);
                if(r.length == 0){
                    buildfire.appData.insert(Follows.createFollowData(authManager.currentUser , fUserId),Follows.TAG , (e , r) => {
                        if(e) return callback(e , null);
                        else return callback(null , r)
                    });
                }
                else{
                    if(r[0].data.followedUsers.findIndex(e => e == fUserId) >= 0) return callback("Already following this user");
                    buildfire.appData.update(r[0].id , {...r[0].data , followedUsers : [...r[0].data.followedUsers , fUserId]} , Follows.TAG , (e , r) =>{
                        if(e) return callback(e);
                        callback(null , r)
                        // IN CASE OF ANALYTICS
                    })
                }
            })
        })
    }

    static unfollowUser = (fUserId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in before following a user");
        if(fUserId == authManager.currentUser._id) return callback("You can't follow yourself");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            buildfire.auth.getUserProfile({userId : fUserId} , (e , u) => {
                if(e) return callback(e);
                else if(!u) return callback("User does not exist");
                else if(r.length == 0) return callback("You are not following this user")
                else{
                    let obj = {...r[0].data};
                    let index = obj.followedUsers.findIndex(e => e == fUserId);
                    if(index < 0) return callback("You are not following this user");
                    else{
                        obj.followedUsers.splice(index , 1);
                        buildfire.appData.update(r[0].id , obj , Follows.TAG , (e , r) => {
                            if(e) return callback(e);
                            callback(r)
                        })
                    }
                }
            })
        })
    }
    
    static toggleFollowUser = (fUserId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in before following a user");
        if(fUserId == authManager.currentUser._id) return callback("You can't follow yourself");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            buildfire.auth.getUserProfile({userId : fUserId} , (e , u) => {
                if(e) return callback(e);
                else if(!u) return callback("User does not exist");
                console.log(r);
                if(r.length == 0){
                    buildfire.appData.insert(Follows.createFollowData(authManager.currentUser , fUserId),Follows.TAG , (e , r) => {
                        if(e) return callback(e);
                        else return callback(null , r)
                    });
                }
                else{
                    let obj = {...r[0].data};
                    let index = obj.followedUsers.findIndex(e => e == fUserId);
                    if(index >= 0){
                        obj.followedUsers.splice(index , 1);
                        buildfire.appData.update(r[0].id , obj , Follows.TAG , (e , r) => {
                            if(e) return callback(e);
                            callback(r)
                        })
                    }
                    else{
                        buildfire.appData.update(r[0].id , {...r[0].data , followedUsers : [...r[0].data.followedUsers , fUserId]} , Follows.TAG , (e , r) =>{
                            if(e) return callback(e);
                            callback(null , r)
                            // IN CASE OF ANALYTICS
                        })
                    }
                }
            })
        })
    }

    static isFollowingUser = (userId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in");
        buildfire.appData.search({filter: {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            else if(r.length == 0) return callback(null , false);
            else{
                let index = r[0].data.followedUsers.findIndex(e => e == userId);
                if(index < 0) return callback(null , false);
                else return callback(null , true);
            }
        })
    }

    static isFollowingPlugin = (pluginId , callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e || !r) return callback(e);
            else if(r.length == 0) return callback(null , false);
            else{
                let index = r[0].data.followedPlugins.findIndex(e => e == pluginId);
                if(index < 0) return callback(null , false);
                else return callback(null , true);
            }
        })
    }
    
    static getUserFollowData = (callback) =>{
        if(!authManager.currentUser) return callback("Must be logged in");
        buildfire.appData.search({filter : {"_buildfire.index.string1" : authManager.currentUser._id}} , Follows.TAG , (e , r) => {
            if(e) return callback(e);
            else if(!r || r.length == 0) return callback(r);
            else return callback(null , new Follow(r[0].data))
        });
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
