const router = require("express").Router();
let {User} = require("../models/user.model")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const config = require("config")

router.post('/', async (req, res) => {
 
    let user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("invalid email or password")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("invalid email or password")

    //const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'))

    const token = user.generateAuthToken();
    try{
        res
        .cookie("token", token, {
        httpOnly: true
        })
        .send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expired: new Date(0)
    }).send();
})

module.exports = router;