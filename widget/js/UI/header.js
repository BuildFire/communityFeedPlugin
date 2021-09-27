class Header{
    constructor(e){
        this.container = document.getElementById(e);
        this.scrollableContainer = null;
        this.loginPrompt = null;
        buildfire.auth.getCurrentUser((e , u) => {
            if(e || !u) this.initLoginPrompt();
            else this.initScrollableHeader();
        })
    }

    initLoginPrompt(){
        console.log("Initting this");
        this.clearParent();
        this.renderPromptElements();
    }

    clearParent(){
        this.container.innerHTML = "";
    }
    renderPromptElements(){
        let cardContainer = createElement("div" , "" ,["prompt-container"]);
        let cardMessageContainer = createElement("div","",["prompt-text-container"]);
        let cardMessage = createElement("h3","Login to see posts from friends and groups you follow",["prompt-text"]);
        let cardBtnContainer = createElement("div","",["prompt-btns-container"]);
        let cardBtn1 = createElement("button","REGISTER",["prompt-btn"]);
        cardBtn1.onclick = () =>{
            
        }
        let cardBtn2 = createElement("button","LOGIN",["prompt-btn"]);
        cardBtn2.onclick = () =>{
            buildfire.auth.login({}, (err, user) => {
                if(user) window.location.reload();
            });
        }
        cardMessageContainer.appendChild(cardMessage);
        cardBtnContainer.appendChild(cardBtn1);
        cardBtnContainer.appendChild(cardBtn2);
        cardContainer.appendChild(cardMessage);
        cardContainer.appendChild(cardBtnContainer);
        this.loginPrompt = cardContainer;
        this.container.appendChild(cardContainer);
        Posts.getPosts({byFollowedUsers:false , byFollowedPlugins: false},(e ,r) =>{
            if(e || !r) console.log("No posts yet");
            else{
                r.forEach(p =>{                            
                    createPublicPostUI(p.data ,"postsContainer",p.id);                    
                })
            }
        })

    }

    initScrollableHeader(){
        console.log("Coming here");
        Follows.getUserFollowData((e , r) =>{
            if(e || (!r && !r?.followedUsers && !r?.followedPlugins)){
                Posts.getPosts({byFollowedUsers:false , byFollowedPlugins: false},(e ,r) =>{
                    if(e || !r) console.log("No posts yet");
                    else{
                        r.forEach(p =>{                            
                            createPublicPostUI(p.data ,"postsContainer",p.id);                    
                        })
                    }
                })
            }
            else{
                console.log(r);
                this.scrollableContainer = createElement("div","",["scrollable-parent"],"scrollable-header");
                this.container.append(this.scrollableContainer);
                Posts.getPosts({byFollowedUsers:r.followedUsers.length > 0 ? true : false , byFollowedPlugins: r.followedPlugins.length > 0 ? true : false},(e ,r) =>{
                    if(e || !r) console.log("No posts yet");
                    else{
                        r.forEach(p => {
                            if(p.data.isPublic) createPublicPostUI(p.data ,"postsContainer",p.id);
                            else createUserPost(p.data, "postsContainer",p.id)
                        })
                    }
                })



                this.addScrollableItems(this.scrollableContainer);
            }
        });
    }


    addScrollableItems(container){
        Follows.getUserFollowData((e , r) =>{
            if(e || !r) console.log("Current user not following anyone");
            else{
                if(r.followedUsers){
                    r.followedUsers.forEach(c =>{
                        this.scrollableHeaderAddUser(container , c)
                    })
                }
                if(r.followedPlugins){
                    r.followedPlugins.forEach(c =>{
                        this.scrollableHeaderAddPlugin(container , c)
                    })

                }
            }
        })
    }


    scrollableHeaderAddUser(container, userId){        
        let newItem = createElement("div","",["scrollable-child"]);
        let scrollableChildImg = createElement("div","",["scrollable-child-img"],`scrollableItem${userId}`);
        scrollableChildImg.onclick = () =>{
            if(scrollableChildImg.style.border == "3px solid green") scrollableChildImg.style.border = "0px"
            else scrollableChildImg.style.border = "3px solid green"
        }
        let userPictureUrl = buildfire.auth.getUserPictureUrl({
            userId: userId,
        });
    
        let newImage = createImage(userPictureUrl);
        scrollableChildImg.appendChild(newImage);
        newItem.appendChild(scrollableChildImg);
        buildfire.auth.getUserProfile({ userId: userId }, (err, user) => {
            if (err || !user) return;
            let scrollableChildUsername = createElement("div","",["scrollable-child-username",`scrollableUsername${userId}`]);
            let username = user.displayName || user.username;
            username = username.substring(0,8);
            let scrollableChildUsernameText = createElement("h2",username+"..",[]);
            scrollableChildUsername.appendChild(scrollableChildUsernameText);
            newItem.appendChild(scrollableChildUsername)
          
        });
        container.appendChild(newItem)
    }

    scrollableHeaderAddPlugin(container, plugin){

    }





    
}