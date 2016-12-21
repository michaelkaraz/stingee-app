import { Component, Input, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SpecialInfo } from './specialInfo';
import { VoucherService } from './voucher.service';
import { Geolocation } from './geolocation';
import { GeocodingService } from './geocoding.service';
import { GeolocationService } from './geolocation.service';
import { SpinnerComponent } from './spinner.component';
//import { FacebookService, FacebookLoginResponse } from 'ng2-facebook-sdk/dist';
@Pipe({ name: 'safe' })
export class Safe {
    constructor(private sanitizer: DomSanitizer) { }
   
    transform(style) {
        return this.sanitizer.bypassSecurityTrustStyle(style);
        // return this.sanitizer.bypassSecurityTrustHtml(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    }
}
@Component({
    selector: 'voucher-detail',
    templateUrl: './app/voucher-detail.component.html',
    styleUrls: ['./app/voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit  {
    //google vars
    // Center map. Required.
    geo: any;
    center: google.maps.LatLng;
    title:string;
    constructor(
        private voucherService: VoucherService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
       // private facebook: FacebookService
        private geolocation: GeolocationService,
        private geocoding: GeocodingService
    ) { }
    private sub: any;
    public isRequesting: boolean;
    private stopRefreshing() {
        this.isRequesting = false;
    }

    //fbFunction(): void {
    //    debugger;
    //    this.facebook.login()
    //        .then(
    //            (response: FacebookLoginResponse) => console.log(response),
    //            (error: any) => console.error(error)
    //        );
    //}

    ngOnInit(): void {
        //debugger;
        
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            this.isRequesting = true;
            let id = params['id'];

            // Retrieve Pet with Id route param
            this.voucherService.getSpecial(id)
            .subscribe(
                special => {
                    //debugger;
                    this.specialInfo = special;
                    //get GPS
                    this.geolocation.getCurrentPosition().subscribe(
                        data => {
                            //debugger;

                            this.geo = data;
                            // this.center = new google.maps.LatLng(this.geo.coords.latitude, this.geo.coords.longitude);
                            //this.center = new google.maps.LatLng(35.1747522, 33.3480448, 20);
                            this.center = new google.maps.LatLng(this.specialInfo.latitude, this.specialInfo.longitude );
                            this.getLocationDetails(this.center);
                            var dist = this.geocoding
                                .lineOfSightDistanceCalc(35.1747522,
                                    33.3480448,
                                    this.specialInfo.latitude,
                                    this.specialInfo.longitude,
                                'K');
                            //alert(dist);
                            //var dist = this.geocoding
                            //    .lineOfSightDistanceCalc(this.geo.coords.latitude,
                            //    this.geo.coords.longitude,
                            //        this.specialInfo.latitude,
                            //        this.specialInfo.longitude,
                            //        'K');
                        },
                        error => { alert(error) },
                        () => {
                            console.log(this.geo);
                        }
                    );
               
                this.specialInfo.image = this.sanitizer.bypassSecurityTrustUrl(this.specialInfo.image);
                    this.specialInfo.image320 = this.sanitizer.bypassSecurityTrustUrl(this.specialInfo.image320);
                this.specialInfo.image100 = this.sanitizer.bypassSecurityTrustUrl(this.specialInfo.image100);
                this.specialInfo.image600 = this.sanitizer.bypassSecurityTrustUrl(this.specialInfo.image600);
                if ((this.specialInfo.store_logo === "") || (this.specialInfo.store_logo === null)) {
                    this.specialInfo.store_logo = null;
                }else
                 this.specialInfo.store_logo = this.sanitizer.bypassSecurityTrustUrl(this.specialInfo.store_logo);
                if ((this.specialInfo.site === "") || (this.specialInfo.site.indexOf('face') >= 0)) {
                    this.specialInfo.siteSafeUrl = null;
                } 
                else
                this.specialInfo.siteSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.specialInfo.site);
                if (this.specialInfo.storeName.indexOf('&') >= 0) {
                    this.specialInfo.storeName = this.specialInfo.storeName.replace('&', '');
                } 
                if (this.specialInfo.address == null) {
                    this.specialInfo.address = "";
                } else {
                    this.specialInfo.address += ",";
                }
               // debugger;
                this.specialInfo
                    .gpsSrc = this.sanitizer.bypassSecurityTrustResourceUrl
                        ("https://www.google.com/maps/embed/v1/place?key=AIzaSyCw0ESOXX4AU1tVfAZXPpMXWElwSmVIdQ0&q=" +
                        this.specialInfo.storeName + "," + this.specialInfo.address + this.specialInfo.country + " " +
                        this.specialInfo.country_code + "&center=" + this.specialInfo.latitude + "," + this.specialInfo.longitude + "&zoom=18 allowfullscreen");
                this.stopRefreshing();
                },
                error => { alert(error) },
                () => {
                    //debugger;
                    console.log("finished succesfully selected special: " + this.specialInfo);
                }
                );
        });

    }


    @Input() specialInfo: SpecialInfo;

    goBack(): void {
        this.location.back();
    }
    getLocationDetails(position: google.maps.LatLng) {

        // Translates the location into address.
        this.geocoding.geocode(position).forEach(

            // Next.
            (results: google.maps.GeocoderResult[]) => {
                //debugger;
                // Sets the marker to the center map.
                this.title = results[0].formatted_address;
                // alert(address);

            }, null

        ).then(() => console.log('Geocoding service: completed.'));

    }
}