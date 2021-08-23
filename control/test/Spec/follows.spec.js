//const { response } = require("express");


//const { response } = require("express");

describe('Follow()', function () {

    // 1st test
    describe('FollowUsers()', function () {
        it('Follow function should be defined', function () {
            expect(Follows.followUser).toBeDefined('Follows functionality not defined');
        });
    });
    // 2nd test (EVERYTIME THERES A CALLBACK PLEASE WRITE IN THIS MANNER)
    // Follows.followUser("randomID" , (err , r) =>{
    //     describe("Checking if followuser with random id works" , function(){
    //         xit("Should return error" , function(){
    //             expect(err).toBeDefined("No error :C");
    //         });
    //     });
    // });
    // 3rd test
    // Follows.followUser(null , (err , r) =>{
    //     describe("Checking if followuser with no id works" , function(){
    //         it("Should return error" , function(done){
    //             const errorspy = spyOn(Follows,'followUser');
    //             expect(Follows.followUser).toThrow();
    //             const callbackSpy = jasmine.createSpy();
    //             Follows.followUser('abcOrWhateverThisIdis', callbackSpy);
    //             expect(callbackSpy).toHaveBeenCalledWith("the expected error")
    //             expect(r).toThrow();
    //         });
    //     });
    // });
    // describe('using bind with jasmine', function() {
    //     xit('error',  async function() {
    //     var f = await Follows.followUser('')
    //         if(error) {
    //                 expect(f.bind(null,2)).toThrowError(err);
    //             };
    //     });
    // });
    describe('FollowUsers()', function () {

        it('Follow function should be defined', function () {
            expect(Follows.followUser).toBeDefined('Follows functionality not defined');
        });
        it('Follow users function should be defined', function () {
            expect(Follows.followUser).toBeDefined('Follow users functionality not defined');
        });
        xit('Follow users should not accept follow empty ID', function () {
            //wrong check error returned ****
            // spyOn(Follows.followUser,fUserId)
            //expect(function(){Follows.followUser("")}).toHaveBeenCalled(Error)
        });
        it('Follow users should follow a valid user ID', function () {
            expect(function () { Follows.followUser("123456789012345678901234") }).not.toThrow();
        });
        it('Follow users should follow another valid user ID', function () {
            expect(function () { Follows.followUser("60f49004784379051298ea37") }).not.toThrow();
        });
        it('Follow users should follow a valid user ID xxxxxxx', function () {
            const callbackSpy = jasmine.createSpy();
            Follows.followUser('xxxxx', (callbackSpy)); 
            expect(callbackSpy).toHaveBeenCalledWith("the expected error");
        });
    });
})