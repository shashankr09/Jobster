const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/getJobs', jobController.getJobs);

router.post('/createJob', jobController.createJob);

router.get('/editJob/:id', jobController.getEditJob);

router.post('/editJob/:id', jobController.editJob);

router.delete('/deleteJob/:id', jobController.deleteJob);

router.get('/stats', jobController.getStats);


module.exports = router;