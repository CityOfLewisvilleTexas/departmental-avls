angular.module('AVLApp')
    .controller('callsController', ['$scope', '$http', '$stateParams', '$interval', '$window', 'messageBus',
        function ($scope, $http, $stateParams, $interval, $window, messageBus) {

            $scope.isCollapsed = true;

            var isMobile = false; //initiate as false

            // device detection
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

            $scope.autorefreshModel = !isMobile;

            $scope.radioModel = 'Both';

            $scope.orgGroupCode = $stateParams.orgGroupCode;

            angular.element($window).on('resize', function(){
                $scope.$apply(function(){
                    if ($window.innerWidth > 991){
                        $scope.radioModel = 'Both';
                    }
                });
            })

            $scope.getList = function () {
                var url = "http://eservices.cityoflewisville.com/citydata/?datasetid=AVLTemplate_Accordion&datasetformat=jsonp&orgGroupCode=" + $scope.orgGroupCode + "&callback=JSON_CALLBACK";

                $http.jsonp(url)
                    .success(function (data, status, headers, config) {
                        $scope.callResults = data.results;
                        $scope.allCalls;

                        // If first time data is loaded
                        if (!$scope.allCalls){
                            $scope.allCalls = $scope.callResults;

                            $scope.navTitle1 = $scope.allCalls[0]._NavbarTitle1;
                            $scope.navTitle2 = $scope.allCalls[0]._NavbarTitle2;
                            $scope.navTitle3 = $scope.allCalls[0]._NavbarTitle3;

                            // ADDED BY REGINALD
                            //messageBus.publish('callDataLoaded', $scope.allCalls);
                        }
                        else{
                            // If the two arrays are the same
                            if(angular.equals($scope.callResults, $scope.allCalls)){
                                // Do nothing
                                console.log("No change");
                            }
                            // Else if the two arrays are not equal
                            else{
                                console.log("Change made");

                                // Loop through each object in the results array
                                for(var i = 0; i < $scope.callResults.length; i++){

                                    // FIRST: Check the arrays for shallow changes (object inserted/deleted)

                                    var id = $scope.callResults[i]._ID;
                                    // Get the index of the same object id in the stored array
                                    var i2 = binarySearch($scope.allCalls, id);

                                    //  If the object id was not found in the stored array
                                    if (i2 < 0){
                                        // Insert object at the same index as the results array
                                        console.log("Insert " + id + " at index " + i + " (SHALLOW)");
                                        //messageBus.publish('insertObj', $scope.callResults[i], i);
                                        $scope.allCalls.splice(i, 0, $scope.callResults[i]);

                                        i2 = i;
                                    }
                                    // Else if the object id was found at the same index
                                    else if(i === i2){
                                        // Do nothing now, check if objects are equal later
                                        //console.log(id + " found at same index " + i + " (SHALLOW)");
                                    }
                                    // Else if the object id was found at a different index (theoretically only found at a larger index)
                                    else{
                                        while(i < i2){
                                            // Delete previous object of the correct object
                                            console.log("Delete " + $scope.allCalls[i2 - 1]._ID + " at index " + (i2 - 1) + " (SHALLOW)");
                                            //messageBus.publish('deleteObj', (i2 - 1));
                                            $scope.allCalls.splice((i2 - 1), 1);

                                            i2 = binarySearch($scope.allCalls, id);
                                        }
                                        if(i > i2){
                                            console.log("ERROR: " + i + " > " + i2);
                                        }
                                        // Do nothing now, check if objects are equal later
                                        //console.log(id + " found at same index " + i + " (SHALLOW)");
                                    }

                                    // SECOND: Check arrays for deep changes (property value changes)

                                    if(angular.equals($scope.callResults[i], $scope.allCalls[i2])){
                                        // Do nothing
                                        //console.log("No change at index " + i + "/" + i2 + ": " + id + " (DEEP)");
                                    }
                                    else{
                                        angular.forEach($scope.callResults[i], function (value, key) {
                                            if( $scope.allCalls[i][key] == value || (!($scope.allCalls[i][key]) && !(value)) ){
                                                // Do nothing
                                                //console.log("No change for " + key);
                                            }
                                            else{
                                                // Set property
                                                //messageBus.publish('updateObj', key, value, i);
                                                console.log("Set " + key + " to " + value + " at index " + i + "/" + i2 + " (DEEP)");
                                                $scope.allCalls[i][key] = value;
                                            }
                                        });
                                    }
                                }

                                // If objects were deleted at the end of the results array, stored array was not modified in loop above
                                while($scope.callResults.length < $scope.allCalls.length){
                                    //messageBus.publish('deleteLastObj');
                                    var removedObj = $scope.allCalls.pop();
                                    console.log("Delete " + removedObj._ID + " from end (SHALLOW)");
                                }

                                if( !(angular.equals($scope.callResults, $scope.allCalls))){
                                    alert("ERROR");
                                }
                            }
                        }
                    });
            };

            $scope.$watch("autorefreshModel", function(){
                if($scope.autorefreshModel){
                    $scope.getList();
                    start = $interval(function(){
                        $scope.getList();
                    }, 20000);
                }
                else{
                    $scope.getList();
                    if(angular.isDefined(start)){
                        $interval.cancel(start);
                        start = undefined;
                    }
                }
            }, true);

            /*testing*/
            $scope.$watch("callResults", function(newValue, oldValue){
                console.log("$watch equality: ");
                console.log(oldValue);
                console.log(newValue);
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
                    if (call["_OrderBy" + i]) {
                        orderByArray.push(0);
                    }
                    else {
                        orderByArray.push(1);
                    }
                    orderByArray.push(call["_OrderBy" + i]);
                }

                orderByArray.push(call._ID);

                return orderByArray;
            };

            function binarySearch(array, searchID){
                var first = 0;
                var last = array.length - 1;
                var mid;
                var position = -1;
                var found = false;

                while(!found && first <= last){
                    mid = Math.ceil((first + last)/2);
                    if(array[mid]._ID == searchID){
                        found = true;
                        position = mid;
                    }
                    else if(array[mid]._ID > searchID){
                        last = mid - 1;
                    }
                    else{
                        first = mid + 1;
                    }
                }

                return position;
            };
        }]);