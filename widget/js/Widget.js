const refreshFollowingContainer = () =>{
    Follows.getUserFollowData((err,data) =>{
        if(data){
            let expectedLength = data.followedUsers.length + data.followedPlugins.length;
            console.log(expectedLength);
            if(expectedLength != lastLength){
                renderFollowContainer();
            } 
        }
    });
}

let lastLength = 0;

const render = (callback) =>{
    buildfire.auth.getCurrentUser((e, user) =>{
        if(e || !user){
            showSkeleton(false);
            renderLoginPrompt();
            buildfire.spinner.show();
            Posts.getPosts({},(err, r) =>{
                if(err || !r || (r && !r.length)){
                    buildfire.spinner.hide();
                    renderEmptyPostsState();
                    setTimeout(() => {            
                        hideSkeleton(false,false);            
                    }, 1500);
                }
                else{
                    Posts.getPosts({byFollowedUsers: false, byFollowedPlugins: false},(err, r)=>{
                        if(err || !r || (r && !r.length)) return;
                        buildfire.spinner.hide();
                        setTimeout(() => {         
                            hideSkeleton(false,true);                           
                            renderPosts(r);
                        }, 1500);
                    })
                }
            })
        } 
        else{
            let postCheckInterval = null;
            showSkeleton(true);
            hideLoginPrompt();
            buildfire.spinner.show();
            renderFollowContainer();
            Posts.getPosts({},(err, r) =>{
                buildfire.spinner.hide()
                if(r && r.length > 0){
                    setTimeout(() => {            
                        renderPosts(r);
                        let interval1 = setInterval(() => {
                            getNewPosts();
                        }, 3000);
                        buildfire.auth.onLogout(() => {
                            clearInterval(interval1);
                        }, true);

                        let interval2 = setInterval(() => {
                            refreshFollowingContainer();
                        }, 5000);
                        buildfire.auth.onLogout(() => {
                            clearInterval(interval2);
                        }, true);

                        hideSkeleton(true,true, true); 
                    }, 1300);
                }
                else{
                    renderEmptyPostsState();
                    setTimeout(() => {            
                        hideSkeleton(true,true, true);      
                    }, 1500);
                }
            })
        }
    })

}


const renderFollowContainer = () =>{
    Follows.getUserFollowData((err, r) =>{
        if((r?.followedPlugins && r.followedPlugins.length > 0) || (r?.followedUsers  && r.followedUsers.length > 0)){
            lastLength = r.followedPlugins.length + r.followedUsers.length;
            console.log(lastLength);
            setTimeout(() => {            
                renderFollowingContainer(r?.followedUsers ? r.followedUsers : [], r?.followedPlugins ? r.followedPlugins : [],false,(finished) =>{
                    hideSkeleton(true,true, false);           
                });
            }, 1000);
        }
        else document.getElementById("followingContainer").style.display = "none";
    })
}

buildfire.appearance.getAppTheme((err, appTheme) => {
    let root = document.documentElement;
    window.appTheme = {};
    Object.keys(appTheme.colors).map(key => {
      window.appTheme[key] = appTheme.colors[key]
      root.style.setProperty('--' + key, appTheme.colors[key]);
    });
    root.style.setProperty('--box-shadow',""+appTheme.colors["bodyText"]+"52");
  });

const showSkeleton = (isLoggedIn) =>{
    document.getElementById("container").classList.add("hidden");
    document.getElementById("followingContainer").classList.add("hidden");
    document.getElementById("emptyPostsContainer").classList.add("hidden");
    document.getElementById("postsContainer").classList.add("hidden");
    if(!isLoggedIn){
        document.getElementById("skeletonFollowingContainer").classList.add("hidden");
        document.getElementById("authSkeleton").classList.add("hidden");
        document.getElementById("unauthSkeleton").classList.remove("hidden");
    }
    else{
        document.getElementById("skeletonFollowingContainer").classList.remove("hidden");
        document.getElementById("authSkeleton").classList.remove("hidden");
        document.getElementById("unauthSkeleton").classList.add("hidden");
    }
}

const hideSkeleton = (isLoggedIn, followingContainer = true, posts = true) =>{
    document.getElementById("container").classList.remove("hidden");
    if(!isLoggedIn){
        document.getElementById("unauthSkeleton").classList.add("hidden");
        if(posts){
            document.getElementById("emptyPostsContainer").classList.remove("hidden");
            document.getElementById("postsContainer").classList.remove("hidden");
        }
    }
    else{
        if(followingContainer){
            document.getElementById("skeletonFollowingContainer").classList.add("hidden");
            document.getElementById("followingContainer").classList.remove("hidden");
        }
        if(posts){
            document.getElementById("emptyPostsContainer").classList.remove("hidden");
            document.getElementById("postsContainer").classList.remove("hidden");
            document.getElementById("authSkeleton").classList.add("hidden");
        }

        document.getElementById("container").classList.remove("hidden");

    }
}

render();
