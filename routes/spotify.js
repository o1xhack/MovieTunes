var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional

var clientID = require('../config/spotify').clientID;
var clientSecret = require('../config/spotify').clientSecret;
var redirectUri= require('../config/spotify').redirectUri;


var spotifyApi = new SpotifyWebApi({
    clientId : clientID,
    clientSecret : clientSecret
});

spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    });

router.get('/', function(req, res, next) {
    res.send('spotify');
});

router.get('/:name', function(req, res, next){
    var searchkey = req.params.name;
    spotifyApi.searchPlaylists(searchkey)
        .then(function(data) {
            var values = data.body.playlists.items;
            var urls = [];
            for(i = 0; i < values.length; i++) {
                console.log(values[i].external_urls.spotify);
                urls.push(values[i].external_urls.spotify);
            }
            res.json(urls);
            }, function(err) {
            console.error(err);
        });
});

module.exports = router;
