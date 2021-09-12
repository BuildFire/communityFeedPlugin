describe('Follow()', function () {

  /* users id list:
  valid user id 60f49004784379051298ea37 ,example to get 'Already following this user'
  current user id 60f469cf784379051298e96d
  valid user id 6106efbc4e626c0521472a63 not following current user
  valid user id 6126c0e5fe743405301f11e8 for successful follow 
  valid plugin instance 1627334094776-047554258642281355
  */

  beforeEach(function(done) {
      setTimeout(function() {
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
            expect(err).toEqual('User does not exist');
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

    it('Follow user with currentuser ID', function(done) {
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

    it('Unfollow user with malformated user ID', function(done) {
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

    it('Unfollow user with invalid user ID', function(done) {
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

    it('Follow user with long invalid user id', function(done) {
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

  it('follow valid plugin', function(done) {
    Follows.followPlugin((err,resp) => {
      if(err){
        expect(err).toEqual("Already following this plugin");
      } 
      else if(resp){
        expect(resp).toEqual('tghjkl');
      } 
      done();
    });
});
});

/*******************************************/
/************* Unfollow Plugin *************/
/*******************************************/


describe('unfollowPlugin()', function () {

  it('unfollowPlugin function should be defined', function () {
    expect(Follows.unfollowPlugin).toBeDefined('unfollowPlugin functionality not defined');
  });


  it('unfollow plugin with valid plugin ID', function(done) {
    Follows.unfollowPlugin((err,resp) => {
      expect(err).toEqual('Plugin does not exist');
      done();
    });
  });

});

/*******************************************/
/************ is Following User ************/
/*******************************************/

describe('isFollowingUser()', function () {
      
    it('is Following User function should be defined', function () {
          expect(Follows.isFollowingUser).toBeDefined('isFollowingUser functionality not defined');
      });

      it('is Following User with malformated user ID', function(done) {
          Follows.isFollowingUser("xxx",(err,resp) => {
            expect(err).toEqual('User does not exist');
            expect(resp).toEqual('User does not exist');
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
        Follows.isFollowingUser('60f49004784379051298ea38',(err ,resp) => {
          expect(err).toEqual('User does not exist');
          expect(resp).toEqual('User does not exist');
          done();
        });
    });

    it('is Following User already following', function(done) {
      Follows.isFollowingUser('60f49004784379051298ea37',(err , resp) => {
        expect(err).toEqual(null);
        expect(resp).toEqual(true);
        done();
      });
    });

    it('is Following User not following', function(done) {
      Follows.isFollowingUser('6106efbc4e626c0521472a63',(err , resp) => {
        expect(err).toEqual(null);
        expect(resp).toEqual(false);
        done();
      });
    });

    it('is Following User with long invalid user id', function(done) {
      Follows.isFollowingUser('60f49004784379051298ea3760f4760f49004784379051298ea37',(err) => {
        expect(err).toEqual('User does not exist');
        done();
      });
    });
   
    it('is Following User with current user id', function(done) {
      Follows.isFollowingUser(authManager.currentUser._id,(err,resp) => {
        expect(err).toEqual("You can't be following yourself");
        done();
      });
    });


    //follow valid user id without any error
  });

/*******************************************/
/************ is Following Plugin **********/
/*******************************************/

describe('isFollowingPlugin()', function () {
      
  it('is Following plugin function should be defined', function () {
        expect(Follows.isFollowingPlugin).toBeDefined('isFollowingPlugin functionality not defined');
    });

    it('is Following plugin with malformated plugin ID', function(done) {
        Follows.isFollowingPlugin("xxx",(err,resp) => {
          expect(err).toEqual('User does not exist');
          expect(resp).toEqual('User does not exist');
          done();
        });
    });

    it('is Following plugin with null plugin ID', function(done) {
        Follows.isFollowingPlugin(null,(err) => {
          expect(err).toEqual('Plugin ID cannot be null');
          done();
        });
    });

    it('is Following plugin with invalid plugin ID', function(done) {
      Follows.isFollowingPlugin('60f49004784379051298ea38',(err ,resp) => {
        expect(err).toEqual('User does not exist');
        expect(resp).toEqual('User does not exist');
        done();
      });
  });

  it('is Following plugin already following', function(done) {
    Follows.isFollowingPlugin('1627334094776-047554258642281355',(err , resp) => {
      expect(err).toEqual("nulloi");
      expect(resp).toEqual("trueee");
      done();
    });
  });

  it('is Following plugin not following', function(done) {
    Follows.isFollowingPlugin('6106efbc4e626c0521472a63',(err , resp) => {
      expect(err).toEqual("nulddl");
      expect(resp).toEqual("faldse");
      done();
    });
  });

  it('is Following plugin with long invalid plugin id', function(done) {
    Follows.isFollowingPlugin('60f49004784379051298ea3760f4760f49004784379051298ea37',(err,resp) => {
      expect(err).toEqual('User does not exist');
      expect(resp).toEqual('User does not exist');
      done();
    });
  });
 
  it('is Following plugin with current plugin id', function(done) {
    Follows.isFollowingPlugin(authManager.currentUser._id,(err,resp) => {
      expect(err).toEqual("You can't be following yourself");
      done();
    });
  });


  //follow valid user id without any error
});

/*******************************************/
/************ Toggle Follow User ***********/
/*******************************************/
describe('toggleFollowUser()',function () {

  it('toggle Follow User function should be defined', function () {
    expect(Follows.toggleFollowUser).toBeDefined('toggleFollowUser functionality not defined');
});

  it('toggle Follow User with malformated user ID', function(done) {
      Follows.toggleFollowUser("xxx",(err) => {
        expect(err).toEqual('User does not exist');
        done();
      });
  });

  it('toggle Follow User with null user ID', function(done) {
      Follows.toggleFollowUser(null,(err) => {
        expect(err).toEqual('User ID cannot be null');
        done();
      });
  });

  it('toggle Follow User with invalid user ID', function(done) {
    Follows.toggleFollowUser('60f49004784379051298ea38',(err) => {
      expect(err).toEqual('User does not exist');
      done();
    });
  });

  it('toggle Follow User with long invalid user id', function(done) {
    Follows.toggleFollowUser('60f49004784379051298ea3760f4760f49004784379051298ea37',(err) => {
      expect(err).toEqual('User does not exist');
     done();
    });
  });

  it('toggle Follow User with valid user id', function(done) {
    Follows.toggleFollowUser('6126c0e5fe743405301f11e8' , (err,resp) => {
      expect(err).toEqual(null)
      expect(resp).not.toEqual("null");
      done();
    });
  });  

  it('toggle Follow User for current user id', function(done) {
    Follows.toggleFollowUser(authManager.currentUser._id,(err,resp) => {
      expect(err).toEqual("You can't follow yourself");
      done();
    });
  });
});

/*******************************************/
/************ Toggle Follow Plugin ***********/
/*******************************************/
describe('toggleFollowPlugin()',function () {

  it('toggle Follow User function should be defined', function () {
    expect(Follows.toggleFollowPlugin).toBeDefined('toggleFollowPlugin functionality not defined');
  });

  it('toggle Follow Plugin with valid plugin id', function(done) {
    Follows.toggleFollowPlugin((err,resp) => {
      expect(err).toEqual(null)
      expect(resp).not.toEqual(null);
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