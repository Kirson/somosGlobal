/**
 * Created by M.JUNAID on 2015-03-10.
 */

angular.module('starter.carts', [])
.controller('cartController', function($scope, $rootScope, $cordovaToast) {
    //.controller('cartController', function($scope, $rootScope ) {
    $scope.cart = $rootScope.cart;
    $scope.total = 0;

    console.log($scope.cart);

    for (var i = 0 ; i < $scope.cart.length; i++){
        if($scope.cart[i].price){
            $scope.total = $scope.total + $scope.cart[i].price;
        }
        console.log($scope.cart[i].price);

    }

    $scope.showTotals = function(){
        $cordovaToast.show('Your Total is '+$scope.total, 'long', 'bottom')
            .then(function(success) {
                // success
            }, function (error) {
                // error
            });
    }

})

