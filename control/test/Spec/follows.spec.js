describe('Follow()', function () {
    // 1st test
    describe('FollowUsers()', function () {
        it('Follow function should be defined', function () {
            expect(Follows.followUser).toBeDefined('Follows functionality not defined');
        });
    });
    // 2nd test (EVERYTIME THERES A CALLBACK PLEASE WRITE IN THIS MANNER)
    Follows.followUser("randomID" , (err , r) =>{
        describe("Checking if followuser with random id works" , function(){
            it("Should return error" , function(){
                expect(err).toBeDefined("No error :C");
            })
        })
    });
    // 3rd test
    Follows.followUser(null , (err , r) =>{
        describe("Checking if followuser with no id works" , function(){
            it("Should return error" , function(){
                expect(err).toBeDefined("No error :C");
            })
        })
    });


});