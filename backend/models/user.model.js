const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  givenName: {
    type: String,
    required: true,
    maxlength: 50
  },
  surname: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  photo:{
    type: String
  },
  CV:{
    type: String
  },
  appliedTo:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost" //This is the Schema name
    }],
  savedJobs:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost" //This is the Schema name
  }]

});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User; 
