"use strict";
var app = angular.module("resume", []);

app.factory("fetchResume", ['$http', '$q',  function($http, $q){
    var deferred = $q.defer();
    return {
        getJson: function(){
            $http.get("/resume/assets/data/resume.json")
                .then(function(response){
                    deferred.resolve(response.data);
                },
                function(response){
                    console.log(response);
                });
                return deferred.promise;
        }
    }

}]);

app.controller('MainCtrl', ['$scope', 'fetchResume',  function($scope, fetchResume) {

    fetchResume.getJson().then(function(data) {
        $scope.resume = data;
    });

    $scope.details = {
        bool: {},
        toggle: function (key) {
            if(this.bool[key] !== undefined) {
                this.bool[key] = !this.bool[key];
            } else {
                this.bool[key] = true;
            }
        },
        status: function(key) {
            return this.bool[key] === undefined || !this.bool[key] ? "More Details \u00bb" : "\u00ab Less Details";
        }
    }

}]);