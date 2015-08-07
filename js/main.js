var app = angular.module("myApp", []);

var apiKey = "MDIwMDkyNDQ5MDE0Mzg4NDAxMDg5MzI3Nw001";
var	nprUrl = "http://api.npr.org/query?id=3&fields=title,byline,text,audio,image,pullQuote,relatedLink,all&dataType=story&output=JSON";      



app.factory("githubService", ["$http", function($http) {
    
    var doRequest = function(username, path) {
      return $http({
        method: "JSONP",
        url: "https://api.github.com/users/" + username + "/" + path + "?callback=JSON_CALLBACK"
      });
    }


    return {
      events: function(username) { return doRequest(username, "events"); },
    };
  }]);

/*
app.controller("ServiceController", ["$scope", "githubService", function($scope, githubService) {
  $scope.$watch("username", function(newUserName) {
    githubService.events(newUserName).then(function(data, status, headers) {
      $scope.events = data;
    });
  });
}]);
*/


app.controller('ServiceController', ['$scope', 'githubService',
    function($scope, githubService) {
    // Watch for changes on the username property.
    // If there is a change, run the function
    $scope.$watch('username', function(newUsername) {
            // uses the $http service to call the GitHub API
            // and returns the resulting promise
      githubService.events(newUsername)
        .success(function(data, status, headers) {
                    // the success function wraps the response in data
                    // so we need to call data.data to fetch the raw data
          $scope.events = data.data;
        })
    });
}]);


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







