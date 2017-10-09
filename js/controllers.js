;
(function () {
    angular
        .module('CatteryApp')
        .directive('whenScrolled', whenScrolled)

    whenScrolled.$inject = ['$window']

    function whenScrolled($window) {
        var directive = {
            link: link,
            controller: catController,
            controllerAs: 'catController'
        }

        return directive;

        function link(scope, elm, attr, ctrl) {
            // scope.limit = 5;
            var btn = document.getElementById('toTop');
            var raw = elm[0];
            angular.element($window).bind('scroll', function () {
                if ($window.scrollY + $window.innerHeight >= raw.offsetHeight) {
                    // ctrl.limit = ctrl.limit + 20;
                } else if ($window.scrollY > 250) {
                    angular.element(toTop).addClass('show');
                }
                scope.$apply();
            })
        };
    };

    angular
        .module('CatteryApp')
        .directive('loading', ['$http', function ($http)
            {
                return {
                    link: function (scope, elm, attrs) {
                        scope.isLoading = function () {
                            return $http.pendingRequests.length > 0;
                        };

                        scope.$watch(scope.isLoading, function (v) {
                            if (v) {
                                elm.show();
                            } else {
                                elm.hide();
                            }
                        });
                    }
                };

    }]);

    catController.$inject = ['$http', '$anchorScroll', '$location']

    function catController($http, $anchorScroll, $location) {
        var ctrl = this;
        //ctrl.limit = 5;
        ctrl.filterText;
        ctrl.showme;
        ctrl.key = '6328373-5c6e8c72d5c0f8883cdd7ea89';
        ctrl.searched = false;

        $http.get('https://pixabay.com/api/?key=' + ctrl.key + '&per_page=200').then(function (response) {
            ctrl.photos = response.data;
            //ctrl.limit = 20;
            //ctrl.showme = false;
            ctrl.searched = false;
            console.log(ctrl.photos)
        });

        $http.get('https://pixabay.com/api/?key=' + ctrl.key + '&per_page=200&order=latest').then(function (response) {
            ctrl.latest = response.data;
            //ctrl.limit = 20;
            ctrl.showme = true;
            ctrl.searched = false;
            console.log(ctrl.latest)
        });

        ctrl.runSearch = function () {
            $http.get('https://pixabay.com/api/?key=' + ctrl.key + '&q=' + encodeURIComponent(ctrl.filterText) + '&image_type=photo&per_page=200').then(function (response) {
                ctrl.searchres = response.data;
                ctrl.status = response.status;
                //ctrl.limit = 20;
                ctrl.searched = true;
            });
        };

        ctrl.gotoTop = function () {
            angular.element(toTop).removeClass('show');
            $location.hash('top');
            $anchorScroll();
        };


        ctrl.zoom = function (index) {
            var elem = "view-" + index;
            var imageId = document.getElementById(elem);
            if (angular.element(imageId).hasClass('expand')) {
                angular.element(imageId).removeClass('expand');
            } else {
                angular.element(imageId).parent().children().removeClass('expand');
                angular.element(imageId).addClass('expand');
            }
        }
    }
})();
