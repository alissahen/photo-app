;
(function () {
    angular.module('CatteryApp')
        .factory('imageService', ImageService)

    ImageService.$inject = ['$http']

    function ImageService($http) {
        function GetLatest() {
            return $http.get('https://pixabay.com/api/?key=6328373-5c6e8c72d5c0f8883cdd7ea89&per_page=200&order=latest')
        }
        
        function GetPopular() {
            return $http.get('https://pixabay.com/api/?key=6328373-5c6e8c72d5c0f8883cdd7ea89&per_page=200')
        }
        
        function Search(filterText) {
            return $http.get('https://pixabay.com/api/?key=6328373-5c6e8c72d5c0f8883cdd7ea89&q=' + encodeURIComponent(filterText) + '&image_type=photo&per_page=200')
        }

        return {
            getLatest: GetLatest,
            getPopular: GetPopular,
            search: Search
        }
    }
}())


