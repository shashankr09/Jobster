const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    mongoClient.connect('mongodb://0.0.0.0:27017')
        .then((client) => {
            console.log("connected");
            _db = client.db('Jobster');
            callback();
        })
        .catch((err) => {
            console.log(err);
        })
}


const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No DataBase Found';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;



