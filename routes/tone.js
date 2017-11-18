var express = require('express');
var router = express.Router();

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
    username: "b47aadfa-0312-4947-96a6-a63e7daa5633",
    password: "fZQAELthA634",
    version_date: '2017-05-26'
});

router.get('/', function(req, res, next) {
    res.send('tone');
});
/*
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