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
var mock_vouchers_1 = require('./mock-vouchers');
var VoucherService = (function () {
    function VoucherService() {
    }
    VoucherService.prototype.getVoucher = function (id) {
        return this.getVouchers()
            .then(function (vouchers) { return vouchers.find(function (voucher) { return voucher.id === id; }); });
    };
    VoucherService.prototype.getVouchers = function () {
        return Promise.resolve(mock_vouchers_1.VOUCHERS);
    };
    VoucherService.prototype.getTopXVouchers = function (num) {
        return Promise.resolve(mock_vouchers_1.VOUCHERS.slice(0, num));
    };
    VoucherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VoucherService);
    return VoucherService;
}());
exports.VoucherService = VoucherService;
//# sourceMappingURL=voucher.service.js.map