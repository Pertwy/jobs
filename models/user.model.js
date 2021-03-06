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
  summary:{type: String},
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
  }],
  
  location:{type: String},
  headline:{type: String},
  phoneNumber:{type: Number},

  eligibleUK:{type: String, default:""},
  highestLevelOfDegree:{type: String},
  industry:[{type: String}],

  workExperience:[{
    jobTitle:{type: String},
    company:{type:String},
    location:{type:String},
    startDate:{},
    endDate:{},
    description:{type:String},
    switch: {
      type: Boolean,
      default:false
    },
    }],

  militaryService:[{
    country:{type:String},
    unit:{type: String},
    rank:{type:String},
    startDate:{},
    endDate:{},
    description:{type:String},
    comendations:{type:String},
    switch: {
      type: Boolean,
      default:false
    },
    }],

  skills:[{
    title: {type:String}, 
    proficiency:{type:String}
  }],

  links:[{type:String}],

  additionalInformation:{type: String},

  languages:[{
    title: {type:String}, 
    proficiency:{type:String}
  }],

  education:[{
    country:{type:String},
    levelOfEducation:{type: String},
    fieldOfStudy:{type:String},
    collegeOrUniversity:{type:String},
    startDate:{},
    endDate:{},
    switch: {
      type: Boolean,
      default:false
    },
    }],

});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User; 
