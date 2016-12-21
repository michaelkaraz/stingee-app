import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { HomeComponent } from './home.component';
import { MapExampleComponent } from './map-example.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './spinner.component'; 
import { AgmCoreModule } from 'angular2-google-maps/core';

// Directives.
import { GoogleMapDirective } from './google-map.directive';
import { GoogleMapMarkerDirective } from './google-map-marker.directive';
// Services.
import { MapsService } from './maps.service';
import { GeolocationService } from './geolocation.service';
import { GeocodingService } from './geocoding.service';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        MdlModule,
        AppRoutingModule,
        InfiniteScrollModule,
        MasonryModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCw0ESOXX4AU1tVfAZXPpMXWElwSmVIdQ0'
        })
    ],
    declarations: [
        AppComponent,
        VouchersComponent,
        VoucherDetailComponent,
        ExamplesComponent,
        HomeComponent,
        MapExampleComponent,
        SpinnerComponent,
        GoogleMapDirective,
        GoogleMapMarkerDirective
    ],
    bootstrap: [AppComponent],
    providers: [
        VoucherService,
        MapsService,
        GeolocationService,
        GeocodingService
    ]
})
export class AppModule { }
