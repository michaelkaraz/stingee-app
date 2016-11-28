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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
require('rxjs/add/operator/switchMap');
var platform_browser_1 = require('@angular/platform-browser');
var specialInfo_1 = require('./specialInfo');
var voucher_service_1 = require('./voucher.service');
//import { FacebookService, FacebookLoginResponse } from 'ng2-facebook-sdk/dist';
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
var VoucherDetailComponent = (function () {
    function VoucherDetailComponent(voucherService, route, location, sanitizer //,
        ) {
        this.voucherService = voucherService;
        this.route = route;
        this.location = location;
        this.sanitizer = sanitizer;
    }
    VoucherDetailComponent.prototype.stopRefreshing = function () {
        this.isRequesting = false;
    };
    //fbFunction(): void {
    //    debugger;
    //    this.facebook.login()
    //        .then(
    //            (response: FacebookLoginResponse) => console.log(response),
    //            (error: any) => console.error(error)
    //        );
    //}
    VoucherDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //debugger;
        // Subscribe to route params
        this.sub = this.route.params.subscribe(function (params) {
            _this.isRequesting = true;
            var id = params['id'];
            // Retrieve Pet with Id route param
            _this.voucherService.getSpecial(id)
                .subscribe(function (special) {
                //debugger;
                _this.specialInfo = special;
                _this.specialInfo.image = _this.sanitizer.bypassSecurityTrustUrl(_this.specialInfo.image);
                _this.specialInfo.image320 = _this.sanitizer.bypassSecurityTrustUrl(_this.specialInfo.image320);
                _this.specialInfo.image100 = _this.sanitizer.bypassSecurityTrustUrl(_this.specialInfo.image100);
                _this.specialInfo.image600 = _this.sanitizer.bypassSecurityTrustUrl(_this.specialInfo.image600);
                if ((_this.specialInfo.store_logo === "") || (_this.specialInfo.store_logo === null)) {
                    _this.specialInfo.store_logo = null;
                }
                else
                    _this.specialInfo.store_logo = _this.sanitizer.bypassSecurityTrustUrl(_this.specialInfo.store_logo);
                if ((_this.specialInfo.site === "") || (_this.specialInfo.site.indexOf('face') >= 0)) {
                    _this.specialInfo.siteSafeUrl = null;
                }
                else
                    _this.specialInfo.siteSafeUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.specialInfo.site);
                if (_this.specialInfo.storeName.indexOf('&') >= 0) {
                    _this.specialInfo.storeName = _this.specialInfo.storeName.replace('&', '');
                }
                if (_this.specialInfo.address == null) {
                    _this.specialInfo.address = "";
                }
                else {
                    _this.specialInfo.address += ",";
                }
                _this.specialInfo
                    .gpsSrc = _this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCw0ESOXX4AU1tVfAZXPpMXWElwSmVIdQ0&q=" +
                    _this.specialInfo.storeName + "," + _this.specialInfo.address + _this.specialInfo.country + " " +
                    _this.specialInfo.country_code + "&center=" + _this.specialInfo.latitude + "," + _this.specialInfo.longitude + "&zoom=18 allowfullscreen");
                _this.stopRefreshing();
            }, function (error) { alert(error); }, function () {
                //debugger;
                console.log("finished succesfully selected special: " + _this.specialInfo);
            });
        });
    };
    VoucherDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', specialInfo_1.SpecialInfo)
    ], VoucherDetailComponent.prototype, "specialInfo", void 0);
    VoucherDetailComponent = __decorate([
        core_1.Component({
            selector: 'voucher-detail',
            templateUrl: './app/voucher-detail.component.html',
            styleUrls: ['./app/voucher-detail.component.css']
        }), 
        __metadata('design:paramtypes', [voucher_service_1.VoucherService, router_1.ActivatedRoute, common_1.Location, platform_browser_1.DomSanitizer])
    ], VoucherDetailComponent);
    return VoucherDetailComponent;
}());
exports.VoucherDetailComponent = VoucherDetailComponent;
//# sourceMappingURL=voucher-detail.component.js.map