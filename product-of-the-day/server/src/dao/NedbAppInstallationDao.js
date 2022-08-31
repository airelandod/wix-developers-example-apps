const { AppInstallationsDao } = require("./AppInstallationsDao");
const Datastore = require('nedb')

class NedbAppInstallationsDao extends AppInstallationsDao {
    constructor() {
        super();
        this.filename = process.platform === "win32"?'c:\windows\temp\app_install.localdb':'/tmp/app_install.localdb'
        this.store = this.initStore()
        this.store.persistence.setAutocompactionInterval( 5000 /*ms*/ )
    }

    initStore() {
        return new Datastore({ filename: this.filename, autoload: true });
    }

    async save(instanceId, conversationId, date, couponData) {
        this.store.update(
            {"_id": instanceId }, {"_id": instanceId, "instanceId": instanceId, data}, {upsert: true}
        )
    }

    async getBy(instanceId) {
        return new Promise((resolve, reject) => {
            this.store.findOne({instanceId : instanceId}, function (err, doc) {
                if(err){
                    reject(err);
                }
                resolve(doc);
            });
        });
    }
}

module.exports = {
    NedbAppInstallationsDao
}
