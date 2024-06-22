const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

module.exports = class User {

    constructor(name, email, password, location, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.location = location;
        this._id = id;
    }

    save() {
        const db = getDb();
        let res;
        if (this._id) {
            res = db.collection('user').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        }
        else {
            res = db.collection('user').insertOne(this)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        return res;
    }

    static findByEmail(useremail) {
        const db = getDb();
        return db.collection('user').find({ email: useremail })
            .next()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
                return err;
            })

    }
}