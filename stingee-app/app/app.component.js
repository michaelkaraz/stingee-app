"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var maps_service_1 = require('./maps.service');
var geolocation_service_1 = require('./geolocation.service');
var geocoding_service_1 = require('./geocoding.service');
var AppComponent = (function () {
    function AppComponent(maps, geolocation, geocoding) {
        this.maps = maps;
        this.geolocation = geolocation;
        this.geocoding = geocoding;
        this.title = "Boob";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().subscribe(function (data) {
            //debugger;
            _this.geo = data;
            _this.center = new google.maps.LatLng(_this.geo.coords.latitude, _this.geo.coords.longitude);
            _this.getLocationDetails(_this.center);
        }, function (error) { alert(error); }, function () {
            console.log(_this.geo);
        });
    };
    AppComponent.prototype.getLocationDetails = function (position) {
        var _this = this;
        // Translates the location into address.
        this.geocoding.geocode(position).forEach(
        // Next.
        function (results) {
            //debugger;
            // Sets the marker to the center map.
            _this.title = results[0].formatted_address;
            // alert(address);
        }, null).then(function () { return console.log('Geocoding service: completed.'); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'demo-app',
            templateUrl: './app/app.component.html'
        }), 
        __metadata('design:paramtypes', [maps_service_1.MapsService, geolocation_service_1.GeolocationService, geocoding_service_1.GeocodingService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map