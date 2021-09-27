class Post {
    constructor(data = {}) {
      this.createdOn = data.createdOn || new Date(); 
      this.createdBy = data.createdBy || "publicPost"; 
      this.lastUpdatedOn = data.lastUpdatedOn; 
      this.lastUpdatedBy = data.lastUpdatedBy || null; 
      this.userId = data.userId || null;
      this.displayName = data.displayName || null;
      this.postText = data.postText || null;      
      this.postImages  = data.postImages  || [];          
      this.pluginInstance  = data.pluginInstance || {};     
      this.isPublic = data.isPublic || false;
      this._buildfire = data._buildfire || {};
    }
}