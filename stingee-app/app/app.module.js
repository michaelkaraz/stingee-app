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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll');
var http_1 = require('@angular/http');
var angular2_mdl_1 = require('angular2-mdl');
var app_component_1 = require('./app.component');
var angular2_masonry_1 = require('angular2-masonry');
var vouchers_component_1 = require('./vouchers.component');
var voucher_detail_component_1 = require('./voucher-detail.component');
var examples_component_1 = require('./examples-component');
var voucher_service_1 = require('./voucher.service');
var geolocation_service_1 = require('./geolocation.service');
var home_component_1 = require('./home.component');
var app_routing_module_1 = require('./app-routing.module');
var spinner_component_1 = require('./spinner.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                angular2_mdl_1.MdlModule,
                app_routing_module_1.AppRoutingModule,
                angular2_infinite_scroll_1.InfiniteScrollModule,
                angular2_masonry_1.MasonryModule
            ],
            declarations: [app_component_1.AppComponent, vouchers_component_1.VouchersComponent, voucher_detail_component_1.VoucherDetailComponent, examples_component_1.ExamplesComponent, home_component_1.HomeComponent, spinner_component_1.SpinnerComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [voucher_service_1.VoucherService, geolocation_service_1.GeolocationService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map