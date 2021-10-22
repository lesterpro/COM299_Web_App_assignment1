let mongoose = require('mongoose');

// create a model class
/*
let bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    collection: "books"
});

module.exports = mongoose.model('Book', bookModel);
*/

// create a model class
let businessContactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String,
},
{
    collection: "businessContacts"
});

module.exports = mongoose.model('BusinessContact', businessContactModel);
