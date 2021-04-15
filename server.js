
const express = require('express')
const cors = require('cors')
const config = require("config")
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require("path")
require('dotenv').config() 
//require('../backend/startup/prod')(app)
console.log('working')

const app = express()
const port = process.env.PORT || 5000
app.use(express.static(path.join(__dirname, "/public")));

if (!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors({ origin: true, credentials: true}));
app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.MONGO_URI || process.env.ATLAS_URI , {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    console.log('working')
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) // relative path
    })
  }


const jobpostsRouter = require('./routes/jobPosts')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
app.use('/api/jobPosts', jobpostsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)


app.listen(port, () => {
  console.log('working')
    console.log(`Server is running on port: ${port}`)
})
