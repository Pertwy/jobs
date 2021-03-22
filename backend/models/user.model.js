const { string } = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
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
  bio:{
    type: String,
  },

});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User; 
