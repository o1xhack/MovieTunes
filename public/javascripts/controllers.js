angular.module('cs411', [])
    .directive('nameDisplay', function() {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"}
    })
    .controller('cs411ctrl', function($scope, $http){

        //CREATE (POST)
        $scope.createUser = function() {
            if($scope.dbID) {$scope.updateUser($scope.dbID);}
            else {
                var request = {
                    method: 'post',
                    url: 'http://localhost:3000/api/db',
                    data: {
                        username: $scope.username,
                        music_keyword: $scope.music_keyword,
                        movie: $scope.movie
                    }
                };
                $http(request)
                    .then(function(response){
                        $scope.inputForm.$setPristine();
                        $scope.username = $scope.music_keyword = $scope.movie = '';
                        $scope.getUsers();
                    })
            }
        }
        //READ (GET)
        $scope.getUsers = function() {
            $http.get('http://localhost:3000/api/db')
                .then(function(response){
                    $scope.users = response.data;
                    //console.log("dadgasdgsg");

                })
        };
        //UPDATE (PUT)
        $scope.setUserUpdate = function(user) {
            $scope.buttonMessage = "Update User";
            $scope.h2message="Updating ";
            $scope.username=user.username;
            $scope.music_keyword = user.music_keyword;
            $scope.dbID = user._id;
            $scope.movie=user.movie;

        };
        $scope.updateUser = function (userID) {
            var request = {
                method: 'put',
                url: 'http://localhost:3000/api/db/' + userID ,
                data: {
                    username: $scope.username,
                    music_keyword: $scope.music_keyword,
                    movie: $scope.movie,
                    _id: userID
                }
            };
            $http(request)
                .then(function(response){
                    $scope.inputForm.$setPristine();
                    $scope.username = $scope.music_keyword = $scope.movie = '';
                    $scope.h2message="Add user";
                    $scope.buttonMessage = "Add User";
                    $scope.getUsers();
                    $scope.dbID = null;
                })

        };

        //DELETE (DELETE)
        $scope.deleteUser = function (_id) {

            var request = {
                method: 'delete',
                url: 'http://localhost:3000/api/db/' + _id
            };
            $http(request)
                .then(function(response){
                    $scope.inputForm.$setPristine();
                    $scope.username = $scope.music_keyword = $scope.movie = '';
                    $scope.getUsers();
                })

        };
        $scope.initApp = function () {
            $scope.buttonState = "create";
            $scope.h2message="Add user";
            $scope.buttonMessage = "Add User";
            $scope.getUsers();
        }
    })
    //This controller handles toggling the display of details in the user list
    .controller('listController', function ($scope){
        $scope.display = false;

        $scope.showInfo = function() {
            $scope.display = !$scope.display;
        }


    });
