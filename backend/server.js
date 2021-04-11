
const express = require('express')
const cors = require('cors')
const config = require("config")
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config() 
//require('../backend/startup/prod')(app)

const app = express()
const port = process.env.PORT || 5000


if (!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}

app.use(cors({ origin: true, credentials: true}));
app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.MONGO_URI || process.env.ATLAS_URI , {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

if (process.env.NODE_ENV === "production"){

    app.use(express.static("build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "/build", "index.html"))
    })
}


const jobpostsRouter = require('./routes/jobPosts')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

app.use('/jobPosts', jobpostsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})