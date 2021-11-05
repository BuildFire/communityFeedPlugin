
        const validateForm = (callback) =>{
            let title = document.getElementById("title");
            let description = document.getElementById("description");
            if(title.value.length == 0 || title.value.replace(/\s/g, "").length == 0){
                showError("title", "empty");
                return callback(true);
            }
            else if(title.value.length > 100){
                showError("title", "length");
                return callback(true);
            }
            else if(description.value.length == 0 || description.value.replace(/\s/g, "").length == 0){
                showError("desc", "empty");
                return callback(true);
            }
            else if(description.value.length > 100){
                showError("desc", "length");
                return callback(true);
            }
            return callback(null, true)
        }

        const clearAllErrors = (title = true, desc = true) =>{
            if(title){
                document.getElementById("titleErrors").style.display = "none";
                document.getElementById("titleLengthError").style.display = "none";
                document.getElementById("titleEmptyError").style.display = "none";
                document.getElementById("title").style.borderColor = "#e5e5e5";
            }
            if(desc){
                document.getElementById("descErrors").style.display = "none";
                document.getElementById("descLengthError").style.display = "none";
                document.getElementById("descEmptyError").style.display = "none";
                document.getElementById("description").style.borderColor = "#e5e5e5";
            }
        }

        const showError = (input, type) =>{
            if(input == "title" && type == "length"){
                document.getElementById("titleErrors").style.display = "grid";
                document.getElementById("titleLengthError").style.display = "block";
                document.getElementById("title").style.borderColor = "red";
            }
            else if(input == "title" && type == "empty"){
                document.getElementById("titleErrors").style.display = "grid";
                document.getElementById("titleEmptyError").style.display = "block";
                document.getElementById("title").style.borderColor = "red";
            }
            else if(input == "desc" && type == "length"){
                document.getElementById("descErrors").style.display = "grid";
                document.getElementById("descLengthError").style.display = "block";
                document.getElementById("description").style.borderColor = "red";
            }
            else if(input == "desc" && type == "empty"){
                document.getElementById("descErrors").style.display = "grid";
                document.getElementById("descEmptyError").style.display = "block";
                document.getElementById("description").style.borderColor = "red";
            }
        }


