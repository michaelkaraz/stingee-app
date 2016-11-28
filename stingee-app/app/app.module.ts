import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { HttpModule } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MdlModule } from 'angular2-mdl';
import { AppComponent } from './app.component';
import { MasonryModule } from 'angular2-masonry';


import { VouchersComponent } from './vouchers.component';
import { VoucherDetailComponent } from './voucher-detail.component';
import { ExamplesComponent } from './examples-component';
import { VoucherService } from './voucher.service';
import { GeolocationService } from './geolocation.service';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './spinner.component'; 


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        MdlModule,
        AppRoutingModule,
        InfiniteScrollModule,
        MasonryModule
    
    ],
    declarations: [AppComponent, VouchersComponent, VoucherDetailComponent, ExamplesComponent, HomeComponent, SpinnerComponent],
    bootstrap: [AppComponent],
    providers: [VoucherService, GeolocationService]
})
export class AppModule { }
