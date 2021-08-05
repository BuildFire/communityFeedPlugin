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
        if(typeof(Follows.followUser)=="undefined"){
            console.error("follow user exist failed");
        }
        else{
            //Follows.clearAppData();
            // delete if you want to keep the follows data
            console.log("follow user exist passed");
            Follows.followUser("" ,(err,resp) =>{
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
                if(err){
                    console.error("Checking follow user with a vaild ID that is already followed:");
                    console.error(err);
                }
                else{
                    console.log("Checking follow user with a valid ID that is already followed:");
                    console.log(resp);
                }
            });

        }

    },
    testGetAllFollowedUsers : function(){
        if(typeof(Follows.getFollowedUsers)=="undefined"){
            console.error("Get all followed users exist is failed");
        }
        else{
            console.log("Get all followed user exist is passed")
            Follows.getFollowedUsers((err , resp) => {
                if(err) console.error(err);
                else console.log(resp);
            });
        }
    }
};
//followsTest.testFollowUser();
followsTest.testGetAllFollowedUsers();