let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let BusinessContact = require('../models/businessContacts');


//show business contacts
module.exports.displayBusinessContacts = (req, res, next) => {
    //get all contacts from db with sorting
    BusinessContact.find({}).sort('name').exec((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {            
            //redirect to list.ejs with the contact list
            res.render('businessContact/list', 
            {title: 'BusinessContacts', 
            ContactList: contactList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}


//show add business contact page
module.exports.displayAddPage = (req, res, next) => {


    console.log ("add page controller: req.user - " + req.user);
    

    res.render('businessContact/add', {title: 'Add Business Contact',  req: req,
    displayName: req.user ? req.user.displayName : ''})          
}




//process the post request to add business contact
module.exports.processAddPage = (req, res, next) => {
    let newBusinessContact = BusinessContact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    //create the record in db
    BusinessContact.create(newBusinessContact, (err, BusinessContact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('../businessContacts');
        }
    });

}


//display edit page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    console.log ('Trying to display edit page ...2');
    BusinessContact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            //res.render('businessContact/edit', {title: 'Edit Business Contact', BusinessContact: contactToEdit, 
            //displayName: req.user ? req.user.displayName : ''})

            res.render('businessContact/edit', 
            {title: 'Edit Business Contact', 
            businessContact: contactToEdit, 
            displayName: req.user ? req.user.displayName : ''});      

        }
    });
}

//process post request for edit page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = BusinessContact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    BusinessContact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('../../businessContacts');
        }
    });
}



module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the contact list
             res.redirect('../../businessContacts');

        }
    });
}