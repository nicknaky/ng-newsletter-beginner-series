var app = angular.module("myApp", []);

app.run(function($rootScope) {
	$rootScope.name = "Nick Lam";
});

app.controller("MyController", function($scope) {
	$scope.person = {
		name: "Nick's Minion"
	};
});

