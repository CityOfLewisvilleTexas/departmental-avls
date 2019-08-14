angular.module('AVLApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'MessageBusModule', 'avlFilters'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('calls', {
                url: '/:orgGroupCode',
                views: {
                    '': {
                        templateUrl: 'views/calls.html',
                        controller: 'callsController'
                    },
                    'listView@calls': {
                        templateUrl: 'views/list.html',
                        controller: 'listController'
                    },
                    'mapView@calls': {
                        templateUrl: 'views/map.html',
                        controller: 'mapController'
                    }
                }

            });

    });
