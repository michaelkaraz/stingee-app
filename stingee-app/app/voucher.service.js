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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var VoucherService = (function () {
    function VoucherService(http) {
        this.http = http;
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
    VoucherService.prototype.getSpecialsByLonglat = function (x, y, count) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://dev.exeliatech.com:2255/api/get_specials_by_longlat', '{"latitude":' + x + ',"longitude":' + y + ',"limit":' + count + ',"offset":0}', headers)
            .map(function (res) { return res.json(); });
    };
    VoucherService.prototype.getSpecial = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var json = '{"specials_id":"' + id + '"}';
        return this.http.post('http://dev.exeliatech.com:2255/api/get_specials_info', json, headers)
            .map(function (res) { return res.json(); });
    };
    VoucherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VoucherService);
    return VoucherService;
}());
exports.VoucherService = VoucherService;
//# sourceMappingURL=voucher.service.js.map