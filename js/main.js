var app = angular.module("myApp", []);

var apiKey = "MDIwMDkyNDQ5MDE0Mzg4NDAxMDg5MzI3Nw001";
var	nprUrl = "http://api.npr.org/query?id=3&fields=title,byline,text,audio,image,pullQuote,relatedLink,all&dataType=story&output=JSON";      
//            http://api.npr.org/query?id=3&fields=title,byline,text,audio,image,pullQuote,relatedLink,all&dateType=story&output=JSON&apiKey=MDIwMDkyNDQ5MDE0Mzg4NDAxMDg5MzI3Nw001


app.controller("PlayerController", function($scope, $http) {

	$http({
		method: "JSONP",
		url: nprUrl + "&apiKey=" + apiKey + "&callback=JSON_CALLBACK"
	}).success(function(data, status) {
		$scope.programs = data.list.story;
	}).error(function(data, status) {

	});
});

/*
app.controller('PlayerController', function($scope, $http) {
  // Hidden our previous section's content
  // construct our http request
  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
      $scope.programs = data.list.story;
  }).error(function(data, status) {
    // Some error occurred
  });
});
*/


app.controller("RelatedController", ["$scope", function($scope) {

}]);







