/**
 * Created by M.JUNAID on 2015-03-10.
 */
angular.module('starter.accounts', [])
.controller('accountsController', function($scope, $timeout, $stateParams, ionicMaterialInk,$location, $ionicPopup,$ionicLoading) {

        $scope.$parent.clearFabs();
        
        var ref = new Firebase("https://foodpanda-mcc201.firebaseio.com/");



        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
    
        
        $scope.login = function(user) {

            if(typeof(user)=='undefined'){
                $scope.showAlert('Por favor ingrese su correo y clave.');
                return false;
            }

            if(user.email=='demo@somosglobal.com' && user.password=='demo'){
                $location.path('/app/profile');
            }else{
                $scope.showAlert('Usuario o clave incorrecto.');
            }

        };
        

        // An alert dialog
        $scope.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
            title: 'Mensaje de alerta',
         template: msg
        });
        };

    

        $scope.show = function() {
            $ionicLoading.show({
                template: '<img src="img/output_LoXQFP.gif">'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        var myUser = localStorage.getItem('firebase:session::foodpanda-mcc201');
        $scope.myUser = JSON.parse(myUser);

        $scope.user = {
            email : '',
            passwaord: '',
            data: ''
        };

        $scope.registerUser = function () {

            if ($scope.user.email && $scope.user.password){

                $scope.show();

            ref.createUser({
                email: $scope.user.email,
                password: $scope.user.password
            }, function (error) {
                if (error === null) {
                    console.log("User created successfully");

                    ref.authWithPassword({
                        email: $scope.user.email,
                        password: $scope.user.password
                    }, function (error, authData) {
                        if (error) {
                            console.log("Login Failed!", error);
                            $scope.hide()
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                            $scope.hide()


                            function authDataCallback(authData) {
                                if (authData) {
                                    console.log("User " + authData.uid + " is logged in with " + authData.provider);
                                    $scope.myUser = authData;
                                    $scope.hide()
                                    $ionicPopup.alert({
                                        title: 'Register Success!',
                                        template: 'logged in as ' + $scope.myUser.password.email
                                    })
                                } else {
                                    console.log("User is logged out");
                                    $scope.hide()
                                }
                            }

                            // Register the callback to be fired every time auth state changes
                            ref.onAuth(authDataCallback);
                        }
                    });

                } else {
                    $scope.hide();
                    console.log("Error creating user:", error);
                    $ionicPopup.alert({
                        title: 'Error creating user!',
                        template: error
                    })
                }
            })
        }
            else{
                $ionicPopup.alert({
                    title: 'Invalid Parameters',
                    template: 'Please fill both Fields above.'
                })
            }

        };

        $scope.loginUser = function (user) {

            if ($scope.user.email && $scope.user.password) {

                $scope.show();

                ref.authWithPassword({
                    email: $scope.user.email,
                    password: $scope.user.password
                }, function (error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                        $ionicPopup.alert({
                            title: 'Login Failed!',
                            template: error
                        })
                        $scope.hide()
                    } else {
                        console.log("Authenticated successfully with payload:", authData);
                        $scope.hide()

                        function authDataCallback(authData) {
                            if (authData) {
                                console.log("User " + authData.uid + " is logged in with " + authData.provider);
                                $scope.myUser = authData;
                                $scope.hide()
                                $ionicPopup.alert({
                                    title: 'Ingreso exitoso!',
                                    template: 'logged in as ' + $scope.myUser.password.email
                                })
                            } else {
                                console.log("User is logged out");
                                $scope.hide()
                            }
                        }

                        // Register the callback to be fired every time auth state changes
                        ref.onAuth(authDataCallback);

                        var authdata = ref.getAuth();

                        if (authdata) {
                            console.log("User " + authdata.uid + " is logged in with " + authdata.provider);
                        } else {
                            console.log("User is logged out");
                        }
                    }
                })
            }
            else{
                $ionicPopup.alert({
                    title: 'Parametros invalidos',
                    template: 'Por favor ingrese los campos requeridos.'
                })
            }
        };


        $scope.logoutUser = function () {
            $scope.user = {};
            $scope.myUser = {};
            localStorage.clear();
            ref.unauth();

        };

        $scope.fb = function () {
            console.log("===>>");
            $scope.show();
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $scope.hide()
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $scope.hide();
                    $scope.myUser = authData;
                    $scope.user = authData;
                    $location.path('/app/profile');

                }
            });
        };

      ionicMaterialInk.displayEffect();

    }


);