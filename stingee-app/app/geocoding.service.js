/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */
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
var Observable_1 = require('rxjs/Observable');
/**
 * GeocodingService class.
 * https://developers.google.com/maps/documentation/javascript/
 *
 * @author Roberto Simonetti
 */
var GeocodingService = (function () {
    function GeocodingService() {
        this.geocoder = new google.maps.Geocoder();
    }
    /**
     * Reverse geocoding by location.
     *
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param latLng Location
     * @return An observable of GeocoderResult
     */
    GeocodingService.prototype.geocode = function (latLng) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            // Invokes geocode method of Google Maps API geocoding.
            _this.geocoder.geocode({ 'location': latLng }, (
            // Results & status.
            // Results & status.
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results);
                    observer.complete();
                }
                else {
                    console.log('Geocoding service: geocoder failed due to: ' + status);
                    observer.error(status);
                }
            }));
        });
    };
    /**
     * Geocoding services.
     *
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param address The address to be searched
     * @return An observable of GeocoderResult
     */
    GeocodingService.prototype.codeAddress = function (address) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            // Invokes geocode method of Google Maps API geocoding.
            _this.geocoder.geocode({ 'address': address }, (
            // Results & status.
            // Results & status.
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results);
                    observer.complete();
                }
                else {
                    console.log('Geocoding service: geocode was not successful for the following reason: ' + status);
                    observer.error(status);
                }
            }));
        });
    };
    ///Use K for kilometers N for nautical miles and nothing for miles
    GeocodingService.prototype.lineOfSightDistanceCalc = function (lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") {
            dist = dist * 1.609344;
        }
        if (unit === "N") {
            dist = dist * 0.8684;
        }
        return Math.round(dist);
    };
    GeocodingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GeocodingService);
    return GeocodingService;
}());
exports.GeocodingService = GeocodingService;
//# sourceMappingURL=geocoding.service.js.map