
//The dropdown, user select, menus are going to stay from now as they work extremely well for testing 
//When this is complete. Auth middleware needs to be added to most of these funstions


const router = require("express").Router();
let {Testuser} = require("../models/testuser.model")
let {Book} = require("../models/book.model")
const _ = require("lodash")
const config = require("config")
const express = require('express');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

//Add user
router.post('/add', async (req, res) => {
 
    let user = await Testuser.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered")

    let newUser = new Testuser(_.pick(req.body, ["email", "name", "password"]));
    
    let salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    let token = newUser.generateAuthToken();
    
    await newUser.save()
        .then(() => res.cookie("token", token, {httpOnly: true}).send(_.pick(newUser, ["_id", "email", "name"])))
        .catch(err => res.status(400).json('Error: ' + err));
  });


//Return user data with fields populated
router.post('/', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.email})
        .populate("books")
        .populate("favorites")
        .populate("readList")
        .populate({
            path: 'following',
            populate: { path: 'books' }
          });; 

    // console.log(user.following)

    res.send(user);

});


//Find all test users - For drop down
router.get("/all", async (req, res) => {
    Testuser.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})

//Get Test user info by id
router.get("/:_id", async (req, res) => {
    Testuser.findById(req.params._id)
        .populate("books")
        .populate("favorites")
        .populate("readList")
        .populate("lists") 
        .populate("following")
        
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})

//Find a users lists
router.post('/grablists', async (req, res) => {
    const user = await Testuser.findOne({email: req.body.email})
        .populate("lists") //This is the field name
        .select("books");
    res.send(user);
//{email:req.body.user}
});





//Add book to favorites///////////////////////////////////////////////////////////////////////////////////
router.put('/addFavorite', auth, async (req, res) => {
    
    //console.log(req.user)

    let user = await Testuser.findOne({email: req.user.email})

    //let user = await Testuser.findOne({email: req.body.email})
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
    
    if(book) {
        user.favorites.push(book._id)
        book.numberOfTimesFavorited += 1
        await user.save()
        await book.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
        newBook = await newBook.save();
        
        user.favorites.push(newBook._id)
    
        await user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});


//Add book to bookshelf
router.put('/addBookshelf', async (req, res) => {
    
    let user = await Testuser.findOne({email: req.body.email})
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
    
    if(book) {
        user.bookshelf.push(book._id)
        book.bookshelf.push(user._id)
        await user.save()
        await book.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
        newBook = await newBook.save();
        
        user.bookshelf.push(newBook._id)
    
        await user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

//Add a book to ReadList
router.put('/addReadList', async (req, res) => {
    let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
    newBook = await newBook.save();
    
    let user = await Testuser.findOne({email: req.body.email})
    user.readList.push(newBook._id)

    await user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Add book to books read
router.put('/addBookToUser', async (req, res) => {
    //console.log(req.body)
    
    let user = await Testuser.findOne({email: req.body.email})
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
    
    if(book) {
        user.books.push(book._id)
        book.numberOfTimesRead += 1
        await user.save()
        await book.save()
            .then(() => res.json('Book updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
        newBook.numberOfTimesRead += 1
        newBook = await newBook.save();
        
        user.books.push(newBook._id)
        await user.save()
            .then(() => res.json('Book! updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});


//Follow another user
router.post('/follow', async (req, res) => {
    let follow = await Testuser.findOne({email: req.body.follow})
    
    let user = await Testuser.findOne({email: req.body.currentUser})
    user.following.push({_id:follow._id, name:follow.name})

    await user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//REmove favorite book from user
router.post('/removefavorite', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.currentUser})

    index = user.favorites.indexOf(req.body.book)
    user.favorites.splice(index, 1)

    await user.save()
        .then(() => res.json('fave deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove book from Read
router.post('/removebook', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.currentUser})

    index = user.books.indexOf(req.body.book)
    user.books.splice(index, 1)

    await user.save()
        .then(() => res.json('fave deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove book from readList 
router.post('/removereadlist', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.currentUser})

    index = user.readList.indexOf(req.body.book)
    user.readList.splice(index, 1)

    await user.save()
        .then(() => res.json('fave deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Delete user by ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.put('/createBookAndAddToUser', auth, async (req, res) => {
    let user = await User.findById(req.user._id)
    user.books.push(req.body.book)

    user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));        
});


//Add a review. Includes rating
router.post('/addreview', async (req, res) => {


    //Find user
    let user = await Testuser.findOne({email: req.body.email})
    
    //Find book
    let CurrentBook =  await Book.findById(req.body._id)
    
    //New Review
    const book = req.body._id;
    const author = user._id;
    const review = req.body.review;
    const rating = req.body.rating;

    const newReview = new Review({
        book,
        author,
        review,
        rating
    });
    await newReview.save()

    
    //Push review ID to user and book
    CurrentBook.reviews.push(newReview._id)
    user.reviews.push(newReview._id)

    if(rating === "1"){
        CurrentBook.rating.one.push(author)
    }
    if(rating === "2"){
        CurrentBook.rating.two.push(author)
    }
    if(rating === "3"){
        CurrentBook.rating.three.push(author)
    }
    if(rating === "4"){
        CurrentBook.rating.four.push(author)
    }
    if(rating === "5"){
        CurrentBook.rating.five.push(author)
    }
    if(rating === "6"){
        CurrentBook.rating.six.push(author)
    }
    if(rating === "7"){
        CurrentBook.rating.seven.push(author)
    }
    if(rating === "8"){
        CurrentBook.rating.eight.push(author)
    }
    if(rating === "9"){
        CurrentBook.rating.nine.push(author)
    }
    if(rating === "10"){
        CurrentBook.rating.ten.push(author)
    }



    await CurrentBook.save()
    await user.save()
        .then(() => res.json('review added'))
        .catch(err => res.status(400).json('Error: ' + err));

});



  module.exports = router;