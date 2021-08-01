class Follow {
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
      this.followedUsers = data.followedUsers || [];
      this.followedPlugins = data.followedPlugins || [];
    }
  }
  