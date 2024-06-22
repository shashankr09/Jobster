const Job = require('../models/job');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getJobs = (req, res, next) => {
    const { search, status, jobType } = req.query; // search - company
    User.findByEmail(req.userEmail).then((user)=>{
        const id = user._id;
        Job.fetchAllJobs(search, status, jobType,id)
        .then((jobs) => {
            return res.status(200).json({
                response: jobs
            })
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
   
}

exports.createJob = (req, res, next) => {
    const { companyName, position, location, status, jobType } = req.body;
    User.findByEmail(req.userEmail)
        .then((user) => {
            const id = user._id;
            const job = new Job(companyName, position, location, status, jobType, null, id);
            job.save()
                .then(() => {
                    return res.status(200).json({
                        success: 'success'
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })


}

exports.editJob = (req, res, next) => {
    const jobId = req.params.id;
    const obj = Job.fetchJobById(jobId);

    const companyName = req.body.companyName ?? obj.companyName;
    const position = req.body.position ?? obj.position;
    const location = req.body.location ?? obj.location;
    const status = req.body.status ?? obj.status;
    const jobType = req.body.jobType ?? obj.jobType;

    User.findByEmail(req.userEmail)
        .then((user) => {
            const job = new Job(companyName, position, location, status, jobType, new ObjectId(jobId), user._id)
            job.save()
                .then(() => {
                    return res.status(200).json({
                        success: "success"
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
}

exports.deleteJob = (req, res, next) => {
    const jobId = req.params.id;
    Job.deleteJobById(jobId)
        .then(() => {
            return res.status(200).json({
                success: 'Deleted Successfully'
            })
        })
        .catch((err) => {

        })
}

exports.getEditJob = (req, res, next) => {
    const jobId = req.params.id;
    Job.fetchJobById(jobId)
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((err) => {

        })
}

exports.getStats = (req, res, next) => {
    User.findByEmail(req.userEmail).then((user)=>{
        const id = user._id;
        Job.getStats(id)
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((err) => {

        })
    })
    .catch((err)=>{

    })
   

}