var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional

var clientId = '5b2a4ffeba0049ebb44f42b0042bab84';
var clientSecret = '89de819dcd284ec090d2f75144b15d35';
var redirectUri= 'http://localhost:3000/spotify/callback';


var spotifyApi = new SpotifyWebApi({
    clientId : clientId,
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


//spotifyApi.setAccessToken('<your_access_token>');


router.get('/', function(req, res, next) {
    res.send('spotify');
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




module.exports = router;
