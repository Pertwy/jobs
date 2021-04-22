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


router.post('/getuserdetails', async (req, res) => {
    let user = await User.findOne({email: req.body.email})
    res.send(user);
});



router.post('/addskill', async (req, res) => {

    let user = await User.findOne({email: req.body.email})
    
    user.skills.push({"title": req.body.title, "proficiency":req.body.proficiency})

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/deleteskill', async (req, res) => {

    let user = await User.findOne({email: req.body.email})

    const skill = user.skills.filter(skill => skill.title !== req.body.title);
    user.skills = skill

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});





router.post('/addlanguage', async (req, res) => {

    let user = await User.findOne({email: req.body.email})
    
    user.languages.push({"title": req.body.title, "proficiency":req.body.proficiency})

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/deletelanguage', async (req, res) => {

    let user = await User.findOne({email: req.body.email})

    const lang = user.languages.filter(lang => lang.title !== req.body.title);
    user.languages = lang

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});





router.post('/addlink', async (req, res) => {

    let user = await User.findOne({email: req.body.email})
    
    user.links.push(req.body.link)

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/deletelink', async (req, res) => {
    
    let user = await User.findOne({email: req.body.email})

    const link = user.links.filter(link => link !== req.body.title);
    user.links = link

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Education //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addeducation', async (req, res) => {

    console.log(req.body.education)

    let user = await User.findOne({email: req.body.email})

    user.education.push(req.body.education)

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/deleteeducation', async (req, res) => {

    console.log(req.body)

    // let user = await User.findOne({email: req.body.email})

    // const education = user.education.filter(education => education.jobTitle !== req.body.education);
    // user.education = education

    // await user.save()
    //     .then(() => res.send(user))
    //     .catch(err => res.status(400).json('Error: ' + err));
});


//Work Experience /////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addworkexperience', async (req, res) => {

    console.log(req.body.workExperience)

    let user = await User.findOne({email: req.body.email})

    user.workExperience.push(req.body.workExperience)

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/deleteworkexperience', async (req, res) => {

    let user = await User.findOne({email: req.body.email})

    const workExperience = user.workExperience.filter(workExperience => workExperience.jobTitle !== req.body.workExperience);
    user.workExperience = workExperience

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});





//Military Service ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addmilitaryservice', async (req, res) => {

    console.log(req.body.militaryService)

    let user = await User.findOne({email: req.body.email})

    user.militaryService.push(req.body.militaryService)

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/deletemilitaryservice', async (req, res) => {

    let user = await User.findOne({email: req.body.email})

    const militaryService = user.militaryService.filter(militaryService => militaryService.jobTitle !== req.body.militaryService);
    user.militaryService = militaryService

    await user.save()
        .then(() => res.send(user))
        .catch(err => res.status(400).json('Error: ' + err));
});





//Basic Info //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/updatebasicinfo', async (req, res) => {
    
    console.log(req.body)
    
    let user = await User.findOne({email: req.body.emailtest})
    
    console.log(user)

    user.givenName = req.body.givenName
    user.surname = req.body.surname
    user.location = req.body.location
    user.headline = req.body.headline
    // user.email = req.body.email
    user.phoneNumber = req.body.phoneNumber.toString()

    await user.save()
        .then(() => res.send(user))
        // .catch(err => res.status(400).json('Error: ' + err));
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


//Apply for a job
router.post('/apply', auth, async (req, res) => {

    let user = await User.findById(req.user._id)

    user.appliedTo.push(req.body.job)

    await user.save()
        .then(() => res.json('Applied to this job'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;