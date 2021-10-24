const renderLoginPrompt = () =>{
    // remove following container if it exists
    // document.getElementById("followingContainer").style.display = "none";
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
const hideEmptyPostsState = () =>{
    // removing posts container if it exists
    document.getElementById("postsContainer").style.display = "block";
    // adding empty state class
    document.getElementById("emptyPostsContainer").classList.add("hidden")
}

const renderFollowingContainer = (followedUsers, followedPlugins, prepend = false, callback) =>{
    // removing login prompt if it exists
    document.getElementById("loginPrompt").style.display = "none";
    // adding following container display
    let container;
    let shouldInject = false;
    if(!document.getElementById("followingContainer")){
        container = createElement("div","",["followingContainer"],"followingContainer");
        shouldInject = true;
    }
    else container = document.getElementById("followingContainer");
    container.innerHTML = "";
    container.style.display = "flex";
    container.classList.add("followingContainer");
    followedUsers && followedUsers.forEach(u =>{
        renderFollowedUser(u,container, prepend);
    });
    followedPlugins && followedPlugins.forEach(p =>{
        renderFollowedPlugin(p, container, prepend)

    })
    if(shouldInject){
        document.getElementById("container").prepend(container);
    }
    setTimeout(() => {        
        return callback(true);
    }, 200);
    
}

const renderPosts = (posts, prepend = false, callback) =>{
    if(!posts || (posts && posts.length == 0) && callback) return callback();
    posts.forEach(p =>{
        if(p.data.isPublic) createPublicPostUI(p, "postsContainer", prepend);
        else createUserPost(p,"postsContainer",prepend)
    });
    animateEntry();
    if(callback) return callback(true)
}

const animateEntry = () =>{
    let container = document.getElementById("postsContainer");
    let childNodes = container.childNodes;
    for(let item in childNodes){
        setTimeout(() => {            
            childNodes[item]?.classList?.add("this-should-from-left");
        }, 200);
    }
}

