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
      player: '='
    },
    templateUrl: 'views/nprListItem.html',
    link: function(scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
    }
  }
});

app.factory("audioService", ["$document", function($document) {
  var audio = $document[0].createElement("audio");
  return audio;
}]);

app.factory("playerService", ["audioService", "$rootScope", function(audioService, $rootScope) {
  var player = {
    playing: false,
    current: null,
    ready: false,

    play: function(program) {
      if (player.playing) player.stop();  //If we are already playing, then stop current playback
      var url = program.audio[0].format.mp4.$text;  //Structure from npr API
      player.current = program;
      audioService.src = url;
      audioService.play();
      player.playing = true;
    },

    stop: function(program) {
      if (player.playing) {
        audioService.pause(); //Stop playback
        //Clear state of player
        player.ready = player.playing = false;
        player.current = null;
      }
    },

    currentTime: function() {
      return audioService.currentTime;
    },

    currentDuration: function() {
      return parseInt(audioService.duration);
    }
  };

  audioService.addEventListener("canplay", function(evt) {
    $rootScope.$apply(function() {
      player.ready = true;
    });
  });

  audioService.addEventListener("timeupdate", function(evt) {
    $rootScope.$apply(function() {
      player.progress = player.currentTime();
      player.progress_percent = player.progress / player.currentDuration();
    });
  });

  audioService.addEventListener("ended", function() {
    $rootScope.$apply(player.stop());
  });
  return player;
}]);

app.factory("nprService", ["$http", function($http) {
  var doRequest = function(apiKey) {
    return $http({
      method: "JSONP",
      url: nprUrl + "&apiKey=" + apiKey + "&callback=JSON_CALLBACK"
    });
  };
  return {
    programs: function(apiKey) {
      return doRequest(apiKey);
    }
  };
}]);

app.controller("PlayerController", ["$scope", "nprService", "playerService", function($scope, nprService, playerService) {
  $scope.player = playerService;
  nprService.programs(apiKey).then(function(response) {
    $scope.programs = response.data.list.story;
  });
}]);









