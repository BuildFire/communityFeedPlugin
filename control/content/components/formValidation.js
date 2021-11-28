

const checkIfCanSubmit = () =>{
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let button = document.getElementById("saveButton");
    if(title.value.replace(/\s/g, "").length > 0 && title.value.length < 500 && description.value.replace(/\s/g, "").length > 0 && description.value.length < 500){
        button.disabled = false;
    }
    else button.disabled = true;
}