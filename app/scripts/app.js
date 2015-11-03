(function() {
    'use strict';

    angular
    .module('app', ['upload'])
    .config(configure)
    .run(init);

    /* @ngInject */
    function configure($logProvider, $locationProvider) {
        $logProvider.debugEnabled(true);
        $locationProvider.html5Mode(true);
    }

    /* @ngInject */
    function init($log) {
        $log.log('Arrancando!');
    }

})();
