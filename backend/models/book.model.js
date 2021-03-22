const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
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

const Book = mongoose.model('Book', bookSchema)

function validateBook(book) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      author: Joi.string().min(5).max(255).required(),
      image: Joi.string().min(5).required()
    };
  
    return Joi.validate(book, schema);
  }
  

exports.validate = validateBook;
exports.Book = Book;
//module.exports = Book