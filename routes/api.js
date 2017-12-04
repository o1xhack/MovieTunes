var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs411');

var db = mongoose.connection;
var Schema = mongoose.Schema;
var personSchema = new Schema ({
    username:   String,
    music_keyword:   String,
    movie:  String
});

var people = mongoose.model('people', personSchema);

// POST Create a new user
router.post('/db', function(req, res, next) {
    aPerson = new people(
        req.body
    );
    aPerson.save(function(err) {
        if (err) {res.send(err);}
        //send back the new person
        else {res.send (aPerson)}
    })
});

//GET Fetch all users
router.get('/db', function (req, res, next) {
    people.find({}, function (err, results) {
        res.json(results);
    })

});

//GET Fetch single user, match /users/db/Frank
router.get('/db/:_id', function (req, res, next) {
    people.find({_id: req.param('_id')}, function (err, results) {
        res.json(results);
    });
});



//PUT Update the specified user's name
router.put('/db/:_id', function (req, res, next) {
    people.findByIdAndUpdate(req.params._id, req.body, {'upsert': 'true'}, function (err, result) {
        if (err) {res.json({message: 'Error updating'});}
        else {console.log('updated'); res.json({message: 'success'})};
    })

});


//DELETE Delete the specified user
router.delete('/db/:_id', function (req, res, next) {
    people.findByIdAndRemove(req.params._id, function (err, result) {
        if(err) {res.json({message: 'Error deleting'});}
        else {res.json({message: 'success'});}
    })
});



module.exports = router;
