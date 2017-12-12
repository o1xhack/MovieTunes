var express = require('express');
var router = express.Router();
const Tmdb = require('tmdb-v3');

var APIKEY = require('../config/tmdb').API_KEY;
const tmdb = new Tmdb({ apiKey: APIKEY });

router.get('/', function(req, res, next) {
    res.send('tmdb');
});

router.get('/:name', function(req, res, next){
    var searchkey = req.params.name;
    tmdb.searchMovie(searchkey)
        .then(function(data) {
            var newdata = JSON.parse(data.body);
            console.log(newdata.results[0].overview)
            res.json(newdata.results[0].overview);
        });
});

module.exports = router;