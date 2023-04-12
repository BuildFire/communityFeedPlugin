const createPostBody = (post, parent) =>{
  let {data, id} = post;
  let postTrimLength = 150;
  if(data?.postText){
     if(data.postText.length > postTrimLength){
       let trimmedText = data.postText.substring(0, postTrimLength);
       let trimmedPostText = createElement("h3",trimmedText+"... ",["postText","inline"],`${id}postText`);
       let fullPostText = createElement("h3",data.postText,["postText","inline","hidden"],`${id}postTextFull`);
       let readMoreButton = createElement("h3","Read More",["postTextSeeMore","inline","bold"],`${id}postTextSeeMore`);
       let readLessButton = createElement("h3","  Read Less",["postTextSeeMore","inline","bold","hidden"],`${id}postTextSeeLess`);
       readLessButton.onclick = () =>{
         trimmedPostText.classList.remove("hidden");
         readMoreButton.classList.remove("hidden");         
         fullPostText.classList.add("hidden")
         readLessButton.classList.add("hidden");         
        }
        readMoreButton.onclick = () =>{
         trimmedPostText.classList.add("hidden");
         readMoreButton.classList.add("hidden");         
         fullPostText.classList.remove("hidden")
         readLessButton.classList.remove("hidden");         
       }
       parent.appendChild(trimmedPostText);
       parent.appendChild(fullPostText);
       parent.appendChild(readMoreButton);
       parent.appendChild(readLessButton);
      }else {
        let fullPostText = createElement("h3",data.postText,["postText","inline"],`${id}postTextFull`);
        parent.appendChild(fullPostText);
     }
  }
  if(data?.postImages){
    let postImagesContainer = createElement("div","",["postImagesContainer"],`${id}postImagesContainer`);
    if (data.postImages.length > 3) {
      for (let i = 0; i < 3; i++) {
        let image = createImage(data.postImages[i], true, true);
        postImagesContainer.appendChild(image);
      }
      let remainingImages = createElement("div","",["remainingImages","hidden"],`${id}postRemainingImages`);
      for (let i = 3; i < data.postImages.length; i++) {
        let image = createImage(data.postImages[i], true, true);
        remainingImages.appendChild(image);
      }
      postImagesContainer.appendChild(remainingImages);
      let seeMoreButton = createElement("div", "", ["seeMoreButton"], `${id}ShowMoreContainer`);
      let button = createElement( "button", `Show ${data.postImages.length - 3} More`, null, `${id}ShowMoreButton` );
      button.onclick = () => showMoreImages(id)
      seeMoreButton.appendChild(button);
      postImagesContainer.appendChild(seeMoreButton);
    } else {
      for (let i = 0; i < data.postImages.length; i++) {
        let image = createImage(data.postImages[i], true, true);
        postImagesContainer.appendChild(image);
      }
    }
    parent.appendChild(postImagesContainer);
  }
}

const createPostHeader = (post, parent) =>{
  if(post.data.isPublic) createPublicPostHeader(post,parent);
  else createUserPostHeader(post,parent);
}

const createPublicPostHeader = (post, parent) =>{
  let displayName = post.data.displayName; 
  let postTitle = createElement( "h2", displayName, ["publicPostTitle"], `${post.id}postDisplayName`);
  parent.appendChild(postTitle);
}

const removeFollowingElement = (userId) =>{
  let element = document.getElementById("followingElement"+userId);
  element.remove();
  let followingContainer = document.getElementById("followingContainer");
  if(followingContainer.childNodes.length == 0) followingContainer.remove();
}

const createUserPostHeader = (post, parent) =>{
  let postId = post.id;
  let profileSection = createElement( "div", "", ["profileSection"], `${postId}ProfileSection`);
  let profileImageContainer = createElement( "div", "", ["profileImageContainer"], `${postId}profileImageContainer`);
  let userPictureUrl = null;
  if(!post.data.deletedOn)
      buildfire.auth.getUserPictureUrl({userId: post.data.userId});

  let userPicture = createImage(userPictureUrl, false);
  profileImageContainer.appendChild(userPicture);
  let infoSection = createElement("div", "", ["infoSection"], `${postId}infoSection`);
  let username = createElement("h2", post.data.displayName ? post.data.displayName : 'Someone', ["username"], `${postId}displayName`);
  username.style.cursor = "pointer";
  username.onclick = () =>{
    if(post.data.deletedOn) return;
    let userId = post.data.userId;
    buildfire.auth.getCurrentUser((err,currentUser) =>{
      if(currentUser && currentUser._id == post.data.userId) return;
      else{
        buildfire.spinner.show();
        Follows.isFollowingUser(userId , (err , r) =>{
          buildfire.spinner.hide();
          buildfire.components.drawer.open(
              {
                  enableFilter:false,
                  listItems: [
                      {text:'See Profile'},
                      {text: r ? 'Unfollow' : 'Follow'}                                        
              ]
              },(err, result) => {
                  if (err) return;
                  else if(result.text == "See Profile") buildfire.auth.openProfile(userId);
                  else if(result.text == "Unfollow") Follows.unfollowUser(userId,(err, r) => {
                    if(err || !r) return;
                    let id = `scrollableItem${userId}`;
                    if(document.getElementById(id)){
                      let item = document.getElementById(id);
                      if(item.classList.contains("activeFollowingElement")){
                        window.location.reload();
                      }
                      else renderFollowingContainer(r.data.followedUsers || [], r.data.followedPlugins || [], true);
                    }
                    else renderFollowingContainer(r.data.followedUsers || [], r.data.followedPlugins || [], true);
                  });
                  else if(result.text == "Follow") Follows.followUser(userId,(err, r) => {
                    if(err || !r) return;
                    Posts.getPosts({},(err, r) =>{
                      if(r && r.length > 0) renderPosts(r);
                      else renderEmptyPostsState();
                    })
                    renderFollowingContainer(r.data.followedUsers || [], r.data.followedPlugins || [], true);
                  });
                  buildfire.components.drawer.closeDrawer();
    
              }
          );
  
      })
      }
  })
  }
  let postPluginSectionInfo = createElement("div", "", ["postPluginSectionInfo",]);
  let pluginTitle = createElement( "h3",decodeURIComponent(post.data.pluginInstance.pluginInstanceTitle) , ["pluginTitle"], `${postId}pluginTitle`);
  let postTimeText = getPostTime(post.data.createdOn);
  let postTime = createElement( "h3", " - " + postTimeText, ["postTime"], `${postId}postTime`  );
  pluginTitle.setAttribute("instanceId", post.data.pluginInstance.pluginInstanceId);
  pluginTitle.onclick = () => buildfire.navigation.navigateTo({instanceId: pluginTitle.getAttribute("instanceId")} );
  infoSection.appendChild(username);
  postPluginSectionInfo.appendChild(pluginTitle);
  postPluginSectionInfo.appendChild(postTime);
  infoSection.appendChild(postPluginSectionInfo);
  profileSection.appendChild(profileImageContainer);
  profileSection.appendChild(infoSection);
  parent.appendChild(profileSection);
}

  
const createPublicPostUI = (post, parentId, prepend = false) => {
  let parent = document.getElementById(parentId);
  let postContainer = createElement( "div", "", ["post"], `${post.id}publicPost`);
  postContainer.setAttribute("postDateTime",post.data.createdOn)
  createPostHeader(post, postContainer);
  createPostBody(post, postContainer);
  if(!prepend) parent.appendChild(postContainer);
  else parent.prepend(postContainer);
};
  

  
const createUserPost = (post, parentId, prepend = false) => {
  let parent = document.getElementById(parentId);
  let postContainer = createElement("div", "", ["post"], `${post.id}Post`);
  postContainer.onclick = () =>{
    postContainer.classList.add("this-should-from-left")
  }
  postContainer.setAttribute("postDateTime",post.data.createdOn)
  createPostHeader(post, postContainer);
  createPostBody(post, postContainer);
  if(!prepend) parent.appendChild(postContainer);
  else parent.prepend(postContainer);
};
  

