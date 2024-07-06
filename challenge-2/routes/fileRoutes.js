const express = require('express');
const router = express.Router();

router.route('/').get((req,res) => {
    res.status(200).json("files succeffully retrieved");
});

router.route('/:id').get((req,res) => {
    res.status(200).json(`files ${req.params.id} succeffully retrieved`);
});

router.route('/').post((req,res) => {
    res.status(200).json("files succeffully added");
});

router.route('/:id').delete((req,res) => {
    res.status(200).json(`files ${req.params.id} succeffully deleted`);
});

module.exports = router;