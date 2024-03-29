﻿angular.module('LocalStoreModule', [])
    .constant('localStoreConstants', {
        CURRENT_USER: '8638P1F2-7G18-692W-M2V2-50C9L31380DP',
        CURRENT_FULLNAME: '3833P1F2-9G12-692W-M2V2-50C9L31380WE',
        USER_ENTITIES: '6993D3D7-5E82-407C-A9E9-50C9439350MH',
        CURRENT_ENTITY: '389D3LE2-305Y-3H23-MN28-90238DE380DE'
    })
    .service('localStore', ['$log', '$window', 'localStoreConstants', 'messageBus',
        function ($log, $window, localStoreConstants, messageBus) {
            //SERVICE INTERFACE
            this.getCurrentUser = getCurrentUser;
            this.getCurrentFullName = getCurrentFullName;
            this.getUserEntities = getUserEntities;
            this.getCurrentEntity = getCurrentEntity;
            this.setCurrentUser = setCurrentUser;
            this.setCurrentFullName = setCurrentFullName;
            this.setUserEntities = setUserEntities;
            this.setCurrentEntity = setCurrentEntity;
            this.setSession = setSession;
            this.reset = reset;

            //SERVICE IMPLEMENTATION
            function getCurrentUser() {
                return getSession(localStoreConstants.CURRENT_USER);
            }

            function getCurrentFullName() {
                return getSession(localStoreConstants.CURRENT_FULLNAME);
            }

            function getUserEntities() {
                return getSession(localStoreConstants.USER_ENTITIES);
            }

            function getCurrentEntity() {
                return getSession(localStoreConstants.CURRENT_ENTITY);
            }

            function setCurrentUser(currentUserValue) {
                setSession(localStoreConstants.CURRENT_USER, currentUserValue);
            }

            function setCurrentFullName(currentFullNameValue) {
                setSession(localStoreConstants.CURRENT_FULLNAME, currentFullNameValue);
            }

            function setUserEntities(userEntitiesValue) {
                setSession(localStoreConstants.USER_ENTITIES, userEntitiesValue);

                messageBus.publish('userEntitiesChanged', userEntitiesValue);
            }

            function setCurrentEntity(currentEntityValue) {
                setSession(localStoreConstants.CURRENT_ENTITY, currentEntityValue);

                messageBus.publish('currentEntityChanged', currentEntityValue);
            }

            function getSession(key) {
                var sessionData = $window.sessionStorage.getItem(key);

                try {
                    // if we don't get a string, we can't convert it from JSON
                    if (typeof (sessionData) !== 'string') return sessionData;

                    // possible invalid JSON object failure during conversion
                    var value = angular.fromJson(sessionData);

                    // if the object is of the new encapsulated type, we should be able to return the value
                    //	otherwise, we return the object itself (for legacy)
                    return ((typeof (value) === 'object') && (typeof (value.value) !== 'undefined')) ? value.value : value;
                } catch (ex) {
                    // capture of JSON oject conversion failure - just return the string data
                    return sessionData;
                }
            }

            function setSession(key, value) {
                $window.sessionStorage.setItem(key, angular.toJson({ value: value }));
            }

            function reset() {
                var keys = JSONSelect.match('string', localStoreConstants);
                //var keys = angular.toJson([localStoreConstants]);

                for (var i = 0; i < keys.length; ++i) {
                    setSession(keys[i], null);
                }
            }
        }
    ]);
