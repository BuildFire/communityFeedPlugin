class UsersDeletionState {
    constructor(data = {}) {
        this.isActive = typeof data.isActive === "boolean" ? data.isActive : true;
        this.createdOn = data.createdOn || new Date();
        this.createdBy = data.createdBy || null;
        this.lastUpdatedOn = data.lastUpdatedOn || null;
        this.lastUpdatedBy = data.lastUpdatedBy || null;
        this.deletedOn = data.deletedOn || null;
        this.deletedBy = data.deletedBy || null;

        this.deletedUsersLastSync = data.deletedUsersLastSync || null;
    }
}