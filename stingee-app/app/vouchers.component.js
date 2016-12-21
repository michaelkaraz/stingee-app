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
var specialtype_1 = require('./specialtype');
var platform_browser_1 = require('@angular/platform-browser');
var voucher_service_1 = require('./voucher.service');
var geocoding_service_1 = require('./geocoding.service');
var geolocation_service_1 = require('./geolocation.service');
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
var VouchersComponent = (function () {
    function VouchersComponent(maps, vourcherService, geolocation, geocoding, location, sanitizer) {
        this.maps = maps;
        this.vourcherService = vourcherService;
        this.geolocation = geolocation;
        this.geocoding = geocoding;
        this.location = location;
        this.sanitizer = sanitizer;
        this.array = [];
        this.sum = 80;
        this.specialsCounter = 20;
        // Sets initial center map.
        //this.center = new google.maps.LatLng(35.1747522, 33.3480448);
        //for (let i = 0; i < this.sum; ++i) {
        //    this.array.push(i);
        //}
    }
    VouchersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTypes();
        this.geolocation.getCurrentPosition().subscribe(function (data) {
            //debugger;
            _this.geo = data;
            // this.center = new google.maps.LatLng(this.geo.coords.latitude, this.geo.coords.longitude);
            _this.center = new google.maps.LatLng(35.1747522, 33.3480448);
            _this.getLocationDetails(_this.center);
            _this.getSpecialsByLonglat(35.1747522, 33.3480448, 20, null);
            //this.getSpecialsByLonglat(this.geo.coords.latitude, this.geo.coords.longitude);
        }, function (error) { alert(error); }, function () {
            console.log(_this.geo);
        });
        //  this.getCurrentPosition();
    };
    VouchersComponent.prototype.getTypeCallback = function (type) {
        for (var _i = 0, _a = this.specialTypes; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.code === type) {
                if (entry.isActive === false)
                    entry.isActive = true;
                else
                    entry.isActive = false;
            }
        }
        this.getSpecialsByLonglat(35.1747522, 33.3480448, 20, this.specialTypes);
        //this.getSpecialsByLonglat(this.geo.coords.latitude, this.geo.coords.longitude);
    };
    VouchersComponent.prototype.stopRefreshing = function () {
        this.isRequesting = false;
    };
    VouchersComponent.prototype.getTypes = function () {
        var _this = this;
        this.vourcherService.getTypes()
            .subscribe(function (data) {
            if (data) {
                _this.specialTypes = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var val = data[key];
                        var st = new specialtype_1.SpecialType();
                        st.code = key;
                        st.name = val;
                        st.isActive = false;
                        _this.specialTypes.push(st);
                    }
                }
            }
        });
    };
    VouchersComponent.prototype.getSpecialsByLonglat = function (x, y, count, sp) {
        var _this = this;
        this.isRequesting = true;
        this.vourcherService.getSpecialsByLonglat(x, y, count, sp)
            .subscribe(function (data) {
            //debugger;
            _this.specials = data;
            for (var _i = 0, _a = _this.specials; _i < _a.length; _i++) {
                var entry = _a[_i];
                //debugger;
                entry.image320 = _this.sanitizer.bypassSecurityTrustUrl(entry.image320);
                entry.image100 = _this.sanitizer.bypassSecurityTrustUrl(entry.image100);
                entry.image600 = _this.sanitizer.bypassSecurityTrustUrl(entry.image600);
                entry.distance = _this.geocoding
                    .lineOfSightDistanceCalc(35.1747522, 33.3480448, entry.latitude, entry.longitude, '');
            }
        }, function (error) { alert(error); }, function () {
            console.log("finished succesfully total collected: " + _this.specials.length);
            _this.stopRefreshing();
        });
    };
    VouchersComponent.prototype.getVouchers = function () {
        var _this = this;
        this.vourcherService.getTopXVouchers(5).then(function (vouchers) { return _this.vouchers = vouchers; });
    };
    VouchersComponent.prototype.onSelect = function (voucher) {
        this.selectedVoucher = voucher;
    };
    //back nav
    VouchersComponent.prototype.goBack = function () {
        this.location.back();
    };
    //spinner
    VouchersComponent.prototype.onScrollDown = function () {
        // add another 20 items
        var start = this.sum;
        this.sum += 20;
        this.specialsCounter += 20;
        //for (let i = start; i < this.sum; ++i) {
        //    this.array.push(i);
        //}
        this.getSpecialsByLonglat(35.1747522, 33.3480448, this.specialsCounter, this.specialTypes);
        console.log('scrolled!!' + start + " pecialsCounter " + this.specialsCounter);
    };
    VouchersComponent.prototype.getLocationDetails = function (position) {
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
    VouchersComponent = __decorate([
        core_1.Component({
            selector: 'vouchers-app',
            templateUrl: './app/vouchers.component.html',
            styleUrls: ['./app/vouchers.component.css']
        }), 
        __metadata('design:paramtypes', [maps_service_1.MapsService, voucher_service_1.VoucherService, geolocation_service_1.GeolocationService, geocoding_service_1.GeocodingService, common_1.Location, platform_browser_1.DomSanitizer])
    ], VouchersComponent);
    return VouchersComponent;
}());
exports.VouchersComponent = VouchersComponent;
//# sourceMappingURL=vouchers.component.js.map