let followsTest = {
    run:function(){
        followsTest.testExist();

    },
    testExist : function(){
        if(typeof(Follows) == "undefined"){
            console.error("Follows exists : Failed");
        } else {
            console.log("Follows exists : Passed");
        }
    },
    testFollowUser : function(){
        //check follow functionality
        if(typeof(Follows.followUser)=="undefined"){
            console.error("follow user exist failed");
        }
        else{
            console.log("follow user exist passed");
            Follows.followUser("" ,(err,resp) =>{
                //check follow functionality for empty ID
                if(err){
                    console.error("Checking follow user with an empty ID:");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with an empty ID:");
                    console.log(resp);
                }
            });
            Follows.followUser("60f49004784379051298ea37" ,(err,resp) =>{
                //Check follow valid id
                if(err){
                    console.error("Checking follow user with a vaild ID:");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with a valid ID:");
                    console.log(resp);
                }
            });
            Follows.followUser("60f49004784379051298ea37" ,(err,resp) =>{
                //check following existing user
                if(err){
                    console.error("Checking follow user with a vaild ID that is already followed:");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with a valid ID that is already followed:");
                    console.log(resp);
                }
            });
            Follows.followUser("60f490047843790" ,(err,resp) =>{
                //check following invalid user id [numbers]
                if(err){
                    console.error("Checking follow user with an invaild id length :");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with an invalid id length :");
                    console.log(resp);
                }
            });
            Follows.followUser("*&^!@#$aTYa" ,(err,resp) =>{
                //check following invalid user id [char]
                if(err){
                    console.error("Checking follow user with an invaild special char ID :");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with an invalid special char ID :");
                    console.log(resp);
                }
            });
////////////check follow functionality for blocked list///////////////////
            Follows.followUser("9876543456789123456789098765432123456789098765432345678" ,(err,resp) =>{
                //check following invalid user id [long]
                if(err){
                    console.error("Checking follow user with an invaild long ID :");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with an invalid long ID :");
                    console.log(resp);
                }
            });
            Follows.followUser("                        " ,(err,resp) =>{
                //check follow functionality for an invalid ID [spaces]
                if(err){
                    console.error("Checking follow user with an invaled ID:");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with an invalid ID:");
                    console.log(resp);
                }
            });
        }

    },
    testGetAllFollowedUsers : function(){
        if(typeof(Follows.getFollowedUsers)=="undefined"){
            console.error("Get all followed users exist is failed");
        } else{
            console.log("Get all followed user exist is passed")
            Follows.getFollowedUsers((err , resp) => {
                if(err) console.error(err);
                else console.log(resp);
            });
        }
    }

};
Follows.clearAppData();
followsTest.testExist();
followsTest.testFollowUser();
followsTest.testGetAllFollowedUsers();
Follows.clearAppData();