const renderLoginPrompt = () =>{
    // remove following container if it exists
    document.getElementById("followingContainer").style.display = "none";
    // start rendering login prompt
    let container = document.getElementById("loginPrompt");
    container.classList.add("loginPrompt")
    let textContainer = createElement("div","",["loginPromptTextContainer"]);
    let text = createElement("h3","Login to see posts from friends and groups you follow",["loginPromptText"]);
    let buttonContainer = createElement("div","",["loginPromptButtonContainer"]);
    let button = createElement("button","JOIN",["loginPromptButton"]);
    button.onclick = () =>{
        buildfire.auth.login({},(err, user) =>{
            if(err) return;
            else console.log(user);
        })
    }
    textContainer.appendChild(text);
    buttonContainer.appendChild(button);
    container.appendChild(textContainer);
    container.appendChild(buttonContainer);

}

const hideLoginPrompt = () => document.getElementById("loginPrompt").style.display = "none";

const renderEmptyPostsState = () =>{
    // removing posts container if it exists
    document.getElementById("postsContainer").style.display = "none";
    // adding empty state class
    document.getElementById("emptyPostsContainer").classList.add("emptyState")
}

const renderFollowingContainer = (followedUsers, followedPlugins) =>{
    // removing login prompt if it exists
    document.getElementById("loginPrompt").style.display = "none";
    // adding following container display
    let container = document.getElementById("followingContainer");
    container.style.display = "flex";
    container.classList.add("followingContainer");
    followedUsers && followedUsers.forEach(u =>{
        renderFollowedUser(u,container);
    });

    
}

const renderPosts = (posts, prepend = false, callback) =>{
    posts.forEach(p =>{
        if(p.data.isPublic) createPublicPostUI(p.data,"postsContainer",p.id, prepend);
        else createUserPost(p.data,"postsContainer",p.id, prepend)
    });
    if(callback) return callback(true)
}