const router = require("express").Router();
let {User} = require("../models/user.model")
let {JobPost} = require("../models/jobPost.model")
const _ = require("lodash")
const config = require("config")
const express = require('express');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

//Add user
router.post('/add', async (req, res) => {
 
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered")

    let newUser = new User(_.pick(req.body, ["email", "givenName", "surname", "password"]));
    
    let salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    let token = newUser.generateAuthToken();
    
    await newUser.save()
        .then(() => res.cookie("token", token, {httpOnly: true}).send(_.pick(newUser, ["_id", "email", "name"])))
        .catch(err => res.status(400).json('Error: ' + err));
  });


//Return user data with fields populated
router.get('/', auth, async (req, res) => {


    let user = await User.findById(req.user._id)
        .populate("appliedTo")
        .populate("savedJobs");

    res.send(user);
});


//Find all test users - For drop down
router.get("/all", async (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})

//Get Test user info by id
router.get("/:_id", async (req, res) => {
    User.findById(req.params._id)
        .populate("books")
        
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})

//Save a job
router.post('/save', auth, async (req, res) => {

    let user = await User.findById(req.user._id)

    user.savedJobs.push(req.body.job)

    await user.save()
        .then(() => res.json('Job Saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Save a job
router.post('/apply', auth, async (req, res) => {

    let user = await User.findById(req.user._id)

    user.appliedTo.push(req.body.job)

    await user.save()
        .then(() => res.json('Applied to this job'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;