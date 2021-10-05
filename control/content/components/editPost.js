let objid;
buildfire.history.get(
    {
      pluginBreadcrumbsOnly: true,
    },
    (err, result) => {
        objid = result[0].label;
        render(objid);
    }
);


const render = (id) =>{
    Posts.getById(id,(err, r) =>{
        document.getElementById("subtitle").innerHTML = `Public Posts / ${r.data.displayName}`;
        document.getElementById("title").value = `${r.data.displayName}`;
        document.getElementById("description").value = `${r.data.postText}`;
        document.getElementById("container").classList.remove("hidden")
    })
}

const addPost = () =>{
    if(!objid){
        buildfire.history.get(
            {
              pluginBreadcrumbsOnly: true,
            },
            (err, result) => {
                let title = document.getElementById("title");
                let description = document.getElementById("description");
                title.classList.remove("error");
                description.classList.remove("error");
            
                if(!title.value.replace(/\s/g, "")){
                    title.classList.add("error")
                }
                else if(!description.value.replace(/\s/g, "")){                
                    description.classList.add("error")
                }
                else{
                    Posts.updatePublicPost(result[0].label,{postTitle:title.value,postText:description.value},(err,r) =>{
                        if(r){
                            window.location.href = "../index.html"
                        }   
                    })
                }
            }
        );
    }
    else{

        let title = document.getElementById("title");
        let description = document.getElementById("description");
        title.classList.remove("error");
        description.classList.remove("error");
    
        if(!title.value.replace(/\s/g, "")){
            title.classList.add("error")
        }
        else if(!description.value.replace(/\s/g, "")){                
            description.classList.add("error")
        }
        else{
            
            Posts.updatePublicPost(objid,{postTitle:title.value,postText:description.value},(err,r) =>{
                if(err || !r) return console.error(err);
                if(r){
                    window.location.href = "../index.html"
                }   
            })
        }
    }
}

const goBack = () =>{
    window.location.href = "../index.html"
    buildfire.history.pop();
}