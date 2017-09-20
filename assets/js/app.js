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

}]);