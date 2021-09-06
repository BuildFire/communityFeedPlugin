describe('Posts()', function () {
  /* posts list ids :
  current user fixed post for checing without deleting or updating 613506917d8532067fdd4095
  current user post with special character 61354486ddca14064e977c9f
  current user public post 6136685f7d8532067fdd4e2e
  unfollowed user private post id 612e9ef743556405fd295b8b for userid 6126c0e5fe743405301f11e8
  unfollowed user public post id 612fc03755ddae066e0df10d for userid 604f8dcfbd6aa82ebb15fda2
  followed user post id 612e9fc455ddae066e0de3a2 for userid 60f49004784379051298ea37
  */

  beforeEach(function (done) {
    setTimeout(function () {
      authManager.enforceLogin();
      done();
    }, 100);
  });

  /******************************************/
  /*************** AddPost *****************/
  /****************************************/
  describe('addPost()', function () {
    it('addPost function should be defined', function () {
      expect(Posts.addPost).toBeDefined('addPost functionality not defined');
    });

    it('Add post with empty post image and text', function (done) {
      Posts.addPost('', (err) => {
        expect(err).toEqual('Post cannot be null');
        done();
      });
    });

    it('Add post with post text and empty image', function (done) {
      Posts.addPost({ postText: 'post text test example' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postText: 'post text test example',
          postImages: [],
          userId: authManager.currentUser._id
        }));
        done();
      });
    });

    it('Add post with post image and empty text', function (done) {
      Posts.addPost({ postImages: 'image test' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: null,
          userId: authManager.currentUser._id
        }));
        done();
      });
    });

    it('Add post with post image and text', function (done) {
      Posts.addPost({ postImages: 'image test', postText: 'post text sample' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: 'post text sample',
          userId: authManager.currentUser._id
        }));
        done();
      });
    });

    it('Add post with long post text', function (done) {
      Posts.addPost({ postImages: 'image test', postText: 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('Add public post with post image and text', function (done) {
      Posts.addPost({ isPublic: true, postImages: 'image test', postText: 'post text sample' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: 'post text sample',
          userId: authManager.currentUser._id,
          isPublic: true
        }));
        done();
      });
    });

    it('Add private post with post image and text', function (done) {
      Posts.addPost({ isPublic: false, postImages: 'private image test', postText: 'private post text sample' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'private image test',
          postText: 'private post text sample',
          userId: authManager.currentUser._id,
          isPublic: false
        }));
        done();
      });
    });

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

    it('Add post with image and null text', function (done) {
      Posts.addPost({ postText: null, postImages: ['Add post with image and null text'] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['Add post with image and null text'],
          postText: null,
          userId: authManager.currentUser._id,
          isPublic: false
        }));
        done();
      });
    });

    it('Add post with text and null image', function (done) {
      Posts.addPost({ postText: 'Add post with text and null image', postImages: null }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: 'Add post with text and null image',
          userId: authManager.currentUser._id,
          isPublic: false
        }));
        done();
      });
    });

    it('Add post with multiple images', function (done) {
      Posts.addPost({ postImages: ['image1', 'image2', 'image3'] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['image1', 'image2', 'image3'],
          postText: null,
          userId: authManager.currentUser._id,
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

    xit('getPosts of current user', function (done) {
      Posts.getPosts({userId: authManager.currentUser._id}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step=0;step <(resp.length-1);step++){
        expect(resp[step].data).toEqual(jasmine.objectContaining({
            "userId": authManager.currentUser._id,
            "displayName": authManager.currentUser.displayName,
            "isPublic": true,
        }));
      };
        done();
      });
    });

    xit('getPosts of current user by followered users', function (done) {
      Posts.getPosts({byFollowedUsers : true }, (err, resp) => {
        expect(err).toEqual(null);
        const byFollowedUsersArray = [getUserFollowData];
        console.log('foll',byFollowedUsersArray);
        for(let step=0;step <(resp.length-1);step++){
        expect(resp[step].data).toEqual(jasmine.objectContaining({
            "userId": authManager.currentUser._id,
            "displayName": authManager.currentUser.displayName,
        }));
      };
        done();
      });
    });

  });

  /******************************************/
  /************* updatePost ****************/
  /****************************************/
  describe('updatePost()', function () {

    it('updatePost should be defined', function () {
      expect(Posts.updatePost).toBeDefined('updatePost functionality not defined');
    });

    it('updatePost for current user', function (done) {
      Posts.updatePost('612e58190dbbbd0670656df4', { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({
          postText: 'updated-post text sample',
          postImages: ['updated-image test'],
        }));
        done();
      });
    });

    it('updatePost with null id', function (done) {
      Posts.updatePost(null, { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual('Post ID cannot be null');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('updatePost with invalid post id', function (done) {
      Posts.updatePost('56789876', { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual("Couldn't find post with this ID.");
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('updatePost with post id does not exist', function (done) {
      Posts.updatePost('612e9ef743556405fd295b8Y', { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual("Couldn't find post with this ID.");
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('updatePost without providing post id', function (done) {
      Posts.updatePost({ postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual('Post id does not exist');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('updatePost with empty post image and text', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postText: '', postImages: [] }, (err, resp) => {
        expect(err).toEqual('Post cannot be empty');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('updatePost with post text and empty image', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postText: 'updated-updatePost with post text and empty image', postImages: [] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postText: 'updated-updatePost with post text and empty image',
          postImages: [],
          userId: authManager.currentUser._id
        }));
        done();
      });
    });

    it('updatePost with post image and empty text', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postText: '', postImages: ['update post with post image and empty text'] }, (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({
          postText: null,
          postImages: ['update post with post image and empty text'],
          userId: authManager.currentUser._id
        }));
        done();
      });
    });

    it('updatePost with post image and text', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postImages: ['updatePost with post image and text'], postText: 'update- updatePost with post image and text' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['updatePost with post image and text'],
          postText: 'update- updatePost with post image and text',
          userId: authManager.currentUser._id
        }));
        done();
      });
    });

    it('updatePost with long post text', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postImages: ['image test'], postText: 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['image test'],
          postText: 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    xit('updatePost private post with post image and text', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { isPublic: false, postImages: ['updatePost private post with post image and text'], postText: 'updated-updatePost private post with post image and text' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['updatePost private post with post image and text'],
          postText: 'updated-updatePost private post with post image and text',
          userId: authManager.currentUser._id,
          isPublic: false
        }));
        done();
      });
    });

    xit('updatePost with both null image and null text', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postText: null, postImages: [] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: null,
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('updatePost with image and null text', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postText: null, postImages: ['updatePost with image and null text'] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['updatePost with image and null text'],
          postText: null,
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('updatePost with text and null image', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postText: 'updatePost with text and null image', postImages: null }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: 'updatePost with text and null image',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('updatePost with multiple images', function (done) {
      Posts.updatePost('612e7e420dbbbd0670657105', { postText: null, postImages: ['image1', 'image2', 'image3'] }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: ['image1', 'image2', 'image3'],
          postText: null,
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('updatePost for unfollowed user', function (done) {
      Posts.updatePost('612e9ef743556405fd295b8b', { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual('You can only update your own posts.');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('updatePost for followed user', function (done) {
      Posts.updatePost('612e9fc455ddae066e0de3a2', { postText: "updated-post text sample", postImages: ["updated-image test"] }, (err, resp) => {
        expect(err).toEqual('You can only update your own posts.');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    it('updatePost for createdOn', function (done) {
      Posts.updatePost('613506917d8532067fdd4095', { createdOn: '2021-08-03T21:31:48.476Z', postText: 'updatePost for fixed post' }, (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({
          createdOn: '2021-09-05T18:04:01.486Z',
          postImages: [],
          postText: 'updatePost for fixed post',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    xit('updatePost for lastUpdatedBy', function (done) {
      Posts.updatePost('613506917d8532067fdd4095', { lastUpdatedBy: '8990', postText: 'updatePost for fixed post'}, (err, resp) => {
        expect(err).toEqual(null);
        console.log(resp)
        expect(resp.data).toEqual(jasmine.objectContaining({
          lastUpdatedBy: null,
          postImages: [],
          postText: 'updatePost for fixed post',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('updatePost for userId', function (done) {
      Posts.updatePost('613506917d8532067fdd4095', { userId: '60f49004784379051298ea37', postText: 'updatePost for fixed post', postImages: null }, (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: [],
          postText: 'updatePost for fixed post',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('updatePost for displayName', function (done) {
      Posts.updatePost('613506917d8532067fdd4095', { displayName: 'test name', postText: 'updatePost for fixed post' }, (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({
          displayName: authManager.currentUser.displayName,
          postImages: [],
          postText: 'updatePost for fixed post',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

    it('updatePost for pluginInstance', function (done) {
      Posts.updatePost('613506917d8532067fdd4095', { pluginInstance: { "pluginInstanceId": "1627334094776-047554258642281366", "pluginInstanceTitle": "communityFeedPluginnn" }, postText: 'updatePost for fixed post', postImages: null }, (err, resp) => {
        expect(err).toEqual(null);
        expect(resp.data).toEqual(jasmine.objectContaining({
          pluginInstance: { "pluginInstanceId": "1627334094776-047554258642281355", "pluginInstanceTitle": "communityFeedPlugin" },
          postImages: [],
          postText: 'updatePost for fixed post',
          userId: authManager.currentUser._id,
        }));
        done();
      });
    });

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
  });

  /******************************************/
  /************** getById ******************/
  /****************************************/
  describe('getById()', function () {

    it('getById should be defined', function () {
      expect(Posts.getById).toBeDefined('getById functionality not defined');
    });

    it('getById for current user', function (done) {
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
      Posts.getById('612e58199cbbbd0670656df4', (err, resp) => {
        expect(err).toEqual("Couldn't find post with this ID.");
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById with invalid post id', function (done) {
      Posts.getById('56789876', (err, resp) => {
        expect(err).toEqual("Couldn't find post with this ID.j");
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById with empty post id', function (done) {
      Posts.getById('', (err, resp) => {
        expect(err).toEqual("error");
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById without providing post id', function (done) {
      Posts.getById((err, resp) => {
        expect(err).toEqual('Post id does not existt');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById private post for unfollowed user', function (done) {
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

    xit('getById by userId', function (done) {
      Posts.getById('60f49004784379051298ea37', (err, resp) => {
        expect(err).toEqual('jlfjljf');
        expect(resp).toEqual(undefined);
        done();
      });
    });

    xit('getById by displayName', function (done) {
      Posts.getById({ displayName: 'test name'}, (err, resp) => {
        expect(err).toEqual('oijojo');
        expect(resp).toEqual(undefined);
        done();
      });
    });

  });

  /******************************************/
  /*********** addPublicPost ***************/
  /****************************************/
  describe('addPublicPost()',function(){
    it('addPublicPost should be defined',function(){
      expect(Posts.addPublicPost).toBeDefined('addPublicPost functionality not defined');
    });

    it('addPublicPost with empty post image and text', function (done) {
      Posts.addPublicPost('', (err) => {
        expect(err).toEqual('Post text cannot be empty');
        done();
      });
    });

    it('addPublicPost with post text and empty image', function (done) {
      Posts.addPublicPost({ postText: 'post text test example' }, (err, resp) => {
        console.log('public',resp);
        expect(resp.data).toEqual(jasmine.objectContaining({
          postText: 'post text test example',
          postImages: []
        }));
        done();
      });
    });

    it('addPublicPost with post image and empty text', function (done) {
      Posts.addPublicPost({ postImages: 'image test' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: null
        }));
        done();
      });
    });

    it('addPublicPost with post image and text', function (done) {
      Posts.addPublicPost({ postImages: 'image test', postText: 'post text sample' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: 'post text sample'
        }));
        done();
      });
    });

    it('addPublicPost with long post text', function (done) {
      Posts.addPublicPost({ postImages: 'image test', postText: 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat',
        }));
        done();
      });
    });

    it('addPublicPost with public post image and text', function (done) {
      Posts.addPublicPost({ isPublic: true, postImages: 'image test', postText: 'post text sample' }, (err, resp) => {
        expect(resp.data).toEqual(jasmine.objectContaining({
          postImages: 'image test',
          postText: 'post text sample',
          isPublic: true
        }));
        done();
      });
    });

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

    it('addPublicPost with both null image and null text', function (done) {
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

    xit('searchPosts text for current user', function (done) {
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

    xit('searchPosts for a one keyword text', function (done) {
      Posts.searchPosts({text : 'sample' }, (err, resp) => {
        for(let step = 0 ; step<resp.length ;step++){
        expect(resp[step].data.postText).toContain('sample');
        } 
        expect(err).toBeUndefined();
        done();
      });
    });

    xit('searchPosts private post for unfollowed user', function (done) {
      Posts.searchPosts({text : 'Hello this is a post :D'}, (err, resp) => {
        for(let step=0 ; step < resp.length ; step++){
        expect(resp[step].data.id).not.toEqual('612e9ef743556405fd295b8b');
        }
        expect(err).toEqual(undefined);
        done();
      });
    });

    xit('searchPosts public post for unfollowed user', function (done) {
      Posts.searchPosts({text : 'post text sample'}, (err, resp) => {
        for(let step = 0 ; step <resp.length ; step++){
        expect(resp[step].id).not.toEqual('612fc03755ddae066e0df10d');
        }
        expect(resp.data).toBeUndefined();
        done();
      });
    });

    xit('searchPosts for post does not exist', function (done) {
      Posts.searchPosts({text : ')(*&^%$#@!ASDFG60f49004784379051298ea3?><":}{PO'}, (err, resp) => {
        expect(err).toEqual('Sorry, no matching posts were found.');
        expect(resp).toEqual(null);
        done();
      });
    });

    xit('searchPosts for special characters', function (done) {
      Posts.searchPosts({ text: '%'}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
        expect(resp[step].data.postText).toContain('%');
        expect(resp[step].id).toEqual('61354486ddca14064e977c9f');
        }
        done();
      });
    });

    xit('searchPosts for short text', function (done) {
      Posts.searchPosts({ text: 'on'}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
        expect(resp[step].data.postText).toContain('on');
        }
        done();
      });
    });

    xit('searchPosts for capital text', function (done) {
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
      Posts.getCurrentUserPosts({ userId: authManager.currentUser._id}, (err, resp) => {
        expect(err).toEqual(null);
        for(let step= 1 ; step < resp.length ; step++){
        expect(resp[step].data.userId).toEqual(authManager.currentUser._id);
      };
        done();
      });
    });

    xit('getCurrentUserPosts for current user public posts',function(done){
      Posts.getCurrentUserPosts({isPublic : true}, (err,resp) => {
        expect(err).toEqual(null);
        for(let step = 0 ; step < resp.length ; step++){
          expect(resp[step].data.isPublic).toEqual(true);
          expect(resp[step].data.userId).toEqual(authManager.currentUser._id);
        }
      });
      done();
    })

    xit('getCurrentUserPosts for current user private posts',function(done){
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

    xit('deletePost private post for current user',function(done){
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

    xit('deletePost public post for current user',function(done){
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

    xit('deletePost post with image only for current user',function(done){
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

    xit('deletePost for unexistent post',function(done){
      Posts.deletePost('123454321234543', (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });

    xit('deletePost for empty post id',function(done){
      Posts.deletePost('', (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });

    xit('deletePost for null post id',function(done){
      Posts.deletePost(null, (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });

    xit('deletePost public post for another user',function(done){
      Posts.deletePost('612fc03755ddae066e0df10d', (err,resp) => {
        expect(err).toEqual('You can only delete your own posts');
        expect(resp).toBeUndefined();
        done();
      });
    });
    
    xit('deletePost private post for another user',function(done){
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