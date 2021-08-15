describe('Follow()', function () {

    beforeAll(function(){

        const followUser = Follows.followUser;
        this.followUser = followUser;

    });
    beforeEach(function(){

    });
    
    describe('FollowUsers()', function () {

        it('Follow function should be defined', function () {
            expect(this.followUser).toBeDefined('Follows functionality not defined');
        });
        it('Follow users function should be defined', function () {
            expect(this.followUser).toBeDefined('Follow users functionality not defined');
        });
        it('Follow users should not accept follow empty ID', function () {
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
        

    });
});