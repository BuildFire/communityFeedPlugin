const render = () =>{
    buildfire.auth.getCurrentUser((e, user) =>{
        if(e || !user){
            renderLoginPrompt();
            Posts.getPosts({},(err, r) =>{
                if(err || !r || (r && !r.length)){
                    renderEmptyPostsState();
                }
                else{
                    Posts.getPosts({byFollowedUsers: false, byFollowedPlugins: false},(err, r)=>{
                        if(err || !r || (r && !r.length)) return;
                        renderPosts(r);
                    })
                }
            })
        }
        else{
            hideLoginPrompt();
            Follows.getUserFollowData((err, r) =>{
                if(err || !r) return;
                if( !(r?.followedPlugins && r?.followedPlugins.length > 0) && !(r?.followedUsers && r?.followedUsers.length > 0) ) return;
                renderFollowingContainer(r?.followedUsers ? r.followedUsers : []);
            })
            Posts.getPosts({},(err, r) =>{
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
      console.log(key, appTheme.colors[key])
      window.appTheme[key] = appTheme.colors[key]
      root.style.setProperty('--' + key, appTheme.colors[key]);
    });
  });




render();