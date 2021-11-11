describe('Posts()', function () {
  /* posts list ids :
  current user fixed post for checing without deleting or updating 613506917d8532067fdd4095
  current user post with special character 61354486ddca14064e977c9f
  current user public post 6136685f7d8532067fdd4e2e
  unfollowed user private post id 612e9ef743556405fd295b8b for userid 6126c0e5fe743405301f11e8
  unfollowed user public post id 612fc03755ddae066e0df10d for userid 604f8dcfbd6aa82ebb15fda2
  followed user post id 612e9fc455ddae066e0de3a2 for userid 60f49004784379051298ea37
  */

  /*beforeEach(function (done) {
    setTimeout(function () {
      authManager.enforceLogin();
      done();
    }, 100);
  });*/

  /******************************************/
  /*************** AddPost *****************/
  /****************************************/
  describe('addPost()', function () {
    let emptyPost = '';
    let postWithText = 'post text test example';
    let postWithImage = 'image test'; 
    let postWithLongText = 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat';

    it('addPost function should be defined', function () {
      expect(Posts.addPost).toBeDefined('addPost functionality not defined');
    });

    it('Add post with empty post image and text', function (done) {
      Posts.addPost(emptyPost, (err) => {
        expect(err.message).toEqual('Must have atleast post text or post images, post images must be an array of atleast one image url');
      });
      done();
    });

    it('Add post with post text and empty image', function (done) {
      Posts.addPost({ postText: postWithText }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postText: postWithText,
          postImages: [],
        }));
        done();
      });
    });
//--> below TC
    xit('Add post with post image and empty text', function (done) {
      Posts.addPost({ postImages: postWithImage }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: postWithImage,
          postText: null,
        }));
        done();
      });
    });
//---> below TC
    xit('Add post with post image and text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
      Posts.addPost({ postImages: postWithText, postText: postWithText }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: postWithText,
          postText: postWithText,
          userId: currentUser._id
        }));
        done();
      });
      });
    });

    xit('Add post with image and long post text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
      Posts.addPost({ postImages: postWithImage, postText: postWithLongText}, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: postWithImage,
          postText: postWithLongText,
          userId: currentUser._id,
        }));
        done();
      });
      });
    });
//-> userid = null on resp and currentUser._id returns undefined !
    xit('Add post with long post text only', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
      Posts.addPost({ postText: 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: postWithLongText,
          userId: currentUser._id,
        }));
        done();
      });
      });
    });
//--> below TC 
    xit('Add public post with post image and text', function (done) {
      Posts.addPost({ isPublic: true, postImages: postWithImage, postText: postWithText }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: postWithImage,
          postText: postWithText,
          userId: currentUser._id,
          isPublic: true
        }));
        done();
      });
    });
//--> below TC 
    xit('Add private post with post image and text', function (done) {
      Posts.addPost({ isPublic: false, postImages: postWithImage, postText: postWithText }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: postWithImage,
          postText: postWithText,
          userId: authManager.currentUser._id,
          isPublic: false
        }));
        done();
      });
    });
//below TC 
   xit('addPost with both null image and null text', function (done) {
      Posts.addPost({ postText: null, postImages: [] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: null,
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });
//--> check currentUser_id
    it('Add post with image and null text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
      Posts.addPost({ postText: null, postImages: ['Add post with image and null text'] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['Add post with image and null text'],
          postText: null,
          //userId: currentUser._id,
          isPublic: false
        }));
        done();
      });
      });
    });

    it('Add post with text and null image', function (done) {
      Posts.addPost({ postText: postWithText, postImages: null }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: postWithText,
          //userId: currentUser._id,
          isPublic: false
        }));
        done();
      });
    });

    it('Add post with multiple images', function (done) {
      Posts.addPost({ postImages: ['image1', 'image2', 'image3'] }, (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['image1', 'image2', 'image3'],
          postText: null,
          //userId: currentUser._id,
          isPublic: false
        }));
        done();
      });
    });

  });

  /******************************************/
  /************** GetPosts *****************/
  /****************************************/
  describe('getPosts()', function () {
    let CFP = 'communityFeedPlugin';

    it('getPosts function should be defined', function () {
      expect(Posts.getPosts).toBeDefined('getPosts functionality not defined');
    });

    it('Get public posts and check all returned posts are public', function (done) {
      Posts.getPosts({ publicPosts: true }, (err, resp) => {
        for (let step = 0; step < (resp.length - 1); step++) {
          expect(resp[resp.length - 1].data.isPublic).toEqual(true);
        }
        done();
      });
    });
//--> below tc 
    xit('Get public posts for a user and check all returned posts', function (done) {
      Posts.getPosts({ userId: '604f8dcfbd6aa82ebb15fda2',isPublic: true }, (err, resp) => {
        let respSize = (resp.length) - 1;
        for (let step = 0; step < respSize; step++) {
          expect(resp[step].data).toEqual(jasmine.objectContaining({
            userId : '60f49004784379051298ea37',
          }));
        };
        done();
      });
    });
//--> below tc
    xit('Get public posts for a user and check all returned posts', function (done) {
      Posts.getPosts({ userId : '604f8dcfbd6aa82ebb15fda2', publicPosts: true }, (err, resp) => {
        for (let step = 0; step < ((resp.length) - 1); step++) {
          expect(resp[step].data.isPublic).toEqual(true);
          expect(resp[step].data).toEqual(jasmine.objectContaining({
            userId : '604f8dcfbd6aa82ebb15fda2',
          }));
        }
        done();
      });
    });
//--> below TC
    xit('getPosts of current user', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
      Posts.getPosts({userId: currentUser._id}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step=0;step <(resp.length-1);step++){
        expect(resp[step].data).toEqual(jasmine.objectContaining({
            "userId": currentUser._id,
            //"displayName": currentUser.displayName,
            "isPublic": true,
        }));
      };
        done();
      });
    });
    });
//--> below TC
    xit('getPosts of current user by followed users', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
      Posts.getPosts({byFollowedUsers : true}, (err, resp) => {
        expect(err).toEqual(null);
        //const byFollowedUsersArray = [Follows.getUserFollowData(resp)];
        //console.log('foll',byFollowedUsersArray);
        for(let step=0;step <(resp.length-1);step++){
        expect(resp[step].data).toEqual(jasmine.objectContaining({
            "userId": currentUser._id,
            "displayName": CFP,
        }));
      };
        done();
      });
    });
    });

  });

  /******************************************/
  /************* updatePost ****************/
  /****************************************/
  describe('updatePost()', function () {
    let updatePostText = "updated-post text sample";
    let updatePostImage = "updated-image test";
    let invalidPostId = '56789876';
    let nonExistPostID = '612e9ef743556405fd295b8Y';
    let noMatch = "Couldn't find matching data";
    let idCannotNull = "id cannot be null";
    let contentAtLeast = 'Must have atleast post text or post images, post images must be an array of atleast one image url';
    let createdOnDate = '2021-08-03T21:31:48.476Z';
    let lastPostUpdatedBy = '8990';
    let validNewUserID = '60f49004784379051298ea37';
    let updateDisplayName = 'test display name';
    let pluginInsIdNew = "1627334094776-047554258642281366" ;
    let newPluginTitle = 'NewPluginTitle'

    it('updatePost should be defined', function () {
      expect(Posts.updatePost).toBeDefined('updatePost functionality not defined');
    });
//--> current user id = null
    xit('updatePost for current user', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: updatePostText, postImages: [updatePostImage] }, (err, resp) => {
            expect(err).toEqual(null);
            expect(resp.data).toEqual(jasmine.objectContaining({
              postText: updatePostText,
              postImages: [updatePostImage],
            }));
            done();
          });
        });
      });
    });

    it('updatePost with null id', function (done) {
      Posts.updatePost(null, { postText: updatePostText, postImages: [updatePostImage] }, (err, resp) => {
        expect(err.message).toEqual(idCannotNull);
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('updatePost with invalid post id', function (done) {
      Posts.updatePost(invalidPostId, { postText: updatePostText, postImages: [updatePostImage] }, (err, resp) => {
        expect(err.message).toEqual(noMatch);
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('updatePost with post id does not exist', function (done) {
      Posts.updatePost(nonExistPostID, { postText: updatePostText, postImages: [updatePostImage] }, (err, resp) => {
        expect(err.message).toEqual(noMatch);
        expect(resp).toEqual(undefined);
        done();
      });
    });
//--> below tc
    xit('updatePost without providing post id', function (done) {
      Posts.updatePost({ postText: updatePostText, postImages: [updatePostImage] }, (err, resp) => {
        expect(err).toEqual(idCannotNull);
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('updatePost with empty post image and text', function (done) {
        buildfire.auth.getCurrentUser((error, currentUser) => {
          Posts.getPosts({userId: currentUser._id}, (err, respo) => {
            Posts.updatePost(respo[1].data, { postText: '', postImages: [] }, (err, resp) => {
              expect(err.message).toEqual(contentAtLeast);
              done();
            });
          });
        });
    });

    xit('updatePost with post text and empty image', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: updatePostText, postImages: [] }, (err, resp) => {
            expect(resp).toEqual(jasmine.objectContaining({
              postText: updatePostText,
              postImages: [],
            }));
            done();
          });
        });
      });
    });

    xit('updatePost with post image and empty text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: '', postImages: [updatePostImage] }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              postText: null,
              postImages: [updatePostImage],
            }));
            done();
          });
        });
      });
    });

    xit('updatePost with post image and text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: updatePostText, postImages: [updatePostImage] }, (err, resp) => {
            expect(resp).toEqual(jasmine.objectContaining({
              postText: updatePostText,
              postImages: [updatePostImage],
            }));
            done();
          });
        });
      });
    });

    xit('updatePost with long post text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: postWithLongText}, (err, resp) => {
            expect(resp).toEqual(jasmine.objectContaining({
              postText: postWithLongText,
            }));
            done();
          });
        });
      });
    });

    xit('updatePost private post with post image and text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { isPublic: false, postImages: [updatePostImage], postText: updatePostText }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              postImages: [updatePostImage],
              postText: updatePostText,
              isPublic: false
            }));
            done();
          });
        });
      });
    });

    it('updatePost with both null image and null text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: null, postImages: null }, (err, resp) => {
            expect(err.message).toEqual(contentAtLeast);
            done();
          });
        });
      });
    });

    xit('updatePost with image and null text', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: null, postImages: [updatePostImage] }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              postImages: [updatePostImage],
              postText: null,
              isPublic: false
            }));            
            done();
          });
        });
      });
    });

    xit('updatePost with text and null image', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { postText: updatePostText, postImages: [null] }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              postImages: [null],
              postText: updatePostText
            }));            
            done();
          });
        });
      });
    });

    xit('updatePost with multiple images', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, {postImages: [postWithImage , postWithImage , postWithImage] }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              postImages: [postWithImage , postWithImage , postWithImage]
            }));            
            done();
          });
        });
      });
    });

    /*it('updatePost for unfollowed user', function (done) {
      Posts.updatePost('612e9ef743556405fd295b8b', { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual('You can only update your own posts.');
        expect(resp).toEqual(undefined);
        done();
      });
    });*/

    /*it('updatePost for followed user', function (done) {
      Posts.updatePost('612e9fc455ddae066e0de3a2', { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual('You can only update your own posts.');
        expect(resp).toEqual(undefined);
        done();
      });
    });*/

    xit('updatePost for createdOn', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { createdOn: createdOnDate, postText: updatePostText }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              createdOn: createdOnDate,
              postImages: [],
              postText: updatePostText,
            }));           
            done();
          });
        });
      });
    });

    xit('updatePost for lastUpdatedBy', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { lastUpdatedBy: lastPostUpdatedBy, postText: updatePostText }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              lastUpdatedBy: lastPostUpdatedBy,
              postImages: [],
              postText: updatePostText,
            }));           
            done();
          });
        });
      });
    });

    it('updatePost for userId', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { userId: validNewUserID, postText: updatePostText, postImages: null }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              postImages: [],
              postText: updatePostText,
              userId: validNewUserID,
            }));         
            done();
          });
        });
      });
    });

    xit('updatePost for displayName', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { displayName: updateDisplayName, postText: updatePostText }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              displayName: updateDisplayName,
              postImages: [],
              postText: updatePostText,
            }));        
            done();
          });
        });
      });
    });

    xit('updatePost for pluginInstance', function (done) {
      buildfire.auth.getCurrentUser((error, currentUser) => {
        Posts.getPosts({userId: currentUser._id}, (err, respo) => {
          Posts.updatePost(respo[1].data, { pluginInstance: { "pluginInstanceId": pluginInsIdNew, "pluginTitle": newPluginTitle }, postText: updatePostText, postImages: null }, (err, resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
              pluginInstance: { "pluginInstanceId": pluginInsIdNew, "pluginInstanceTitle": "communityFeedPlugin" },
              postImages: [],
              postText: updatePostText,
            }));        
            done();
          });
        });
      });
    });
/*
    it('updatePost for _buildfire', function (done) {
      Posts.updatePost('613506917d8532067fdd4095', {
        '_buildfire': {
          "index": {
            "array1": [{
              "string1": "userId_60f469cf784379051298e96ddd"
            }, {
              "string1": "displayName_nadiadd"
            }, {
              "string1": "pluginTitle_communityfeedplugindd"
            }, {
              "string1": "isPublic_1dd"
            }]
          }
        }, postText: 'updatePost with text and null image', postImages: null
      }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          '_buildfire': {
            "index": {
              "array1": [{
                "string1": "userId_60f469cf784379051298e96d"
              }, {
                "string1": "displayName_nadia"
              }, {
                "string1": "pluginTitle_communityfeedplugin"
              }, {
                "string1": "isPublic_0"
              }]
            }
          },
          postImages: [],
          postText: 'updatePost with text and null image',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });
    */
  });

  /******************************************/
  /************** getById ******************/
  /****************************************/
  describe('getById()', function () {
    let noneExistPostID = '612e58199cbbbd0670656df4';
    let postIDError = "Couldn't find post";
    let invalidNewPostId = '56789876';

    it('getById should be defined', function () {
      expect(Posts.getById).toBeDefined('getById functionality not defined');
    });

    xit('getById for current user', function (done) {
      Posts.getById('612e58190dbbbd0670656df4', (err, resp) => {
        expect(err).toEqual(null);
        expect(resp).toEqual(jasmine.objectContaining({
          "id": "612e58190dbbbd0670656df4",
          "userToken": "public",
          "data": {
            "createdOn": "2021-08-31T16:26:01.189Z",
            "lastUpdatedBy": null,
            "userId": authManager.currentUser._id,
            "displayName": "Nadia",
            "postText": "updated-post text sample",
            "postImages": [
              "updated-image test"
            ],
            "pluginInstance": {
              "pluginInstanceId": "1627334094776-047554258642281355",
              "pluginInstanceTitle": "communityFeedPlugin"
            },
            "isPublic": false,
            "_buildfire": {
              "index": {
                "array1": [
                  {
                    "string1": "userId_60f469cf784379051298e96d"
                  },
                  {
                    "string1": "displayName_nadia"
                  },
                  {
                    "string1": "pluginTitle_communityfeedplugin"
                  },
                  {
                    "string1": "isPublic_1"
                  }
                ]
              }
            }
          }
        }));
        done();
      });
    });

    xit('getById for post id does not exist', function (done) {
      Posts.getById(noneExistPostID, (err, resp) => {
        expect(err).toEqual(postIDError);
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById with invalid post id', function (done) {
      Posts.getById(invalidNewPostId, (err, resp) => {
        expect(err.message).toEqual(postIDError);
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById with empty post id', function (done) {
      Posts.getById('', (err, resp) => {
        expect(err.message).toEqual("error");
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById without providing post id', function (done) {
      Posts.getById((err, resp) => {
        expect(err.message).toEqual('Post id does not existt');
        expect(resp).toEqual(undefined);
        done();
      });
    });
/*
    it('getById private post for unfollowed user', function (done) {
      Posts.getById('612e9ef743556405fd295b8b', (err, resp) => {
        expect(err).toEqual('error');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('getById public post for unfollowed user', function (done) {
      Posts.getById('612fc03755ddae066e0df10d', (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({ 
            userId: '604f8dcfbd6aa82ebb15fda2', 
            postText: 'post text sample', 
            postImages: 'image test', 
            pluginInstance: Object({ 
              pluginInstanceId: '1627334094776-047554258642281355', 
              pluginInstanceTitle: 'communityFeedPlugin' }), 
              isPublic: true, 
               }));
        done();
      });
    });

    it('getById by userId', function (done) {
      Posts.getById(userId : currentUser._id, (err, resp) => {
        expect(err).toEqual('jlfjljf');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('getById by displayName', function (done) {
      Posts.getById({ displayName: updateDisplayName}, (err, resp) => {
        expect(err).toEqual('oijojo');
        expect(resp).toEqual(undefined);
        done();
      });
    });
*/
  });

  /******************************************/
  /*********** addPublicPost ***************/
  /****************************************/
  describe('addPublicPost()',function(){
    let contentAtLeastHas = 'Must have atleast post text or post images, post images must be an array of atleast one image url';
    let publicPostText = 'post text test example' ; 
    let publicPostImage = 'image test' ; 
    let longPublicPost = 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat' ;

    it('addPublicPost should be defined',function(){
      expect(Posts.addPublicPost).toBeDefined('addPublicPost functionality not defined');
    });

    it('addPublicPost with empty post image and text', function (done) {
      Posts.addPublicPost('', (err) => {
        expect(err.message).toEqual(contentAtLeastHas);
        done();
      });
    });

    it('addPublicPost with post text and empty image', function (done) {
      Posts.addPublicPost({ postText:  publicPostText}, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postText: publicPostText,
          postImages: []
        }));
        done();
      });
    });

    xit('addPublicPost with post image and empty text', function (done) {
      Posts.addPublicPost({ postImages:  publicPostImage}, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: publicPostImage,
          postText: null
        }));
        done();
      });
    });

    xit('addPublicPost with post image and text', function (done) {
      Posts.addPublicPost({ postImages: publicPostImage, postText: publicPostText }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: publicPostImage,
          postText: publicPostText
        }));
        done();
      });
    });

    xit('addPublicPost with long post text', function (done) {
      Posts.addPublicPost({ postImages: publicPostImage, postText: longPublicPost }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: publicPostImage,
          postText: longPublicPost,
          isPublic: true
        }));
        done();
      });
    });

    xit('addPublicPost with public post image and text', function (done) {
      Posts.addPublicPost({ postImages: publicPostImage, postText: publicPostText }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: publicPostImage,
          postText: publicPostText,
          isPublic: true
        }));
        done();
      });
    });
/*
    it('addPublicPost with private post image and text', function (done) {
      Posts.addPublicPost({ isPublic: false, postImages: 'private image test', postText: 'private post text sample' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'private image test',
          postText: 'private post text sample',
          isPublic: true
        }));
        done();
      });
    });
*/
    xit('addPublicPost with both null image and null text', function (done) {
      Posts.addPublicPost({ postText: null, postImages: [] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: null,
        }));
        done();
      });
    });

    it('addPublicPost with image and null text', function (done) {
      Posts.addPublicPost({ postText: null, postImages: ['Add post with image and null text'] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['Add post with image and null text'],
          postText: null,
          isPublic: true
        }));
        done();
      });
    });

    it('addPublicPost with text and null image', function (done) {
      Posts.addPublicPost({ postText: 'Add post with text and null image', postImages: null }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: 'Add post with text and null image',
          isPublic: true
        }));
        done();
      });
    });

    it('addPublicPost with multiple images', function (done) {
      Posts.addPublicPost({ postImages: ['image1', 'image2', 'image3'] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['image1', 'image2', 'image3'],
          postText: null,
          isPublic: true
        }));
        done();
      });
    }); 
  });

  /******************************************/
  /************* searchPosts ***************/
  /****************************************/

  describe('searchPosts()',function(){
    it('searchPosts should be defined',function(){
      expect(Posts.searchPosts).toBeDefined('searchPosts functionality not defined');
    });

    it('searchPosts for empty text', function (done) {
      Posts.searchPosts({text : '' }, (err, resp) => {
        expect(err).toEqual('Option text cannot be empty');
        expect(resp).toBeUndefined();
        done();
      });
    });

    it('searchPosts for null text', function (done) {
      Posts.searchPosts({text : null }, (err, resp) => {
        expect(err).toEqual('Option text cannot be empty');
        expect(resp).toBeUndefined();
        done();
      });
    });

    it('searchPosts text for current user', function (done) {
      Posts.searchPosts({text : 'updatePost for fixed post' }, (err, resp) => {
        expect(err).toEqual(null);
        let respSize = resp.length;
        for (let step = 0; step < respSize; step++) {
          expect(err[step].data).toEqual(jasmine.objectContaining({
            "postText": "updated-post text sample",
         }));
        }
                /*expect(resp).toEqual(jasmine.objectContaining({
          "id": "613506917d8532067fdd4095",
          "userToken": "public",
          "data": {
            "createdOn": "2021-08-31T16:26:01.189Z",
            "lastUpdatedBy": null,
            "userId": authManager.currentUser._id,
            "displayName": "Nadia",
            "postText": "updated-post text sample",
            "postImages": [
              "updated-image test"
            ],
            "pluginInstance": {
              "pluginInstanceId": "1627334094776-047554258642281355",
              "pluginInstanceTitle": "communityFeedPlugin"
            },
            "isPublic": true,
            "_buildfire": {
              "index": {
                "array1": [
                  {
                    "string1": "userId_60f469cf784379051298e96d"
                  },
                  {
                    "string1": "displayName_nadia"
                  },
                  {
                    "string1": "pluginTitle_communityfeedplugin"
                  },
                  {
                    "string1": "isPublic_1"
                  }
                ]
              }
            }
          }
        }));*/
        done();
      });
    });

    it('searchPosts for a one keyword text', function (done) {
      Posts.searchPosts({text : 'sample' }, (err, resp) => {
        for(let step = 0 ; step<resp.length ;step++){
        expect(resp[step].data.postText).toContain('sample');
        } 
        expect(err).toBeUndefined();
        done();
      });
    });

    it('searchPosts private post for unfollowed user', function (done) {
      Posts.searchPosts({text : 'Hello this is a post :D'}, (err, resp) => {
        for(let step=0 ; step < resp.length ; step++){
        expect(resp[step].data.id).not.toEqual('612e9ef743556405fd295b8b');
        }
        expect(err).toEqual(undefined);
        done();
      });
    });

    it('searchPosts public post for unfollowed user', function (done) {
      Posts.searchPosts({text : 'post text sample'}, (err, resp) => {
        for(let step = 0 ; step <resp.length ; step++){
        expect(resp[step].id).not.toEqual('612fc03755ddae066e0df10d');
        }
        expect(resp.data).toBeUndefined();
        done();
      });
    });

    it('searchPosts for post does not exist', function (done) {
      Posts.searchPosts({text : ')(*&^%$#@!ASDFG60f49004784379051298ea3?><":}{PO'}, (err, resp) => {
        expect(err).toEqual('Sorry, no matching posts were found.');
        console.log(resp);
        expect(resp).toEqual(null);
        done();
      });
    });

    it('searchPosts for special characters', function (done) {
      Posts.searchPosts({ text: '%'}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
        expect(resp[step].data.postText).toContain('%');
        expect(resp[step].id).toEqual('61354486ddca14064e977c9f');
        }
        done();
      });
    });

    it('searchPosts for short text', function (done) {
      Posts.searchPosts({ text: 'on'}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
        expect(resp[step].data.postText).toContain('on');
        }
        done();
      });
    });

    it('searchPosts for capital text', function (done) {
      Posts.searchPosts({ text: 'SAMPLE'}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
        expect(resp[step].data.postText.toLocaleLowerCase()).toContain('SAMPLE'.toLocaleLowerCase());
        }
        done();
      });
    });

  });

  /******************************************/
  /********* getCurrentUserPosts ***********/
  /****************************************/

  describe('getCurrentUserPosts()',function(){
    it('getCurrentUserPosts should be defined',function(){
      expect(Posts.getCurrentUserPosts).toBeDefined('getCurrentUserPosts functionality not defined');
    });

    it('getCurrentUserPosts for current user', function (done) {
      Posts.getCurrentUserPosts({skip:0,limit:2}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step= 1 ; step < resp.length ; step++){
        expect(resp[step].data.userId).toEqual(authManager.currentUser._id);
      };
        done();
      });
    });

    it('getCurrentUserPosts for current user public posts',function(done){
      Posts.getCurrentUserPosts({isPublic : true}, (err,resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
          expect(resp[step].data.isPublic).toEqual(true);
          expect(resp[step].data.userId).toEqual(authManager.currentUser._id);
        }
      });
      done();
    })

    it('getCurrentUserPosts for current user private posts',function(done){
      Posts.getCurrentUserPosts({isPublic : false}, (err,resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
          expect(resp[step].data.isPublic).toEqual(false);
          expect(resp[step].data.userId).toEqual(authManager.currentUser._id);
        }
      });
      done();
    })
//check sorting

  });

  /******************************************/
  /************* deletePost ****************/
  /****************************************/

  describe('deletePost()',function(){
    it('deletePost should be defined',function(){
      expect(Posts.deletePost).toBeDefined('deletePost functionality not defined');
    });

    it('deletePost private post for current user',function(done){
      var firstPost = '1234';
      Posts.getPosts({postText : 'post',userId : authManager.currentUser._id, isPublic:false} , (err,resp)=>{
        firstPost = resp[1].id;
      Posts.deletePost(firstPost , (err , resp)=>{
        expect(err).toEqual('fff');
        expect(resp).toEqual('deleted');      
      });
      done();
      });
      /*deleteSamplePost = 'new';
      Posts.addPost({postText : 'post for deleting purposes',isPublic : false},(err,resp) =>{
        deleteSamplePost = resp.id;
        console.log('delete',deleteSamplePost);
        Posts.deletePost((deleteSamplePost), (errr,r) => {
        expect(errr).toEqual(null);
        expect(r.status).toEqual('deleted');
        Posts.getById(deleteSamplePost,(er,re) => {
          expect(er).toEqual(null);
          expect(re.id).toEqual(deleteSamplePost);
        });
      });
    });*/      
    });

    it('deletePost public post for current user',function(done){
      var firstPost = '1234';
      Posts.getPosts({userId : authManager.currentUser._id, isPublic:true} , (err,resp)=>{
        firstPost = resp[1].id;
      Posts.deletePost(firstPost , (err , resp)=>{
        expect(err).toEqual('fff');
        expect(resp).toEqual('deleted');      
      });
      done();
      });
    });

    it('deletePost post with image only for current user',function(done){
      var firstPost = '1234';
      Posts.getPosts({postText : 'image',userId : authManager.currentUser._id, isPublic:true} , (err,resp)=>{
        firstPost = resp[1].id;
      Posts.deletePost(firstPost , (err , resp)=>{
        expect(err).toEqual(undefined);
        expect(resp).toEqual('deleted');      
      });
      done();
      });
    });

    it('deletePost for unexistent post',function(done){
      Posts.deletePost('123454321234543', (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });

    it('deletePost for empty post id',function(done){
      Posts.deletePost('', (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });

    it('deletePost for null post id',function(done){
      Posts.deletePost(null, (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });

    it('deletePost public post for another user',function(done){
      Posts.deletePost('612fc03755ddae066e0df10d', (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });

    it('deletePost private post for another user',function(done){
      var firstPost = '1234';
      Posts.getPosts({userId : '60f49004784379051298ea37', isPublic:false} , (err,resp)=>{
        firstPost = resp[1].id;
      Posts.deletePost(firstPost , (err , resp)=>{
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toEqual(undefined);      
      });
      done();
      });
    });
//check sorting

  })

});