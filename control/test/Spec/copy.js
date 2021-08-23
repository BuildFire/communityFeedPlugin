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
  
  it('Follow user with no ID', function(done) {
    Follows.followUser(null,(err) => {
      expect(err).toEqual("User does not exist");
      done();
    });
    
  });
  
  