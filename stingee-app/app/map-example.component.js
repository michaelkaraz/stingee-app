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
var common_1 = require('@angular/common');
var maps_service_1 = require('./maps.service');
var geolocation_service_1 = require('./geolocation.service');
var platform_browser_1 = require('@angular/platform-browser');
var voucher_service_1 = require('./voucher.service');
var geocoding_service_1 = require('./geocoding.service');
var Safe = (function () {
    function Safe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    Safe.prototype.transform = function (style) {
        return this.sanitizer.bypassSecurityTrustStyle(style);
        // return this.sanitizer.bypassSecurityTrustHtml(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    };
    Safe = __decorate([
        core_1.Pipe({ name: 'safe' }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], Safe);
    return Safe;
}());
exports.Safe = Safe;
var MapExampleComponent = (function () {
    function MapExampleComponent(maps, vourcherService, geolocation, geocoding, location, sanitizer) {
        this.maps = maps;
        this.vourcherService = vourcherService;
        this.geolocation = geolocation;
        this.geocoding = geocoding;
        this.location = location;
        this.sanitizer = sanitizer;
        this.array = [];
        this.sum = 80;
        this.specialsCounter = 20;
        //debugger;
        // Sets initial center map.
        this.center = new google.maps.LatLng(41.910943, 12.476358);
        // Sets the initial zoom.
        this.zoom = 4;
        // Other options.
        this.disableDefaultUI = true;
        this.disableDoubleClickZoom = false;
        this.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.maxZoom = 15;
        this.minZoom = 4;
        // Styled Maps: https://developers.google.com/maps/documentation/javascript/styling
        // You can use the Styled Maps Wizard: http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html 
        this.styles = [
            {
                featureType: 'landscape',
                stylers: [
                    { color: '#ffffff' }
                ]
            }
        ];
        // Initially the marker isn't set.
        // Clears the search string.
        this.address = "";
        this.warning = false;
        this.message = "";
        //for (let i = 0; i < this.sum; ++i) {
        //    this.array.push(i);
        //}
    }
    MapExampleComponent.prototype.ngOnInit = function () {
        //this.geolocation.getCurrentPosition().subscribe(
        //    data => {
        //        //debugger;
        //        this.geo = data;
        //        this.getSpecialsByLonglat(35.1747522, 33.3480448,20);
        //        //this.getSpecialsByLonglat(this.geo.coords.latitude, this.geo.coords.longitude);
        //    },
        //    error => { alert(error) },
        //    () => {
        //        console.log(this.geo);
        //    }
        //);
        //  this.getCurrentPosition();
    };
    MapExampleComponent.prototype.stopRefreshing = function () {
        this.isRequesting = false;
    };
    MapExampleComponent.prototype.getSpecialsByLonglat = function (x, y, count) {
        var _this = this;
        this.isRequesting = true;
        this.vourcherService.getSpecialsByLonglat(x, y, count)
            .subscribe(function (data) {
            //debugger;
            _this.specials = data;
            for (var _i = 0, _a = _this.specials; _i < _a.length; _i++) {
                var entry = _a[_i];
                //debugger;
                entry.image320 = _this.sanitizer.bypassSecurityTrustUrl(entry.image320);
                entry.image100 = _this.sanitizer.bypassSecurityTrustUrl(entry.image100);
                entry.image600 = _this.sanitizer.bypassSecurityTrustUrl(entry.image600);
            }
        }, function (error) { alert(error); }, function () {
            console.log("finished succesfully total collected: " + _this.specials.length);
            _this.stopRefreshing();
        });
    };
    MapExampleComponent.prototype.getVouchers = function () {
        var _this = this;
        this.vourcherService.getTopXVouchers(5).then(function (vouchers) { return _this.vouchers = vouchers; });
    };
    MapExampleComponent.prototype.onSelect = function (voucher) {
        this.selectedVoucher = voucher;
    };
    //back nav
    MapExampleComponent.prototype.goBack = function () {
        this.location.back();
    };
    //spinner
    MapExampleComponent.prototype.onScrollDown = function () {
        // add another 20 items
        var start = this.sum;
        this.sum += 20;
        this.specialsCounter += 20;
        //for (let i = start; i < this.sum; ++i) {
        //    this.array.push(i);
        //}
        this.getSpecialsByLonglat(35.1747522, 33.3480448, this.specialsCounter);
        console.log('scrolled!!' + start + " pecialsCounter " + this.specialsCounter);
    };
    // Tries to get the current position.
    MapExampleComponent.prototype.getCurrentPosition = function () {
        var _this = this;
        //debugger;
        this.warning = false;
        this.message = "";
        if (navigator.geolocation) {
            //debugger;
            // Gets the current position.
            this.geolocation.getCurrentPosition().forEach(
            // Next.
            function (position) {
                //debugger;
                if (_this.center.lat() != position.coords.latitude && _this.center.lng() != position.coords.longitude) {
                    // Sets the new center map & zoom.
                    // New center object: triggers OnChanges.
                    _this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    _this.zoom = 11;
                    // Translates the location into address.
                    _this.geocoding.geocode(_this.center).forEach(
                    // Next.
                    function (results) {
                        //debugger;
                        // Sets the marker to the center map.
                        _this.setMarker(_this.center, "your locality", results[0].formatted_address);
                    }, null).then(function () { return console.log('Geocoding service: completed.'); });
                }
            }, null).then(function () { return console.log('Geolocation service: completed.'); }).catch(function (error) {
                if (error.code > 0) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            _this.message = 'permission denied';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            _this.message = 'position unavailable';
                            break;
                        case error.TIMEOUT:
                            _this.message = 'position timeout';
                            break;
                    }
                    _this.warning = true;
                }
            });
        }
        else {
            // Browser doesn't support geolocation.
            this.message = "browser doesn't support geolocation";
            this.warning = true;
        }
    };
    // Searches the address. 
    MapExampleComponent.prototype.search = function (address) {
        var _this = this;
        if (address != "") {
            this.warning = false;
            this.message = "";
            // Converts the address into geographic coordinates.
            this.geocoding.codeAddress(address).forEach(
            // Next.
            function (results) {
                if (!_this.center.equals(results[0].geometry.location)) {
                    // Sets the new center map & zoom.
                    // New center object: triggers OnChanges.                       
                    _this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    _this.zoom = 11;
                    debugger;
                    var dist = _this.geocoding.lineOfSightDistanceCalc(-26.146705, 28.187735, results[0].geometry.location.lat(), results[0].geometry.location.lng(), 'K');
                    // Sets the marker to the center map.
                    _this.setMarker(_this.center, "search result", results[0].formatted_address);
                    debugger;
                }
            }, null).then(function () {
                // Clears the search string.
                _this.address = "";
                console.log('Geocoding service: completed.');
            }).catch(function (status) {
                // Zero results.
                if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                    _this.message = "zero results";
                    _this.warning = true;
                }
            });
        }
    };
    // Sets the marker & the info window.
    MapExampleComponent.prototype.setMarker = function (latLng, title, content) {
        // Removes all markers.
        this.maps.deleteMarkers();
        // Sets the marker.
        this.position = latLng;
        this.title = title;
        // Sets the info window.
        this.content = content;
    };
    MapExampleComponent = __decorate([
        core_1.Component({
            selector: 'vouchers-app',
            templateUrl: './app/map-example.component.html',
            styleUrls: ['./app/map-example.component.css']
        }), 
        __metadata('design:paramtypes', [maps_service_1.MapsService, voucher_service_1.VoucherService, geolocation_service_1.GeolocationService, geocoding_service_1.GeocodingService, common_1.Location, platform_browser_1.DomSanitizer])
    ], MapExampleComponent);
    return MapExampleComponent;
}());
exports.MapExampleComponent = MapExampleComponent;
//# sourceMappingURL=map-example.component.js.map