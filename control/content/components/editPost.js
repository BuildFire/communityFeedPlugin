let objid = localStorage.getItem("posttobeedited");

const render = (id) =>{
    Posts.getById(id,(err, r) =>{
        document.getElementById("subtitle").innerHTML = `Public Posts / ${r.data.displayName}`;
        document.getElementById("title").value = `${r.data.displayName}`;
        document.getElementById("description").value = `${r.data.postText}`;
        document.getElementById("container").classList.remove("hidden")
    })
}

const addPost = () =>{
    clearAllErrors();
        validateForm((err,r) =>{
            if(err) return;
            let title = document.getElementById("title");
            let description = document.getElementById("description");
            Posts.updatePublicPost(objid,{postTitle:title.value,postText:description.value},(err,r) =>{
                if(err || !r) return console.error(err);
                if(r){
                    window.location.href = "../index.html"
                }   
            })
        });


}

const goBack = () =>{
    window.location.href = "../index.html"
    buildfire.history.pop();
}

render(objid);