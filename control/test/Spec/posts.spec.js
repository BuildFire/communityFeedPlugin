describe ('Posts()' , function () {
    

  beforeEach(function(done) {
    setTimeout(function() {
      authManager.enforceLogin();
      done();
    }, 100);
  });

/******************************************/
/*************** AddPost *****************/
/****************************************/
describe('addPost()', function(){
    it('addPost function should be defined' , function(){
        expect(Posts.addPost).toBeDefined('addPost functionality not defined');
    });

    it('Add post with empty post image and text', function(done) {
        Posts.addPost('',(err) => {
          expect(err).toEqual('Post text cannot be empty');
          done();
        }); 
    });

    it('Add post with post text and empty image', function(done) {
        Posts.addPost({postText :'post text test example'},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postText: 'post text test example',
                postImages: [],
                userId: authManager.currentUser._id
              }));
          done();
        }); 
    });

    it('Add post with post image and empty text', function(done) {
        Posts.addPost({postImages :'image test'},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: 'image test',
                postText:null,
                userId: authManager.currentUser._id
              }));
          done();
        }); 
    });

    it('Add post with post image and text', function(done) {
        Posts.addPost({postImages :'image test',postText : 'post text sample'},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: 'image test',
                postText:'post text sample',
                userId: authManager.currentUser._id
              }));
          done();
        }); 
    });

    it('Add post with long post text', function(done) {
        Posts.addPost({postImages :'image test',postText : 'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat'},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: 'image test',
                postText:'Praesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpatPraesent pharetra ipsum sed orci volutpat',
                userId: authManager.currentUser._id,
              }));
          done();
        }); 
    });

    it('Add public post with post image and text', function(done) {
        Posts.addPost({isPublic : true , postImages :'image test',postText : 'post text sample'},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: 'image test',
                postText:'post text sample',
                userId: authManager.currentUser._id,
                isPublic: true
              }));
          done();
        }); 
    });

    it('Add private post with post image and text', function(done) {
        Posts.addPost({isPublic : false , postImages :'private image test',postText : 'private post text sample'},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: 'private image test',
                postText:'private post text sample',
                userId: authManager.currentUser._id,
                isPublic: false
              }));
          done();
        }); 
    });

    xit('Add post with null image and text', function(done) {
        Posts.addPost({postText : null},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: null,
                postText:null,
                userId: authManager.currentUser._id,
                isPublic: false
              }));
          done();
        }); 
    });

    xit('Add post with null image and text', function(done) {
        Posts.addPost({postImages : null},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: 'private image test',
                postText:'post text sample',
                userId: authManager.currentUser._id,
                isPublic: false
              }));
          done();
        }); 
    });

    it('Add post with multiple images', function(done) {
        Posts.addPost({postImages : ['image1','image2','image3']},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining({
                postImages: ['image1','image2','image3'],
                postText:null,
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
describe('getPosts()', function() {

    it('getPosts function should be defined' , function(){
        expect(Posts.getPosts).toBeDefined('getPosts functionality not defined');
    });

    it('Get all posts' , function(done){
        Posts.getPosts({publicPosts : true},(err,resp) => {
            expect(resp.data).toEqual(jasmine.objectContaining([{
                "userId":"60f469cf784379051298e96d",
                 "displayName":"Nadia",
                 "postText":"post text sample",
              }]));
          done();
        });   
        // Posts.getPosts('publicPosts' ,(err,resp) =>{
        //     expect(resp).toEqual(jasmine.objectContaining({
        //         userId : '60f469cf784379051298e96d',
        //     }));
        //     done();
        //});
    });
}); 

});