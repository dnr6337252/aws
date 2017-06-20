var app=angular.module("app",['ngSanitize']);
app.controller("controller",function($scope,$http){
	$scope.data=false;
	$scope.submit = function() {
		$http.post('/api', $scope.name).then(function(res){
		$scope.data=true;
		console.log(res.data);
		 $scope.myHTML =res.data;
	});

	}

	
	
	
})