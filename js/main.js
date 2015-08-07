var app = angular.module("myApp", []);

var apiKey = "MDIwMDkyNDQ5MDE0Mzg4NDAxMDg5MzI3Nw001";
var	nprUrl = "http://api.npr.org/query?id=3&fields=title,byline,text,audio,image,pullQuote,relatedLink,all&dataType=story&output=JSON";      


app.directive("nprLink", function() {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      play: '&'
    },
    templateUrl: 'views/nprListItem.html',
    link: function(scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
    }
  }
});


app.controller("PlayerController", function($scope, $http) {
  var audio = document.createElement("audio");
  $scope.audio = audio;

  $http({
    method: "JSONP",
    url: nprUrl + "&apiKey=" + apiKey + "&callback=JSON_CALLBACK"
  }).then(function(response, status) {
    
    console.log(response);
    $scope.programs = response.data.list.story;    
  }, function(response, status) {
    console.log('error', status, response);
  });

  $scope.play = function(program) {
    if ($scope.playing) {
      $scope.audio.pause();

    }
    var url = program.audio[0].format.mp4.$text;
    audio.src = url;
    audio.play();

    $scope.playing = true;
  } 

});




app.controller("RelatedController", ["$scope", "$http", function($scope, $http) {


}]);







