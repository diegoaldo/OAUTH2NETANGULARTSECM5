var Application;
(function (Application) {
    var Flower = (function () {
        function Flower() {
        }
        return Flower;
    }());
    var Apiservice = (function () {
        function Apiservice(http) {
            this.http = http;
        }
        Apiservice.prototype.getFlowers = function () {
            this.http.defaults.headers.common['Accept'] = 'application/json';
            this.http.defaults.headers.common['Content-Type'] = 'application/json';
            this.http.defaults.headers.common["Authorization"] = 'Bearer ' + JSON.parse(localStorage.getItem('oauthToken')).access_token;
            var promise = this.http.get('https://localhost:44370/api/flowers', { cache: false }).error(function (error) {
                alert(error);
            });
            return promise;
        };
        Apiservice.prototype.getToken = function () {
            this.http.defaults.headers.common['Accept'] = 'application/json';
            this.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            var data = angular.element.param({
                username: 'diegomary',
                password: 'Atreius@62',
                grant_type: 'password'
            });
            var promise = this.http.post('https://localhost:44370/token', data, { cache: false }).error(function (error) {
                alert("Error by Diego");
            });
            return promise;
        };
        return Apiservice;
    }());
    var MyController = (function () {
        function MyController($http, ssvr, $interval) {
            this.Ssvr = ssvr;
            this.http = $http;
            this.interval = $interval;
        }
        MyController.prototype.GetFlowers = function () {
            var self = this;
            this.Ssvr.getFlowers().then(function (response) {
                // To be sure to get the right data
                if (Array.isArray(response.data))
                    self.flowers = response.data;
                var t = 0;
            });
        };
        MyController.prototype.GetToken = function () {
            var _this = this;
            var self = this;
            this.Ssvr.getToken().then(function (response) {
                localStorage.setItem('oauthToken', JSON.stringify(response.data));
                sessionStorage.setItem('oauthToken', JSON.stringify(response.data));
                self.Token = JSON.parse(localStorage.getItem('oauthToken')).access_token;
                _this.ExpiresIn = JSON.parse(localStorage.getItem('oauthToken')).expires_in;
                _this.isAuthenticated = true;
                self.interval(function () { self.ExpiresIn -= 1; }, 1000);
            });
        };
        return MyController;
    }());
    var appModule = angular.module("myApp", ['angular-loading-bar']);
    appModule.factory('Apiservice', ["$http", function ($http) { return new Apiservice($http); }]);
    appModule.controller("MyController", ["$http", "Apiservice", "$interval", function ($http, Apiservice, $interval, ngProgressFactory) { return new MyController($http, Apiservice, $interval); }]);
})(Application || (Application = {}));
//# sourceMappingURL=app.js.map