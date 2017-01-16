var app=angular.module("tourismapp",['ui-router',"MainController"]);

app.controller("WishlistController",function($scope,$http,$state){
       $http.get('/cities')
        .success(function(data){
   		    $scope.cities = data;
   		    console.log(data);
   		
    	}).error(function(){
    		$scope.status = "error"
           });
       });