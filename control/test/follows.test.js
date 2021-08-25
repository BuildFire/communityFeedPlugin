// const e = require("express");

//let followsTest = {
//     run:function(){
//         followsTest.testExist();

//     },
//     testExist : function(){
//         if(typeof(Follows) == "undefined"){
//             console.error("Follows exists : Failed");
//         } else {
//             console.log("Follows exists : Passed");
//         }
//     },
//     testFollowUser : function(){
//         //check follow functionality
//         if(typeof(Follows.followUser)=="undefined"){
//             console.error("follow user exist failed");
//         }
//         else{
//             console.log("follow user exist passed");
//             Follows.followUser("" ,(err,resp) =>{
//                 //check follow functionality for empty ID
//                 if(err){
//                     console.error("Checking follow user with an empty ID:",err);
//                 }
//                 else{
//                     console.log("Checking follow user with an empty ID:",resp);
//                 }
//             });
//             Follows.followUser("60f49004784379051298ea37" ,(err,resp) =>{
//                 //Check follow valid id
//                 if(err){
//                     console.error("Checking follow user with a vaild ID:" ,err);
//                 }
//                 else{
//                     Follows.clearAppData();
//                     console.log("Checking follow user with a valid ID:", resp);
//                 }
//             });
//             Follows.followUser("60f49004784379051298ea37" ,(err,resp) =>{
//                 //check following existing user
//                 if(err){
//                     console.error("Checking follow user with a vaild ID that is already followed:",err);
//                 }
//                 else{
//                     console.log("Checking follow user with a valid ID that is already followed:",resp);
//                 }
//             });
//             followsTest.testGetAllFollowedUsers();
//             Follows.followUser("60f490047843790" ,(err,resp) =>{
//                 //check following invalid user id [numbers]
//                 if(err){
//                     console.error("Checking follow user with an invaild id length :",err);
//                 }
//                 else{
//                     console.log("Checking follow user with an invalid id length :",resp);
//                 }
//             });
//             followsTest.testGetAllFollowedUsers();
//             Follows.followUser("*&^!@#$aTYa" ,(err,resp) =>{
//                 //check following invalid user id [char]
//                 if(err){
//                     console.error("Checking follow user with an invaild special char ID :",err);
//                 }
//                 else{
//                     console.log("Checking follow user with an invalid special char ID :",resp);
//                 }
//             });
//             Follows.followUser("9876543456789123456789098765432123456789098765432345678" ,(err,resp) =>{
//                 //check following invalid user id [long]
//                 if(err){
//                     console.error("Checking follow user with an invaild long ID :",err);
//                 }
//                 else{
//                     console.log("Checking follow user with an invalid long ID :",resp);
//                 }
//             });
//             followsTest.testGetAllFollowedUsers();
//             Follows.followUser("                        " ,(err,resp) =>{
//                 //check follow functionality for an invalid ID [spaces]
//                 if(err){
//                     console.error("Checking follow user with an invalid ID [spaces]:",err);
//                 }
//                 else{
//                     console.log("Checking follow user with an invalid ID [spaces]:",resp);
//                     followsTest.testGetAllFollowedUsers();
//                 }
//             });
//             Follows.TAG("new test",(e,r)=>{
//                 if(r){
//                     console.error("nk test new nk :" , e);
//                 }
//                 else{
//                     console.log("log log log :",r);
//                 }
//             });
//         }

//     },
//     testUnfollowUsers : function(){
//         if(typeof(Follows.unfollowUser)=="undefined"){
//             console.error("Unfollow user exist failed");
//         }
//         else{
//             console.log("Unfollow user exist passed");
//             Follows.unfollowUser("" ,(err,resp) =>{
//                 //check unfollow functionality for empty ID
//                 if(err){
//                     console.error("Checking unfollow user with an empty ID:",err);
//                 }
//                 else{
//                     console.log("Checking unfollow user with an empty ID:",resp);
//                 }
//             });
//             Follows.unfollowUser("60f49004784379051298ea37" ,(err,resp) =>{
//                 //Check unfollow valid id
//                 if(err){
//                     console.error("Checking unfollow user with a vaild ID:" ,err);
//                 }
//                 else{
//                     console.log("Checking unfollow user with a valid ID:", resp);
//                 }
//             });
//             Follows.unfollowUser("60f49004784379051298ea37" ,(err,resp) =>{
//                 //check unfollowing existing user
//                 if(err){
//                     console.error("Checking unfollow user with a vaild ID that is already followed:",err);
//                 }
//                 else{
//                     console.log("Checking unfollow user with a valid ID that is already followed:",resp);
//                 }
//             });
//             followsTest.testGetAllFollowedUsers();
//             Follows.unfollowUser("60f490047843790" ,(err,resp) =>{
//                 //check unfollowing invalid user id [numbers]
//                 if(err){
//                     console.error("Checking unfollow user with an invaild id length :",err);
//                 }
//                 else{
//                     console.log("Checking unfollow user with an invalid id length :",resp);
//                 }
//             });
//             followsTest.testGetAllFollowedUsers();
//             Follows.unfollowUser("*&^!@#$aTYa" ,(err,resp) =>{
//                 //check unfollowing invalid user id [char]
//                 if(err){
//                     console.error("Checking unfollow user with an invaild special char ID :",err);
//                 }
//                 else{
//                     console.log("Checking unfollow user with an invalid special char ID :",resp);
//                 }
//             });
//             Follows.unfollowUser("9876543456789123456789098765432123456789098765432345678" ,(err,resp) =>{
//                 //check unfollowing invalid user id [long]
//                 if(err){
//                     console.error("Checking unfollow user with an invaild long ID :",err);
//                 }
//                 else{
//                     console.log("Checking unfollow user with an invalid long ID :",resp);
//                 }
//             });
//             followsTest.testGetAllFollowedUsers();
//             Follows.unfollowUser("                        " ,(err,resp) =>{
//                 //check unfollow functionality for an invalid ID [spaces]
//                 if(err){
//                     console.error("Checking unfollow user with an invalid ID [spaces]:",err);
//                 }
//                 else{
//                     console.log("Checking unfollow user with an invalid ID [spaces]:",resp);
//                     followsTest.testGetAllFollowedUsers();
//                 }
//             });
//         }

//     },
//     testGetAllFollowedUsers : function(){
//         if(typeof(Follows.getFollowedUsers)=="undefined"){
//             console.error("Get all followed users exist is failed");
//         } else{
//             console.log("Get all followed user exist is passed");
//             Follows.getFollowedUsers((err , resp) => {
//                 if(err) console.error(err);
//                 else console.log(resp);
//             });
//         }
//     }

// };
// // followsTest.testExist();
// followsTest.testFollowUser();
// // //followsTest.testGetAllFollowedUsers();
// // //Follows.clearAppData();
// // followsTest.testUnfollowUsers();