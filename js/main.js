var app = angular.module("myApp", []);

var apiKey = "MDIwMDkyNDQ5MDE0Mzg4NDAxMDg5MzI3Nw001";
var	nprUrl = "http://api.npr.org/query?id=3&fields=title,byline,text,audio,image,pullQuote,relatedLink,all&dataType=story&output=JSON";      


app.controller("PlayerController", function($scope, $http) {

  $http({
    method: "JSONP",
    
    url: nprUrl + "&apiKey=" + apiKey + "&callback=JSON_CALLBACK"
  }).then(function(file, status) {
    var url = nprUrl + "&apiKey=" + apiKey + "&callback=JSON_CALLBACK";
    

    $scope.programs = JSON.stringify(file.data.list.story);
    console.log(file);
    

    //$scope.programs = JSON.stringify(data);
    //console.log($scope.programs);
  }, function(data, status) {

  });
});





app.controller("RelatedController", ["$scope", "$http", function($scope, $http) {


}]);







