module Application {

    class Flower
    {       
        Id: number;
        Name: string;
        Description: string;
        ImagePath: string;
        FlowerColor: string;
    }

    class Apiservice {

        http: ng.IHttpService;

        constructor(http: ng.IHttpService) { this.http = http; }


        getFlowers(): ng.IPromise<any> {
            this.http.defaults.headers.common['Accept'] = 'application/json';
            this.http.defaults.headers.common['Content-Type'] = 'application/json';
            this.http.defaults.headers.common["Authorization"] = 'Bearer ' + JSON.parse(localStorage.getItem('oauthToken')).access_token;

            var promise = this.http.get('https://localhost:44370/api/flowers', { cache: false }).error(error => {
                alert(error);
            });   
            return promise;
        }


        getToken(): ng.IPromise<any> {          
            this.http.defaults.headers.common['Accept'] = 'application/json';
            this.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';          
            var data = angular.element.param({
                username: 'diegomary',
                password: 'Atreius@62',
                grant_type:'password'
            });
            var promise = this.http.post('https://localhost:44370/token',data, { cache: false }).error(error => {
                alert("Error by Diego");
            });
            return promise;
        }
    }

    class MyController {
       
        flowers: Array<Flower>;
        http: ng.IHttpService;
        Ssvr: Apiservice;
        Token: string;
        ExpiresIn: number;
        interval: ng.IIntervalService;
        isAuthenticated: boolean;

        constructor($http: ng.IHttpService, ssvr: Apiservice, $interval: ng.IIntervalService ) {
            this.Ssvr = ssvr;
            this.http = $http;
            this.interval = $interval;          
        }
        private GetFlowers() {
            var self = this;
            this.Ssvr.getFlowers().then((response) =>
            {
                // To be sure to get the right data
                if (Array.isArray(response.data))
                    self.flowers = response.data;
                var t = 0;
            });       
        }
        private GetToken() {
            var self = this;
            this.Ssvr.getToken().then((response) => {
                localStorage.setItem('oauthToken', JSON.stringify(response.data)); 
                sessionStorage.setItem('oauthToken', JSON.stringify(response.data));
                self.Token = JSON.parse(localStorage.getItem('oauthToken')).access_token;
                this.ExpiresIn = JSON.parse(localStorage.getItem('oauthToken')).expires_in;
                this.isAuthenticated = true;

                self.interval(() => { self.ExpiresIn -= 1; }, 1000);
            });
        }

    }

    var appModule = angular.module("myApp", ['angular-loading-bar']);
    appModule.factory('Apiservice', ["$http", ($http) => new Apiservice($http)]);
    appModule.controller("MyController", ["$http", "Apiservice", "$interval", ($http, Apiservice, $interval, ngProgressFactory) => new MyController($http, Apiservice, $interval)]);

}

