const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const router = require("express").Router();
const {JobPost, validate} = require("../models/jobPost.model")
const _ = require("lodash")
const mongoose = require("mongoose")
const Fawn = require("fawn");
const { truncate } = require("lodash");

Fawn.init(mongoose)

router.route("/").get((req, res) => {
    JobPost.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json("Error " + err))
})

router.route("/:_id").get((req, res) => {
    JobPost.findById(req.params._id)
        // .populate("reviews")
        .populate({
            path: 'reviews',
            populate: { path: 'author' }
        })
        .then(book => res.json(book))
        .catch(err => res.status(400).json("Error " + err))
})


router.route("/admin").get((req, res) => {
    JobPost.find({isAdmin:true})
        .then(books => console.log(books))
        .catch(err => res.status(400).json("Error " + err))
})


router.post('/add', async (req, res) => {

    let newBook = new JobPost(_.pick(req.body, ["title", "author", "image"]))
    newBook = await newBook.save();

    res.send(newBook._id);
});


module.exports = router;