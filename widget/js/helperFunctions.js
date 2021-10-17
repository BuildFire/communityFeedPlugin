const createElement = ( elementType, elementInnerHTML, elementClasses, elementId) => {
    let e = document.createElement(elementType);
    e.innerHTML = elementInnerHTML;
    if (elementId) e.setAttribute("id", elementId);
    if (elementClasses) elementClasses.forEach((c) => e.classList.add(c));
    return e;
};

const createImage = (src, loadInPreviewer = true) => {
    let image = document.createElement("img");
    image.src = src;
    image.style.cursor = "pointer"
    if (loadInPreviewer) image.onclick = () => buildfire.imagePreviewer.show({ images: [image.src] }, () => console.log("Image opened"));  
    return image;
  };


const renderFollowedUser = (userId, parent, prepend = false) =>{
    let followingElement = createElement("div","",["followingElement"],`followingElement${userId}`);
    let followingImageContainer = createElement("div","",["followingImageContainer"],`scrollableItem${userId}`);
    followingElement.onclick = () =>{
        buildfire.spinner.hide();
        let element = document.getElementById(followingElement.id);
        let postsContainer = document.getElementById("postsContainer");
        postsContainer.innerHTML = "";
        buildfire.spinner.show();
        let activeState = element.childNodes[0];
        if(activeState.classList.contains("activeFollowingElement")){
            activeState.classList.remove("activeFollowingElement")
            Posts.getPosts({},(err, r) =>{
                buildfire.spinner.hide();
                if(err || !r) return;
                else renderPosts(r)

            })
        }
        else{
            let list = document.getElementsByClassName("followingElement");
            for (var i = 0; i < list.length; i++) {
                list[i].childNodes[0].classList.remove("activeFollowingElement")
            }
    
            activeState.classList.add("activeFollowingElement");
            Posts.searchPosts({filter: userId},(err, r) =>{
                buildfire.spinner.hide();
                if(err) return;
                else renderPosts(r)
            })
        }
    }
    let userImage = createImage(buildfire.imageLib.cropImage(buildfire.auth.getUserPictureUrl({userId: userId}),{width:45,height:45}), false);
    followingImageContainer.appendChild(userImage);
    followingElement.appendChild(followingImageContainer);
    buildfire.auth.getUserProfile({ userId: userId }, (err, user) => {
        let followingUsernameContainer = createElement("div","",["followingUsernameContainer",`scrollableUsername${userId}`]);
        let username;
        if(user.firstName && user.lastName) username = user.firstName + " " + user.lastName;
        else if(user.firstName) username = user.firstName;
        else if(user.displayName) username = user.displayName;
        else username = "Someone";
        username = username.substring(0,10);
        let scrollableChildUsernameText = createElement("h2",username+"..",[]);
        followingUsernameContainer.appendChild(scrollableChildUsernameText);
        followingElement.appendChild(followingUsernameContainer)
      
    });
    if(prepend) parent.prepend(followingElement);
    else parent.appendChild(followingElement)
}
const renderFollowedPlugin = (pId, parent, prepend = false) =>{
    let followingElement = createElement("div","",["followingElement"],`followingElement${pId}`);
    let followingImageContainer = createElement("div","",["followingImageContainer"],`scrollableItem${pId}`);
    followingElement.onclick = () =>{
        buildfire.spinner.hide();
        let element = document.getElementById(followingElement.id);
        let postsContainer = document.getElementById("postsContainer");
        postsContainer.innerHTML = "";
        buildfire.spinner.show();
        let activeState = element.childNodes[0];
        if(activeState.classList.contains("activeFollowingElement")){
            activeState.classList.remove("activeFollowingElement")
            Posts.getPosts({filter:pId},(err, r) =>{
                buildfire.spinner.hide();
                if(err || !r) return;
                else renderPosts(r)

            })
        }
        else{
            let list = document.getElementsByClassName("followingElement");
            for (var i = 0; i < list.length; i++) {
                list[i].childNodes[0].classList.remove("activeFollowingElement")
            }
    
            activeState.classList.add("activeFollowingElement");
            Posts.searchPosts({filter: pId},(err, r) =>{
                buildfire.spinner.hide();
                if(err) return;
                else renderPosts(r)
            })
        }
    }
    buildfire.pluginInstance.get(pId, function(error, instance){
        if (error) return;
        else if (instance) {
            let followingUsernameContainer = createElement("div","",["followingUsernameContainer",`scrollableUsername${pId}`]);
            let username = instance.title;
            username = username.substring(0,10);
            let scrollableChildUsernameText = createElement("h2",username+"..",[]);
            followingUsernameContainer.appendChild(scrollableChildUsernameText);
            followingImageContainer.appendChild(createImage(buildfire.imageLib.cropImage(instance.iconUrl, {width:45,height:45}), false));
            followingElement.appendChild(followingImageContainer);
            followingElement.appendChild(followingUsernameContainer)
            if(prepend) parent.prepend(followingElement);
            else parent.appendChild(followingElement)
        
        }
    });
}

const showMorePosts = () =>{
    let postsContainer = document.getElementById("postsContainer");
    Posts.getPosts({skip:postsContainer.childNodes.length},(err, r) =>{
        if(err || !r || (r && r.length == 0)) return;
        else renderPosts(r)
    })
}

const getNewPosts = () =>{
    let postsContainer = document.getElementById("postsContainer");
    let lastPostDate = postsContainer.childNodes[0];
    if(!lastPostDate) return;
    lastPostDate = lastPostDate.getAttribute("postDateTime");
    Posts.getNewPosts({lastPostDate},(err, r)=>{
        if(err) return;
        else renderPosts(r, true)
    })
}

setInterval(() => {
    // CHECK IF FILTER IS APPLIED IN THE SCROLLABLE HEADER
    let check = true;
    if(!document.getElementById("followingContainer")) return;
    let container = document.getElementById("followingContainer");
    let list = container.childNodes;
    for(let index in list){
        let item = list[index];
        let active = item && item.childNodes ? item.childNodes[0] : null;
        if(active?.classList?.contains("activeFollowingElement")){
            check = false;
            break;
        }
    }
    if(check) getNewPosts();
    
}, 3000);

const getPostTime = (time) => {
    var diffInMs = new Date().getTime() - new Date(time).getTime();
    const inSecs = 1000;
    const inMins = inSecs * 60;
    const inHours = inMins * 60;
    const inDays = inHours * 24;
    var finalDiff;
    if(diffInMs / inHours < 24) return "Today";
    else if(diffInMs / inHours > 24 &&  diffInMs / inHours < 48) return "Yesterday";
    else{
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date(time);
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day  + ' '+ month  + ' ' + year;
    return output
    }
};


const showMoreImages = (postId) => {
    document.getElementById(`${postId}postRemainingImages`).classList.remove("hidden");
    document.getElementById(`${postId}ShowMoreContainer`).classList.add("hidden");
};
