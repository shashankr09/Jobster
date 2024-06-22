const User = require("../models/user");
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;

exports.postRegisterUser = (req, res, next) => {
    const { email, password } = req.body;
    const user = new User(null, email, password, null, null);
    user.save()
        .then(() => {
            return res.status(200).json({
                success: 'success'
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postLoginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findByEmail(email)
        .then((user) => {
            let result;
            if (user) {
                if (user.password === password) {
                    const token = jwt.sign({
                        email: email
                    }, 'abcd')
                    result = res.status(200).json({
                        email: email,
                        "token": token,
                        success: 'success'
                    })
                }
                else {
                    result = res.status(400).json({
                        'errorMessage': 'Password is incorrect'
                    })
                }

            }
            else {
                result = res.status(400).json({
                    'errorMessage': 'Invalid User. Please Register'
                })
            }

            return result;
        })
        .catch((err) => {
            console.log(err);

        })
}

exports.postSaveProfile = (req, res, next) => {
    const { name, email, location } = req.body;
    User.findByEmail(email).then((response) => {
        const id = response._id;
        const user = new User(name, email, response.password, location, new ObjectId(id));
        user.save()
            .then(() => {
                return res.status(200).json({
                    success: 'success'
                })
            })
            .catch(err => {
                console.log(err);
            })


    })
}