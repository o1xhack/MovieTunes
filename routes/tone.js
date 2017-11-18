var express = require('express');
var router = express.Router();

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var userName = require('../config/tone').username;
var passWord = require('../config/tone').password;

var tone_analyzer = new ToneAnalyzerV3({
    username: userName,
    password: passWord,
    version_date: '2017-05-26'
});

router.get('/', function(req, res, next) {
    res.send('tone');
});


router.get('/:name', function(req, res, next) {
    var searchkey = req.params.name;
    tone_analyzer.tone(searchkey)
        .then(function (error, response) {
            res.json(response);
        }, function(err) {
            console.error(err);
        });
    //console.log(JSON.stringify(response, null, 2));


});


/*
var params = {
  // Get the text from the JSON file.
  text: require('tone.json').text,
  tones: 'emotion'
};

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);




router.get('/:name', function(req, res, next){
    var searchkey = req.params.name;
    spotifyApi.searchPlaylists(searchkey)
        .then(function(data) {
            res.json(data.body.playlists);
        }, function(err) {
            console.error(err);
        });
});

*/


module.exports = router;