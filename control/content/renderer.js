const createPostUi = (post) =>{
    let eDiv = document.createElement("div");
    let eTitle = document.createElement("h4");
    let eText = document.createElement("p");
    let eDate = document.createElement("p");
    let ePostId = document.createElement("p");
    // adding ID's
    eDiv.setAttribute("id" , `post-${post.postId}`)
    eTitle.setAttribute("id" , `post-${post.postId}-spTitle`)
    eText.setAttribute("id" , `post-${post.postId}-spText`)
    eDate.setAttribute("id" , `post-${post.postId}-spDate`)

    // adding INNERHTML
    eTitle.innerHTML = post.username || pluginName;
    eText.innerHTML = post.postText;
    eDate.innerHTML = post.DateTime;
    ePostId.innerHTML = post.postId;
    
    // adding CLASSES
    eDiv.classList.add("spContainer")
    eTitle.classList.add("spTitle")
    eText.classList.add("spText");
    eDate.classList.add("spDate");
    ePostId.classList.add("sdPostId");
    
    // Adding children to main container
    eDiv.appendChild(eTitle)
    eDiv.appendChild(eText)
    eDiv.appendChild(eDate)
    eDiv.appendChild(ePostId)
    return eDiv;
}

const addSinglePost = (post , parentHTMLElement) =>{
    let parentNode = document.getElementById(parentHTMLElement);
    let newDiv = createPostUi(post)
    parentNode.insertBefore(newDiv , parentNode.firstChild);
}

const renderPosts = (postsArray , parentElement) =>{
    postsArray.forEach(post =>{
        let div = createPostUi(post);
        document.getElementById(parentElement).appendChild(div);
    })
};

const deleteSinglePost = (childId) => document.getElementById(`post-${childId}`).remove();
const updateSinglePost = (post) => {
    console.log(post.username);
    document.getElementById(`post-${post.postId}-spTitle`).innerHTML = post.username;
    document.getElementById(`post-${post.postId}-spText`).innerHTML = post.postText;
    document.getElementById(`post-${post.postId}-spDate`).innerHTML = post.DateTime;  
}