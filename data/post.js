class Post {
    constructor(data = {}) {
      // DONT DELETE THESE DATA OBJECTS 
      this.isActive = data.isActive || true; 
      this.createdOn = data.createdOn || new Date(); 
      this.createdBy = data.createdBy || null; 
      this.lastUpdatedOn = data.lastUpdatedOn || null; 
      this.lastUpdatedBy = data.lastUpdatedBy || null; 
      this.deletedOn = data.deletedOn || null; 
      this.deletedBy = data.deletedBy || null; 
      this.userId = data.userId || null;
      this.username = data.username || null;
      this.postText = data.postText || null;      
      this.postImages  = data.postImages  || [];          
      this.pluginName  = data.pluginName  || "CommunityFeedPlugin";      
      this.pluginInstanceId  = data.pluginInstanceId  || null;      
    }
  }
  