describe('Follow()', function () {

  beforeEach(function(done) {
      setTimeout(function() {
          // authManager.enforceLoginWithCb(cb => {
          //     if(cb == 0) throw "An error occured";
          //     done();
          // });
        authManager.enforceLogin();
        done();
      }, 100);
    });

/******************************************/
/************* Follow User ***************/
/****************************************/

  describe('FollowUsers()', function () {
      
    it('Follow function should be defined', function () {
          expect(Follows.followUser).toBeDefined('FollowUser functionality not defined');
      });

      it('Follow user with malformated user ID', function(done) {
          Follows.followUser("xxx",(err) => {
            expect(err).toEqual('User does not existmmmm');
            done();
          });
      });

      it('Follow user with null user ID', function(done) {
          Follows.followUser(null,(err) => {
            expect(err).toEqual('User ID cannot be null');
            done();
          });
      });

      it('Follow user with invalid user ID', function(done) {
        Follows.followUser('60f49004784379051298ea38',(err) => {
          expect(err).toEqual('User does not exist');
          done();
        });
    });

    it('Follow user already following', function(done) {
      Follows.followUser('60f49004784379051298ea37',(err) => {
        expect(err).toEqual('Already following this user');
        done();
      });
    });

    it('Follow user with long invalid user id', function(done) {
      Follows.followUser('60f49004784379051298ea3760f4760f49004784379051298ea37',(err) => {
        expect(err).toEqual('User does not exist');
        done();
      });
    });
    it('Follow user with long invalid user id', function(done) {
      Follows.followUser(authManager.currentUser._id,(err) => {
        expect(err).toEqual("You can't follow yourself");
        done();
      });
    });

    //follow valid user id without any error
  });


/******************************************/
/************* Unfollow User *************/
/****************************************/
  describe('UnfollowUsers()', function () {

    it('UnfollowUser function should be defined', function () {
      expect(Follows.unfollowUser).toBeDefined('UnfollowUser functionality not defined');
  });

    xit('Unfollow user with malformated user ID', function(done) {
        Follows.unfollowUser("xxx",(err) => {
          expect(err).toEqual('User does not exist');
          done();
        });
    });

    it('Unfollow user with null user ID', function(done) {
        Follows.unfollowUser(null,(err) => {
          expect(err).toEqual('User ID cannot be null');
          done();
        });
    });

    xit('Unfollow user with invalid user ID', function(done) {
      Follows.unfollowUser('60f49004784379051298ea38',(err) => {
        expect(err).toEqual('User does not exist');
        done();
      });
  });

  it('Unfollow user not following', function(done) {
    Follows.unfollowUser('6106efbc4e626c0521472a63',(err) => {
      expect(err).toEqual('You are not following this user');
      done();
    });
  });
  xit('Follow user with long invalid user id', function(done) {
    Follows.unfollowUser('60f49004784379051298ea3760f4760f49004784379051298ea37',(err) => {
      expect(err).toEqual('User does not exist');
      done();
    });
  });
  it('Follow user with long invalid user id', function(done) {
    Follows.unfollowUser(authManager.currentUser._id,(err) => {
      expect(err).toEqual("You can't unfollow yourself");
      done();
    });
  });
  //unfollow followed user without any error 
});

/******************************************/
/************* Follow Plugin *************/
/****************************************/


describe('followPlugin()', function () {

  it('followPlugin function should be defined', function () {
    expect(Follows.followPlugin).toBeDefined('followPlugin functionality not defined');
});

  it('follow plugin with malformated plugin ID', function(done) {
      Follows.followPlugin("xxx",(err) => {
        expect(err).toEqual('Plugin does not exist');
        done();
      });
  });

  it('follow plugin with null plugin ID', function(done) {
      Follows.followPlugin(null,(err) => {
        expect(err).toEqual('Plugin ID cannot be null');
        done();
      });
  });

  it('follow plugin with invalid plugin ID', function(done) {
    Follows.followPlugin('60f49004784379051298ea38',(err) => {
      expect(err).toEqual('Plugin does not exist');
      done();
    });
  });

  it('follow plugin user with long invalid plugin id', function(done) {
    Follows.followPlugin('60f49004784379051298ea3760f4760f49004784379051298ea37',(err) => {
      expect(err).toEqual('Plugin does not exist');
     done();
    });
  });
  it('follow plugin with valid plugin id', function(done) {
    //expect(Follows.followPlugin(buildfire.context.instanceId)).toEqual('iuhkhhj`');
    expect(Follows.getUserFollowData).toEqual('iuhuih');
  //Follows.followPlugin(buildfire.context.instanceId,(err) => {
    //follow Community Wall plugin
    //expect(err).toEqual("Already following this plugin");
    done();
  //});
});
//follow plugin without any error 
});

/*******************************************/
/************* Unfollow Plugin *************/
/*******************************************/


describe('unfollowPlugin()', function () {

  it('unfollowPlugin function should be defined', function () {
    expect(Follows.unfollowPlugin).toBeDefined('followPlugin functionality not defined');
});

  it('unfollow plugin with malformated plugin ID', function(done) {
      Follows.unfollowPlugin("xxx",(err) => {
        expect(err).toEqual('Plugin does not exist');
        done();
      });
  });

  it('unfollow plugin with null plugin ID', function(done) {
      Follows.unfollowPlugin(null,(err) => {
        expect(err).toEqual('Plugin ID cannot be null');
        done();
      });
  });

  it('unfollow plugin with invalid plugin ID', function(done) {
    Follows.unfollowPlugin('60f49004784379051298ea38',(err) => {
      expect(err).toEqual('Plugin does not exist');
      done();
    });
  });

  it('unfollow plugin user with long invalid plugin id', function(done) {
  Follows.unfollowPlugin('60f49004784379051298ea3760f4760f49004784379051298ea37',(err) => {
    expect(err).toEqual('Plugin does not exist');
    done();
    });
  });

//follow plugin without any error 
});

/*******************************************/
/************ is Following User ************/
/*******************************************/

describe('isFollowingUser()', function () {
      
    it('is Following User function should be defined', function () {
          expect(Follows.isFollowingUser).toBeDefined('isFollowingUser functionality not defined');
      });

      it('is Following User with malformated user ID', function(done) {
          Follows.isFollowingUser("xxx",(err) => {
            expect(err).toEqual('User does not exist');
            done();
          });
      });

      it('is Following User with null user ID', function(done) {
          Follows.isFollowingUser(null,(err) => {
            expect(err).toEqual('User ID cannot be null');
            done();
          });
      });

      it('is Following User with invalid user ID', function(done) {
        Follows.isFollowingUser('60f49004784379051298ea38',(err) => {
          expect(err).toEqual('User does not exist');
          done();
        });
    });

    it('is Following User already following', function(done) {
      Follows.isFollowingUser('60f49004784379051298ea37',(err) => {
        expect(err).toEqual('Already following this user');
        done();
      });
    });

    it('is Following User with long invalid user id', function(done) {
      Follows.isFollowingUser('60f49004784379051298ea3760f4760f49004784379051298ea37',(err) => {
        expect(err).toEqual('User does not exist');
        done();
      });
    });
    it('is Following User with long invalid user id', function(done) {
      Follows.isFollowingUser(authManager.currentUser._id,(err,resp) => {
        expect(err).toEqual("You can't follow yourself");
        expect(resp).toEqual("You can't follow yourself");
        done();
      });
    });

    //follow valid user id without any error
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