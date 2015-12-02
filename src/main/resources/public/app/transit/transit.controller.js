angular.module('carpooling.transit', []).controller('TransitController', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {
        $scope.createTransit = function (transit) {
            $http.post('/transit', {
                'startCity': transit.startCity,
                'endCity': transit.endCity,
                'driver': $rootScope.user.login,
                'startDate': transit.date
            }).success(function () {
                $state.go('transit.my');
                console.log('dodano');
            }).error(function (data) {
                console.error('nie dodano');
            });
        };

        $scope.getTransitDetails = function () {
            var id = $state.params.id;
            $http({
                method: 'GET',
                url: '/transit/' + id
            }).success(function (response) {
                $rootScope.currentTransit = response;
            }).error(function (error) {
                console.error('getTransitDetails error');
            });
        };

        $scope.getMyTransit = function () {
            $http({
                method: 'GET',
                url: '/transit/my/' + $rootScope.user.login
            }).success(function (response) {
                $scope.transits = response;
            }).error(function (error) {
                console.error('getMyTransit error');
            });
        };

        $scope.deleteTransit = function (transit) {
            $http.delete('/transit/' + transit.id).success(function () {
                console.log('Transit is deleted');
                $state.go('transit.my');
            }).error(function (error) {
                console.error('deleteTransit error');
            })
        };

        $scope.getRole = function (transit) {
            if (transit.driver.id === $rootScope.user.user.id) {
                return "Driver";
            } else {
                return "Passenger";
            }
        }

    }]);