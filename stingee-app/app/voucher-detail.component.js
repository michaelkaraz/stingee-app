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
var voucher_1 = require('./voucher');
var voucher_service_1 = require('./voucher.service');
var VoucherDetailComponent = (function () {
    function VoucherDetailComponent(voucherService, route, location) {
        this.voucherService = voucherService;
        this.route = route;
        this.location = location;
    }
    VoucherDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.voucherService.getVoucher(+params['id']); })
            .subscribe(function (voucher) { return _this.voucher = voucher; });
    };
    VoucherDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', voucher_1.Voucher)
    ], VoucherDetailComponent.prototype, "voucher", void 0);
    VoucherDetailComponent = __decorate([
        core_1.Component({
            selector: 'voucher-detail',
            templateUrl: './app/voucher-detail.component.html',
            styleUrls: ['./app/voucher-detail.component.css']
        }), 
        __metadata('design:paramtypes', [voucher_service_1.VoucherService, router_1.ActivatedRoute, common_1.Location])
    ], VoucherDetailComponent);
    return VoucherDetailComponent;
}());
exports.VoucherDetailComponent = VoucherDetailComponent;
//# sourceMappingURL=voucher-detail.component.js.map