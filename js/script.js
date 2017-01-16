var toursim=angular.module("tourismapp",["ui.router","MainController"]);

toursim.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    
      $stateProvider
        .state('default', {
            url: "/",
            templateUrl: "html/firstpage.html"
        })
        .state('wishlist', {
            url: "/cities",
            templateUrl: "html/wishlist.html",
            controller:"WishlistController"
        });
});