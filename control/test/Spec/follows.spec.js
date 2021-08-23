beforeEach(function(done) {
    setTimeout(function() {
  
      // do some stuff
        authManager.enforceLogin();
      done();
  
    }, 100);
  });
  
  
it('Follow user with wrong ID', function(done) {
    Follows.followUser("xxx",(err) => {
      expect(err).toEqual("User does not exist");
      done();
    });
    
});
it('Follow user with random ID', function(done) {
    Follows.followUser("oaisdnaksjcndaskjdn",(err) => {
      expect(err).toEqual("User does not exist");
      done();
    });
    
});
it('Follow user with correct ID', function(done) {
    Follows.followUser("6106b9dedcd13351aefb093a",(err , r) => {
      expect(err).toEqual(null);
      expect(r).toBeDefined();
      done();
    });
    
});
  
it('Follow user with no ID', function(done) {
    Follows.followUser(null,(err) => {
      expect(err).toEqual("User ID cannot be null");
      done();
    });
    
});
  
  