const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
    title:{type: String, required: true},
    description:{},
    salary:{},
    company:{},
    location:{},
    tags:{},
    industry:{},
    remote:{},
    easyApplyBool:{},
    coverLetterBool:{},
    applyOnCompanySiteBool:{},
    applyOnCompanySiteLink:{},
    tags:{},
    type:{}

},{
    timestamps: true
})

const JobPost = mongoose.model('JobPost', jobPostSchema)

function validateBook(jobPost) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      author: Joi.string().min(5).max(255).required(),
      image: Joi.string().min(5).required()
    };
  
    return Joi.validate(jobPost, schema);
  }
  

exports.validate = validateBook;
exports.JobPost = JobPost;