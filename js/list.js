angular.module('AVLApp')
    .controller('listController', ['$scope', '$location', '$anchorScroll', 'messageBus',
        function ($scope, $location, $anchorScroll, messageBus) {
            'use strict';

            $scope.isopenprop;
            $scope.selectedID;

            /*messageBus.subscribe($scope, 'callDataLoaded', function (event, callData) {
                $scope.allCalls = callData;
            });*/

            /*
            messageBus.subscribe($scope, 'insertObj', function (event, object, index) {
                $scope.allCalls.splice(index, 0, object);
            });

            messageBus.subscribe($scope, 'deleteObj', function (event, index) {
                $scope.allCalls.splice(index, 1);
            });

            messageBus.subscribe($scope, 'updateObj', function (event, key, value, index) {
                $scope.allCalls[index][key] = value;
            });

            messageBus.subscribe($scope, 'deleteLastObj', function (event) {
                var removedObj = $scope.allCalls.pop();
            });*/

            $scope.updateMap = function (findID) {
                //$location.hash(findID);
                //$anchorScroll();

                $scope.selectedID = findID;
            };

            $scope.$watch("selectedID", function(newValue, oldValue){
                if(newValue){
                    messageBus.publish('selectedFromList', newValue);
                }
            }, true);

            $scope.excludeNullVal = function (call) {
                var result = {};
                angular.forEach(call, function (value, key) {
                    if (key.substring(0, 1) !== "_") {
                        if (value) {
                            result[key] = value;
                        }
                    }
                });
                return result;
            };

            $scope.orderByFunction = function (call) {
                var orderByArray = [];
                var count = call._OrderByCount;

                for (var i = 0; i < count; i++) {
                    orderByArray.push(call["_OrderBy" + i]);
                }
                orderByArray.push(call._ID);

                return orderByArray;
            }

    }]);