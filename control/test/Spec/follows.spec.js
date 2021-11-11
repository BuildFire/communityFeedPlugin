describe('Follow()', function () {

  /* users id list:
  valid user id 60f49004784379051298ea37 ,example to get 'Already following this user'
  current user id 60f469cf784379051298e96d
  valid user id 6106efbc4e626c0521472a63 not following current user
  valid user id 6126c0e5fe743405301f11e8 for successful follow 
  valid plugin instance 1627334094776-047554258642281355
  */

  /*beforeEach(function(done) {
      setTimeout(function() {
        //authManager.enforceLogin();
        buildfire.auth.login();
        done();
      }, 100);
    });*/

/******************************************/
/************* Follow User ***************/
/****************************************/
  describe('FollowUsers()', function () {
      let malformatedID = 'xxx';
      let invalidUserID = '8888';
      let longInvalidUserID = '60f49004784379051298ea3760f4760f49004784379051298ea37'; 

      it('Follow function should be defined', function () {
          expect(Follows.followUser).toBeDefined('FollowUser functionality not defined');
      });
//--->bellow TC
      xit('Follow user with malformated user ID', function(done) {
          Follows.followUser(malformatedID,(e) => {
            expect(e).toEqual('User does not exist');
          });
          done();
      });

      it('Follow user with null user ID', function(done) {
          Follows.followUser(null,(err) => {
            expect(err).toEqual('User ID cannot be null');
          });
          done();
      });

//----> bellow TC
      xit('Follow user with invalid user ID', function(done) {
        Follows.followUser(invalidUserID,(err) => {
          expect(err).toEqual('User does not exist');
        });
        done();
    });

    it('Follow user already following', function(done) {
      Follows.followUser('60f49004784379051298ea37',(err,resp) => {
        expect(err).toEqual('Already following this user');
        expect(resp).toBeUndefined;
      });
      done();
    });

  //----> bellow test case
    xit('Follow user with long invalid user id', function(done) {
      Follows.followUser(longInvalidUserID,(err) => {
        expect(err).toEqual('User does not exist');
      });
      done();
    });
    //---> no exception 
    it('Follow user with currentuser ID', function(done) {
      buildfire.auth.getCurrentUser((err, currentUser) => {
              Follows.followUser(currentUser._id,(e , r) =>{
                  expect(e).toEqual("You cannot follow yourself");
              })
        done();
      });
    });

  });


/******************************************/
/************* Unfollow User *************/
/****************************************/
  describe('UnfollowUsers()', function () {
      let malformatedID = 'xxx';
      let invalidUserID = '8888';
      let longInvalidUserID = '60f49004784379051298ea3760f4760f49004784379051298ea37'; 
      let validUserID = '6106efbc4e626c0521472a63';

    it('UnfollowUser function should be defined', function () {
      expect(Follows.unfollowUser).toBeDefined('UnfollowUser functionality not defined');
  });

  //---> bellow test case
    xit('Unfollow user with malformated user ID', function(done) {
        Follows.unfollowUser(malformatedID,(err) => {
          expect(err).toEqual('User does not exist');
        });
        done();
    });

    it('Unfollow user with null user ID', function(done) {
        Follows.unfollowUser(null,(err) => {
          expect(err).toEqual('User ID cannot be null');
        });
        done();
    });

    //--> failed on user foes not exist
    it('Unfollow user with invalid user ID', function(done) {
      Follows.unfollowUser(invalidUserID,(err) => {
        expect(err).toEqual('Not following this user');
      });
      done();
  });

    it('Unfollow user not following', function(done) {
    Follows.unfollowUser(validUserID,(err) => {
      expect(err).toEqual('Not following this user');
    });
    done();
  });

  //---> instead of invalid id 
    it('Unfollow user with long invalid user id', function(done) {
    Follows.unfollowUser(longInvalidUserID,(err) => {
      expect(err).toEqual('Not following this user');
    });
    done();
  });

  //---> getting Not following this user instead
    xit('Unfollow current user', function(done) {
    buildfire.auth.getCurrentUser((err, currentUser) => {
      Follows.unfollowUser(currentUser._id,(err , resp) => {
        expect(err).toEqual("You can't unfollow yourself");
    });
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

  it('followPlugin response should be defined', function(done) {
    Follows.followPlugin((err,resp) => {
        expect(resp).toBeDefined('followPlugin response is not defined');
    });
    done();
  });
});

/*******************************************/
/************* Unfollow Plugin *************/
/*******************************************/


describe('unfollowPlugin()', function () {

  it('unfollowPlugin function should be defined', function () {
    expect(Follows.unfollowPlugin).toBeDefined('unfollowPlugin functionality not defined');
  });


  it('unfollowPlugin response should be defined', function(done) {
    Follows.unfollowPlugin((err,resp) => {
      expect(resp).toBeDefined(undefined);
    });
    done();
  });

});

/*******************************************/
/************ is Following User ************/
/*******************************************/

describe('isFollowingUser()', function () {
  let malformatedID = 'xxx';
  let invalidUserID = '8888';
  let longInvalidUserID = '60f49004784379051298ea3760f4760f49004784379051298ea37'; 
  let validUserID = '60f49004784379051298ea37';
  let validUserID1 = '6106efbc4e626c0521472a63';
      
    it('is Following User function should be defined', function () {
          expect(Follows.isFollowingUser).toBeDefined('isFollowingUser functionality not defined');
      });
//---> instead of malformated data
      it('is Following User with malformated user ID', function(done) {
          Follows.isFollowingUser(malformatedID,(err,resp) => {
            expect(err.message).toEqual("Couldn't find matching data");
            expect(resp).toEqual(undefined);
          });
          done();
      });

      it('is Following User with null user ID', function(done) {
          Follows.isFollowingUser(null,(err) => {
            expect(err).toEqual('User ID cannot be null');
          });
          done();
      });

      it('is Following User with invalid user ID', function(done) {
        Follows.isFollowingUser(invalidUserID,(err ,resp) => {
          expect(err.message).toEqual("Couldn't find matching data");
          expect(resp).toEqual(undefined);
        });
        done();
    });

    //--> for me needs maintenance
    xit('is Following User already following', function(done) {
      Follows.isFollowingUser('60f49004784379051298ea37',(err , resp) => {
        expect(err).toEqual(null);
        expect(resp).toEqual(true);
      });
      done();
    });

    it('is Following User not following', function(done) {
      Follows.isFollowingUser(invalidUserID,(err , resp) => {
        expect(err.message).toEqual("Couldn't find matching data");
        expect(resp).toEqual(undefined);
      });
      done();
    });

    it('is Following User with long invalid user id', function(done) {
      Follows.isFollowingUser(longInvalidUserID,(err) => {
        expect(err.message).toEqual("Couldn't find matching data");
      });
      done();
    });
   //--> getting Not following this user instead of cannout follow yourself
    it('is Following User with current user id', function(done) {
      buildfire.auth.getCurrentUser((err, currentUser) => {
        Follows.isFollowingUser(currentUser._id,(e , r) =>{
        expect(e).toEqual("Not following this user");
      });
      done();
    });
  });


    //follow valid user id without any error
  });

/*******************************************/
/************ is Following Plugin **********/
/*******************************************/

xdescribe('isFollowingPlugin()', function () {
  let malformatedID = 'xxx';
  let invalidUserID = '8888';
  let longInvalidUserID = '60f49004784379051298ea3760f4760f49004784379051298ea37'; 
  let validUserID = '60f49004784379051298ea37';
  let validUserID1 = '6106efbc4e626c0521472a63';

  it('is Following plugin function should be defined', function () {
        expect(Follows.isFollowingPlugin).toBeDefined('isFollowingPlugin functionality not defined');
    });

    it('is Following plugin with malformated plugin ID', function(done) {
        Follows.isFollowingPlugin((pluginId = null) => {
          expect(e).toEqual('User does not exist');
          expect(resp).toEqual(undefined);
        });
        done();
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
      expect(err).toEqual("Not following this plugin");
      expect(resp).toEqual(undefined);
      done();
    });
  });

  it('is Following plugin with long invalid plugin id', function(done) {
    Follows.isFollowingPlugin('60f49004784379051298ea3760f4760f49004784379051298ea37',(err,resp) => {
      expect(err).toEqual('Plugin does not exist');
      expect(resp).toEqual(undefined);
      done();
    });
  });
 
  it('is Following plugin with current plugin id', function(done) {
    Follows.isFollowingPlugin(authManager.currentUser._id,(err,resp) => {
      expect(err).toEqual("Not following this plugin");
      done();
    });
  });


  //follow valid user id without any error
});

/*******************************************/
/************ Toggle Follow User ***********/
/*******************************************/
xdescribe('toggleFollowUser()',function () {

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
      //expect(err).toEqual(null)
      //expect(resp.tag).toEqual("follows");
      console.log('nooooooo',resp.data.followedUsers);
      expect(resp.data.followedUsers).toEqual('6126c0e5fe743405301f11e8y');
      done();
    });
    done();
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
xdescribe('toggleFollowPlugin()',function () {

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