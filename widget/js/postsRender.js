
  const createPostBody = (post, postId, postContainer) => {
    let postDescription;
    if (post?.postText) {
      let length = 140;
      if (post.postText.length > length) {
        let newText = post?.postText.substring(0, length) + "...";
        postDescription = createElement( "h3", newText, ["publicPostText", "inlineBlock"], `${postId}postDescription` );
        postContainer.appendChild(postDescription);
        let postTextSeeMore = createElement( "h3", "See More", ["publicPostText", "seeMore", "inlineBlock", "bold"], `${postId}postDescription`);
        postContainer.appendChild(postTextSeeMore);
        let postFullDescription = createElement("h3",post.postText,["publicPostText", "inlineBlock", "remove"],`${postId}postDescription`);
        postContainer.appendChild(postFullDescription);
        postTextSeeMore.onclick = () => {
          postDescription.classList.add("remove");
          postTextSeeMore.classList.add("remove");
          postFullDescription.classList.remove("remove");
        };
      } else {
        postDescription = createElement( "h3", post.postText, ["publicPostText", "inlineBlock"], `${postId}postDescription`);
        postContainer.appendChild(postDescription);
      }
    }
    if (post?.postImages) {
      let postImagesContainer = createElement( "div", "", ["publicPostImages"], `${postId}postImagesContainer`);
      if (post.postImages.length > 3) {
        for (let i = 0; i < 3; i++) {
          let image = createImage(buildfire.imageLib.resizeImage(post.postImages[i],{ size: "half_width", aspect: "16:9" }));
          postImagesContainer.appendChild(image);
        }
        let remainingImages = createElement("div","",["remainingImages"],`${postId}postRemainingImages`);
        for (let i = 3; i < post.postImages.length; i++) {
          let image = createImage(buildfire.imageLib.resizeImage(post.postImages[i],{ size: "half_width", aspect: "16:9" }));
          remainingImages.appendChild(image);
        }
        postImagesContainer.appendChild(remainingImages);
        let seeMoreButton = createElement("div", "", ["seeMoreButton"], `${postId}ShowMoreContainer`);
        let button = createElement( "button", `Show ${post.postImages.length - 3} More`, null, `${postId}ShowMoreButton` );
        button.onclick = () => showMoreImages(postId)
        seeMoreButton.appendChild(button);
        postImagesContainer.appendChild(seeMoreButton);
      } else {
        for (let i = 0; i < post.postImages.length; i++) {
          let image = createImage(post.postImages[i]);
          postImagesContainer.appendChild(image);
        }
      }
      postContainer.appendChild(postImagesContainer);
    }
  };
  
  const createPublicPostUI = (post, parentId, postId, prepend = false) => {
    let parent = document.getElementById(parentId);
    let postContainer = createElement( "div", "", ["publicPost"], `${postId}publicPost`);
    postContainer.setAttribute("postDateTime",post.createdOn)
    let displayName = post.displayName.length > 25 ? post.displayName.substring(0,25) : post.displayName; 
    let postTitle = createElement( "h2", displayName, ["publicPostTitle"], `${postId}postTitle`);
    postContainer.appendChild(postTitle);
    createPostBody(post, postId, postContainer);
    if(!prepend) parent.appendChild(postContainer);
    else parent.prepend(postContainer);
  };
  
  const getPostTime = (time) => {
    var diffInMs = new Date().getTime() - new Date(time).getTime();
    const inSecs = 1000;
    const inMins = inSecs * 60;
    const inHours = inMins * 60;
    const inDays = inHours * 24;
    var finalDiff;
    var diffInDays = parseInt(diffInMs / inDays);
    var diffInHours = parseInt(diffInMs / inHours);
    var diffInMins = parseInt(diffInMs / inMins);
  
    if (parseInt(diffInDays) > 0) finalDiff = diffInDays + (diffInDays == 1 ? " day" : " days");
    else if (parseInt(diffInHours) > 0) finalDiff = diffInHours + (diffInHours == 1 ? " hr" : " hrs");
    else if (parseInt(diffInMins) > 0) finalDiff = diffInMins + (diffInMins == 1 ? " min" : " mins");
    return finalDiff || "Just now";
  };
  
  const createUserPost = (post, parentId, postId, prepend = false) => {
    let parent = document.getElementById(parentId);
    let postContainer = createElement("div", "", ["publicPost"], `${postId}Post`);
    postContainer.setAttribute("postDateTime",post.createdOn)
    let profileSection = createElement( "div", "", ["profileSection"], `${postId}ProfileSection`);
    let profileImageContainer = createElement( "div", "", ["profileImageContainer"], `${postId}profileImageContainer`);
    let userPictureUrl = buildfire.imageLib.cropImage(
      buildfire.auth.getUserPictureUrl({userId: post.userId}),
      {width:45,height:45}
    );
  
    let userPicture = createImage(userPictureUrl);
    profileImageContainer.appendChild(userPicture);
    let infoSection = createElement("div", "", ["infoSection"], `${postId}infoSection`);
    let username = createElement("h2", post.displayName, ["username"], `${postId}displayName`);
    username.style.cursor = "pointer";
    username.onclick = () =>{
      buildfire.spinner.show();
      let userId = post.userId;
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
                if (err) return console.error(err);
                else if(result.text == "See Profile") buildfire.auth.openProfile(userId);
                else if(result.text == "Unfollow") Follows.unfollowUser(userId,(err, r) => {return});
                else if(result.text == "Follow") Follows.followUser(userId,(err, r) => {return});
                buildfire.components.drawer.closeDrawer();
  
            }
        );
    })
    }
    let postPluginSectionInfo = createElement("div", "", ["postPluginSectionInfo",]);
    let pluginTitle = createElement( "h3", post.pluginInstance.pluginInstanceTitle, ["pluginTitle"], `${postId}pluginTitle`);
    let postTimeText = getPostTime(post.createdOn);
    let postTime = createElement( "h3", " - " + postTimeText, ["postTime"], `${postId}postTime`  );
    pluginTitle.setAttribute("instanceId", post.pluginInstance.pluginInstanceId);
    pluginTitle.onclick = () => buildfire.navigation.navigateTo({instanceId: pluginTitle.getAttribute("instanceId")} );
    infoSection.appendChild(username);
    postPluginSectionInfo.appendChild(pluginTitle);
    postPluginSectionInfo.appendChild(postTime);
    infoSection.appendChild(postPluginSectionInfo);
    profileSection.appendChild(profileImageContainer);
    profileSection.appendChild(infoSection);
    postContainer.appendChild(profileSection);
    createPostBody(post, postId, postContainer);
    if(!prepend) parent.appendChild(postContainer);
    else parent.prepend(postContainer);
  };
  
  const showMoreImages = (postId) => {
    document.getElementById(`${postId}postRemainingImages`).style.display = "block";
    document.getElementById(`${postId}ShowMoreContainer`).style.display = "none";
  };
  
  const createPostUI = (post, parent, postId) => {
    if (post.isPublic) createPublicPostUI(post, parent, postId);
  };
  