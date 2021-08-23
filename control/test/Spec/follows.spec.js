describe('Follow()', function () {

    beforeEach(function(done) {
        setTimeout(function() {
            authManager.enforceLoginWithCb(cb => {
                if(cb == 0) throw "An error occured";
                done();
            });
      
        }, 100);
      });

    describe('FollowUsers()', function () {
        it('Follow user with wrong ID', function(done) {
            Follows.followUser("xxx",(err) => {
              expect(err).toBeDefined();
              done();
            });
            
        });
        it('Follow user with no ID', function(done) {
            Follows.followUser(null,(err) => {
              expect(err).toBeDefined();
              done();
            });
        });

    });
    
});
/* TEMPLATE FOR A TEST
      describe('YOUR TITLE HERE', function () {
        it('YOUR MESSAGE HERE', function(done) {
            // DO NOT REMOVE THE done arguments above
            // CODE TO BE EDITED //
            //////////
                // Follows.followUser("xxx",(err) => {
                //   expect(err).toEqual("IDK");
                //   done();
                // });
            //////////
        });
            
        });
    });

*/