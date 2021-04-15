const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const router = require("express").Router();
const {JobPost} = require("../models/jobPost.model")
const _ = require("lodash")
const mongoose = require("mongoose")
const Fawn = require("fawn");
const { truncate } = require("lodash");

Fawn.init(mongoose)


router.route("/").get((req, res) => {
    JobPost.find()
        .then(jobPosts => 
            res.json(jobPosts))
            console.log(res)
        .catch(err => res.status(400).json("Error " + err))
})

router.route("/:_id").get((req, res) => {
    JobPost.findById(req.params._id)
        .then(jobPost => res.json(jobPost))
        .catch(err => res.status(400).json("Error " + err))
})


router.post('/add', async (req, res) => {

    let newJobPost = new JobPost(_.pick(req.body, ["title", "description", "salary", "company", "location", "tags", "industry", "remote", "easyApplyBool", "coverLetterBool", "applyOnCompanySiteBool", "applyOnCompanySiteLink", "type" ]))
    newJobPost = await newJobPost.save();

    res.send(newJobPost);
});




module.exports = router;