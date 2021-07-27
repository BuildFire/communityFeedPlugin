const checkPost = (post) =>{
    if(post?.userId && post?.postId && post?.postText) return true;
    else return false
}
const FeedAPI = {
    addPost : (post , callback) =>{
        if(!checkPost(post)){
            if(callback) callback("An error occured (Malformatted post)" , null)
        }
        else{
            buildfire.appData.insert(post, "CommunityFeedPost", false, (err, result) => {
                if (err) return callback("Error while inserting your data" , null);
                else{
                    if(callback) callback(null , result)
                }
            });
        } 
    },
    deletePost : (postId , callback) => {

            buildfire.appData.getById(
            postId,
            "CommunityFeedPost",
            (err, result) => {
                if(err){ 
                    if(callback) return callback( err, null )
                }
                else{
                buildfire.appData.delete(postId, "CommunityFeedPost", (err, result) => {
                    if(err){
                        if(callback) return callback(err , null )
                    } 
                    else{
                        return callback(null , result )
                    }            
                });
                }
            }
            );

    },
    updatePost : (post, callback) =>{
            buildfire.appData.update(
            post.postId,
            { $set: { 
                DateTime : new Date().toLocaleDateString(),
                postText : post.postText,
                postImage : post.postImage,
                pluginNav : post.pluginNav
             }},
            "contactInfo",
            (err, result) => {
                if (err){
                    if(callback) return callback(err , null);
                }
                else {
                    if(callback) return callback(null ,result)
                }
            }
            );
    }
} 
