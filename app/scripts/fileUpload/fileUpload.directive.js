/* global Wistia: false */
(function() {

    angular
    .module('upload')
    .directive('fileUpload', fileUpload);

    fileUpload.$inject = ['$compile', 'WISTIA'];

    function fileUpload($compile, WISTIA) {

        var directive = {
            templateUrl: '/scripts/fileUpload/fileupload.html',
            restrict: 'A',
            scope: {},
            link: link,
            controller: UploadController,
            controllerAs: 'vm',
            bindToController: true,
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            var $progress = element.find('.progress-bar');
            var $input = element.find('.upload-file');
            var $wistia = element.find('.wistia_responsive_padding');
            var $waiting = element.find('.waiting');
            var $wrapper = element.find('.wistia_responsive_wrapper');
            var progress = 0;
            var wistiaClass = 'wistia_embed videoFoam=true wistia_async_';

            $input.bind('fileuploadsubmit', function(e, data) {
                data.formData = {
                    project_id: WISTIA.project,
                    access_token: WISTIA.token,
                };
            });

            $input.fileupload({
                url: WISTIA.url,
                acceptFileTypes: /(\.|\/)(avi|mpe?g)$/i,
                maxFileSize: 999000,
                done: function(e, data) {
                    $waiting.toggleClass('hide', 'show');
                    $wistia.toggleClass('hide', 'show');

                    ctrl.hashVideo = data.result.hashed_id;
                    ctrl.checkStatus()
                    .then(function() {
                        var newDirective = angular.element('<div></div>');
                        newDirective.addClass(
                            wistiaClass + data.result.hashed_id
                        );

                        $wrapper.append(newDirective);

                        $waiting.toggleClass('hide', 'show');
                    });

                },

                progressall: function(e, data) {
                    progress = parseInt(data.loaded / data.total * 100, 10);
                    $progress.css(
                        'width',
                        progress + '%'
                    );
                    $progress.html(progress + '%');
                },

                processalways: function(e, data) {
                    var index = data.index;
                    var file = data.files[index];
                    console.log('file', file);
                },

            });

            element.on('$destroy', function() {
                scope.$destroy();
            });

            scope.$on('$destroy', function() {
                element.fileupload('destroy');
            });

        }

        UploadController.$inject = [
            '$interval',
            '$q',
            '$scope',
            'UploadService',
            'WISTIA',
        ];

        function UploadController($interval, $q, $scope, UploadService, WISTIA) {
            var vm = this;
            var stopTime;

            if (angular.isDefined(stopTime)) {
                return;
            }

            vm.hashVideo = undefined;
            vm.checkStatus = checkStatus;
            vm.stopStatus = stopStatus;

            function checkStatus() {
                var defer = $q.defer();
                stopTime = $interval(function() {
                    UploadService.checkStatus(vm.hashVideo)
                    .then(function(result) {
                        if (result.data.status === 'ready') {
                            vm.stopStatus();

                            defer.resolve(true);
                        }
                    });
                }, 2000);

                return defer.promise;
            }

            function stopStatus() {
                if (angular.isDefined(stopTime)) {
                    $interval.cancel(stopTime);
                    stopTime = undefined;
                }
            };

            $scope.$on('$destroy', function() {
                $scope.stop();
            });
        }

    }

})();
