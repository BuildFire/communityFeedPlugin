class UsersDeletionStateAccess {
    static get TAG() { return "deletedUsersLastSync"; }

    static get() {
        return new Promise((resolve, reject) => {
            buildfire.publicData.get(UsersDeletionStateAccess.TAG, (err, result) => {
                if (err) return reject(err);
                if (result.data && Object.keys(result.data).length) resolve(new UsersDeletionState(result.data));
                else resolve(new UsersDeletionState());
            });
        });
    }

    static save(userId, data) {
        if (!data.createdBy) {
            data.createdBy = userId;
            data.createdOn = new Date();
        } else if (data.lastUpdatedBy && data.lastUpdatedOn) {
            data.lastUpdatedBy = userId;
            data.lastUpdatedOn = new Date();
        }
        return new Promise((resolve, reject) => {
            buildfire.publicData.save(data, UsersDeletionStateAccess.TAG, (err, result) => {
                if (err) return reject(err);
                if (result) resolve(new UsersDeletionState(result.data));
            });
        });
    }
}