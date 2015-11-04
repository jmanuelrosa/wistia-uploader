/* global Wistia: false */
(function() {

    angular
    .module('upload', [])
    .constant('WISTIA', {
        url: 'https://upload.wistia.com',
        media: 'https://api.wistia.com/v1/medias/',
        project: '',
        token: '',
    });

})();
