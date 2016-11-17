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
var voucher_service_1 = require('./voucher.service');
var VouchersComponent = (function () {
    function VouchersComponent(vourcherService, location) {
        this.vourcherService = vourcherService;
        this.location = location;
    }
    VouchersComponent.prototype.ngOnInit = function () {
        this.getVouchers();
    };
    VouchersComponent.prototype.getVouchers = function () {
        var _this = this;
        this.vourcherService.getTopXVouchers(10).then(function (vouchers) { return _this.vouchers = vouchers; });
    };
    VouchersComponent.prototype.onSelect = function (voucher) {
        this.selectedVoucher = voucher;
    };
    VouchersComponent.prototype.goBack = function () {
        this.location.back();
    };
    VouchersComponent = __decorate([
        core_1.Component({
            selector: 'vouchers-app',
            templateUrl: './app/vouchers.component.html',
            styleUrls: ['./app/vouchers.component.css']
        }), 
        __metadata('design:paramtypes', [voucher_service_1.VoucherService, common_1.Location])
    ], VouchersComponent);
    return VouchersComponent;
}());
exports.VouchersComponent = VouchersComponent;
//# sourceMappingURL=vouchers.component.js.map