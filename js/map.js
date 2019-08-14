angular.module('AVLApp')
      .controller('mapController', ['$scope', '$sce', 'messageBus',
        function ($scope, $sce, messageBus) {
            'use strict';

            $scope.baseMapURL;

            if ($scope.orgGroupCode == "11.370"){
                $scope.baseMapURL = "http://lewisville.maps.arcgis.com/apps/webappviewer/index.html?id=68157681c75d47418620c135339eff22";
            }
            else if ($scope.orgGroupCode == "11.380"){
                $scope.baseMapURL = "http://lewisville.maps.arcgis.com/apps/webappviewer/index.html?id=4559e6f595804159a4a51778658d26c1";
            }
            else if ($scope.orgGroupCode == "11.390"){
                $scope.baseMapURL = "http://lewisville.maps.arcgis.com/apps/webappviewer/index.html?id=b2848ce48e9e447fa84adf24ddc23430";
            }
            else if ($scope.orgGroupCode == "11.394"){
                $scope.baseMapURL = "http://lewisville.maps.arcgis.com/apps/webappviewer/index.html?id=677c0dba54a34b80b7820e2a5b1c8481";
            }
            else if ($scope.orgGroupCode == "18.110"){
                $scope.baseMapURL = "http://lewisville.maps.arcgis.com/apps/webappviewer/index.html?id=dedff25e1632445ca7a4401250c6d6df";
            }
            else if ($scope.orgGroupCode == "40.380"){
                $scope.baseMapURL = "http://lewisville.maps.arcgis.com/apps/webappviewer/index.html?id=df4c632421c949d78649bd7081b91cab";
            }

            $scope.mapURL = $scope.baseMapURL;
            $scope.trustedMapURL = $sce.trustAsResourceUrl($scope.mapURL);

            messageBus.subscribe($scope, 'callDataLoaded', function (event, callData) {
                $scope.callResults = callData;
                $scope.allCalls = $scope.callResults;
            });

            messageBus.subscribe($scope, 'selectedFromList', function (event, selectedId) {
                $scope.mapURL = $scope.baseMapURL + "&find=" + selectedId;
                $scope.updateMapURL();
            });

            $scope.updateMapURL = function() {
                $scope.trustedMapURL = $sce.trustAsResourceUrl($scope.mapURL);
            };

            /*$scope.updateList = function (selectedCallId) {
                messageBus.publish('callSelectedFromMap', selectedCallId);
            };*/

        }]);