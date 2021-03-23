const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String},
    salary:{type: Number},
    company:{type: String},
    location:{type: String},
    tags:[{type: String}],
    industry:{type: String},
    remote:{type: String},
    easyApplyBool:{type: Boolean},
    coverLetterBool:{type: Boolean},
    applyOnCompanySiteBool:{type: Boolean},
    applyOnCompanySiteLink:{type: String},
    type:{type: String}

},{
    timestamps: true
})

const JobPost = mongoose.model('JobPost', jobPostSchema)

// function validateBook(jobPost) {
//     const schema = {
//       title: Joi.string().min(5).max(50).required(),
//       author: Joi.string().min(5).max(255).required(),
//       image: Joi.string().min(5).required()
//     };
  
//     return Joi.validate(jobPost, schema);
//   }
  

//exports.validate = validateBook;
exports.JobPost = JobPost;