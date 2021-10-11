const render = () =>{
    
    buildfire.auth.getCurrentUser((e, user) =>{
        if(e || !user){
            renderLoginPrompt();
            buildfire.spinner.show();
            Posts.getPosts({},(err, r) =>{
                if(err || !r || (r && !r.length)){
                    buildfire.spinner.hide();
                    renderEmptyPostsState();
                }
                else{
                    Posts.getPosts({byFollowedUsers: false, byFollowedPlugins: false},(err, r)=>{
                        if(err || !r || (r && !r.length)) return;
                        buildfire.spinner.hide();
                        renderPosts(r);
                    })
                }
            })
        }
        else{
            hideLoginPrompt();
            buildfire.spinner.show();
            Follows.getUserFollowData((err, r) =>{
                if((r?.followedPlugins && r.followedPlugins.length > 0) || (r?.followedUsers  && r.followedUsers.length > 0)){
                    renderFollowingContainer(r?.followedUsers ? r.followedUsers : [], r?.followedPlugins ? r.followedPlugins : []);
                }
                else document.getElementById("followingContainer").style.display = "none";
            })
            Posts.getPosts({},(err, r) =>{
                buildfire.spinner.hide()
                renderPosts(r);
            })

            // renderPostsContainer();
        }
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




render();