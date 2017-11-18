var express = require('express');
var router = express.Router();
const Tmdb = require('tmdb-v3');

const tmdb = new Tmdb({ apiKey: '9edb89b91f4f28ef916263ab0ea5f63e' });

router.get('/', function(req, res, next) {
    res.send('tmdb');
});

router.get('/:name', function(req, res, next){
    var searchkey = req.params.name;
    tmdb.searchMovie(searchkey)
        .then(function(data) {
            res.json(data.body);
        });
});

module.exports = router;