/* global Wistia: false */
(function() {

    angular
    .module('upload')
    .service('UploadService', UploadService);

    UploadService.$inject = ['$http', 'WISTIA'];

    function UploadService($http, WISTIA) {
        this.checkStatus = function(videoHash) {
            return $http({
                method: 'GET',
                url: WISTIA.media + videoHash + '.json',
                params: {
                    access_token: WISTIA.token,
                },
            })
            .catch(function(err) {
                throw error;
            });
        };
    }

})();
