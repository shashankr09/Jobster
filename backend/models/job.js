const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

module.exports = class Job {

    constructor(companyName, position, location, status, jobType, jobId, userId) {
        this.companyName = companyName;
        this.position = position;
        this.location = location;
        this.status = status; //[applied,pending,completed]
        this.jobType = jobType; //[remote,hybrid,office]
        this._id = jobId;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let res;
        console.log(this)
        if (this._id) {
            res = db.collection('job').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        }
        else {
            res = db.collection('job').insertOne(this)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        return res;
    }

    static fetchAllJobs(search, status, jobType, id) {
        const db = getDb();
        let obj;
        if (search.length === 0) {
            obj = {
                status: status,
                jobType: jobType,
                userId: id
            }
        }
        else {
            obj = {
                companyName: { '$regex': `${search}`, '$options': 'i' },
                status: status,
                jobType: jobType,
                userId: id
            }
            console.log(obj)
        }
        return db.collection('job').find(obj)
            .toArray()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(res);
            })
    }

    static fetchJobById(id) {
        const db = getDb();
        return db.collection('job').find({ _id: new mongodb.ObjectId(id) })
            .next()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    static deleteJobById(id) {
        const db = getDb();
        console.log(id)
        return db.collection('job').deleteOne({ _id: new mongodb.ObjectId(id) })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    static getStats(id) {
        const db = getDb();
        return db.collection('job').aggregate([
            {
                $match: { userId: new mongodb.ObjectId(id) }
            },

            {
                $group: {
                    _id: "$status",
                    totalCount: {
                        $sum: 1
                    }
                }
            }])
            .toArray()
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
            })
    }


}