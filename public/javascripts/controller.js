angular.module('cs411', ['ngCookies'])

    .controller('cs411ctrl', function($scope, $http, $cookies){

        //CREATE (POST)
        $scope.createUser = function () {
            if ($scope.dbID) {
                $scope.updateUser($scope.dbID);
            }
            else {
                var request = {
                    method: 'post',
                    url: 'http://localhost:3000/api/db',
                    data: {
                        username: $scope.username,
                        music: $scope.music,
                        movie: $scope.movie
                    }
                };
                $http(request)
                    .then(function (response) {
                        $scope.inputForm.$setPristine();
                        $scope.username = $scope.music = $scope.movie = '';
                        $scope.getUsers();
                    })
            }
        };
        //READ (GET)
        $scope.getUsers = function () {
            $http.get('http://localhost:3000/api/db')
                .then(function (response) {
                    $scope.users = response.data;

                })
        };
        //UPDATE (PUT)
        $scope.setUserUpdate = function (user) {
            $scope.buttonMessage = "Update User";
            $scope.h2message = "Updating ";
            $scope.username = user.username;
            $scope.music = user.music;
            $scope.dbID = user._id;
            $scope.movie = user.movie;

        };
        $scope.updateUser = function (userID) {
            var request = {
                method: 'put',
                url: 'http://localhost:3000/api/db/' + userID,
                data: {
                    username: $scope.username,
                    music: $scope.music,
                    movie: $scope.movie,
                    _id: userID
                }
            };
            $http(request)
                .then(function (response) {
                    $scope.inputForm.$setPristine();
                    $scope.username = $scope.music = $scope.movie = '';
                    $scope.h2message = "Add user";
                    $scope.buttonMessage = "Add User";
                    $scope.getUsers();
                    $scope.dbID = null;
                })

        };

        //DELETE (DELETE)
        $scope.deleteUser = function (_id) {

            var request = {
                method: 'delete',
                url: 'http://localhost:3000/api/db/' + _id,
            };
            $http(request)
                .then(function (response) {
                    $scope.inputForm.$setPristine();
                    $scope.username = $scope.music = $scope.movie = '';
                    $scope.getUsers();
                })

        };

        $scope.initApp = function () {
            $scope.buttonState = "create";
            $scope.h2message = "Add Likes";
            $scope.buttonMessage = "Add Likes";
            $scope.authorized = false
            $scope.showLogin = false
            $scope.getUsers()
            //Grab cookies if present
            var authCookie = $cookies.get('authStatus')
            $scope.authorized = !!authCookie
        }

        $scope.logout = function () {
            $http.get('/auth/logout')
                .then(function (response) {
                    $scope.authorized = false
                })
        }

        $scope.login = function () {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/auth/login',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }

            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (err) {
                        $scope.authorized = false
                    }
                )
        }

        $scope.register = function () {

            const request = {
                method: 'post',
                url: '/auth/register',
                data: {
                    name: $scope.name,
                    username: $scope.username,
                    password: $scope.password
                }
            }

            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (error) {
                        if (error.status === 401) {
                            $scope.authorized = false
                            $scope.h2message = "Error registering"
                            console.log(error)
                        }
                    }
                )
        };

        $scope.showLoginForm = function () {
            $scope.showLogin = true
        };

        $scope.doTwitterAuth = function () {
            var openUrl = '/auth/twitter/'
            //Total hack, this:
            $scope.authorized = true
            window.location.replace(openUrl)

        }
    })

    //Auth Controller
    .controller('authController', function ($scope) {

        var authStatus = $location.search();
        console.log(authStatus)
        console.log('In authController')
        $scope.authorized = !!authStatus

    })

    //This controller handles toggling the display of details in the user list
    .controller('listController', function ($scope){
        $scope.display = false;

        $scope.showInfo = function() {
            $scope.display = !$scope.display;
        }


    })

    //This controller handles Movie Search API calling
    .controller('movieController', function ($scope, $http) {


        $scope.getTMDbData = function (moviename) {
            console.log("Search with: " + moviename);
            $http.get('http://localhost:3000/tmdb/' + moviename)
                .then(function(response){
                    $scope.movieLists = response.data;
                    console.log(response.data);
                    $scope.getToneCalling(response.data);
                })
        }

        $scope.getToneCalling = function (overview){
            $http.get('http://localhost:3000/tone/' + overview)
                .then(function(response){
                    $scope.toneAna = response.data;
                    $scope.getSpotifyCalling(response.data);
                })
        }

        $scope.getSpotifyCalling = function (keywords){
            $http.get('http://localhost:3000/spotify/' + keywords)
                .then(function(response){
                    $scope.spotifyResult = response.data;
                })
        }

        $scope.favoritePlaylist = function (favoriteitem) {
            var request = {
                method: 'post',
                url: 'http://localhost:3000/api/db',
                data: {
                    username: "default",
                    music: favoriteitem.name,
                    movie: favoriteitem.external_urls.spotify
                }
            };
            $http(request)
                .then(function (response) {
                    $scope.inputForm.$setPristine();
                    $scope.username = $scope.music = $scope.movie = '';
                    $scope.getUsers();
                })
        }

    })


