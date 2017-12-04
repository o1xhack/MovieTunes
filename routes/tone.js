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
    var searchkey = {
        text: req.params.name,
        tones: 'emotion'
    }
    //var searchkey = req.params.name;
    tone_analyzer.tone(searchkey, function(error,response) {
        if (error)
            console.log('error:', error);
        else
            console.log(response);
            res.send(response);

    });
});

module.exports = router;