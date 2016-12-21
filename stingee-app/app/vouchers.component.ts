import { Component, OnInit, Pipe } from '@angular/core';
import { Location } from '@angular/common';
import { Voucher } from './voucher';
import { Special } from './special';
import { MapsService } from './maps.service';

import { SpecialType } from './specialtype';
import { SpecialTypeCollection } from './specialtypeCollection';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VoucherService } from './voucher.service';
import { Geolocation } from './geolocation';
import { GeocodingService } from './geocoding.service';
import { GeolocationService } from './geolocation.service';
import { SpinnerComponent } from './spinner.component';

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
    selector: 'vouchers-app',
    templateUrl: './app/vouchers.component.html',
    styleUrls: ['./app/vouchers.component.css']
})
export class VouchersComponent implements OnInit {
    specialTypes: SpecialType[];
    public isRequesting: boolean;
    vouchers: Voucher[];
    specials: Special[];
    selectedVoucher: Voucher;
    array = [];
    sum = 80;
    specialsCounter = 20;
    title:string;
    //google vars
    // Center map. Required.
    geo: any;
    center: google.maps.LatLng;
    

    constructor(
        public maps: MapsService,
        private vourcherService: VoucherService,
        private geolocation: GeolocationService,
        private geocoding: GeocodingService,
        private location: Location,
        private sanitizer: DomSanitizer

    ) {
        // Sets initial center map.
        //this.center = new google.maps.LatLng(35.1747522, 33.3480448);
        //for (let i = 0; i < this.sum; ++i) {
        //    this.array.push(i);
        //}
    }

    
    ngOnInit(): void {

        this.getTypes();
        this.geolocation.getCurrentPosition().subscribe(
            data => {
                //debugger;
               
                this.geo = data;
               // this.center = new google.maps.LatLng(this.geo.coords.latitude, this.geo.coords.longitude);
                this.center = new google.maps.LatLng(35.1747522, 33.3480448);
                this.getLocationDetails(this.center);
                this.getSpecialsByLonglat(35.1747522, 33.3480448,20,null);
                //this.getSpecialsByLonglat(this.geo.coords.latitude, this.geo.coords.longitude);
               
            },
            error => { alert(error) },
            () => {
                console.log(this.geo);
            }
        );

      //  this.getCurrentPosition();
    }

    public getTypeCallback(type: string) {
        for (let entry of this.specialTypes) {
            if (entry.code === type) {
                if(entry.isActive === false)
                    entry.isActive = true;
                else 
                    entry.isActive = false;
            }
        }

        this.getSpecialsByLonglat(35.1747522, 33.3480448, 20,this.specialTypes);
         //this.getSpecialsByLonglat(this.geo.coords.latitude, this.geo.coords.longitude);
        
    }

    private stopRefreshing() {
        this.isRequesting = false;
    }
    public getTypes(): void {
          this.vourcherService.getTypes()
              .subscribe(data => {
                  if (data) {
                      this.specialTypes = [];
                      for (var key in data) {
                          if (data.hasOwnProperty(key)) {
                              var val = data[key];
                              var st = new SpecialType();
                              st.code = key;
                              st.name = val;
                              st.isActive = false;
                              this.specialTypes.push(st);
                          }
                      }
                  }
              });
    }

    public getSpecialsByLonglat(x: any, y: any,count:number,sp:SpecialType[]): void {
        this.isRequesting = true;
        this.vourcherService.getSpecialsByLonglat(x, y, count, sp)
            .subscribe(
            data => {
                //debugger;
                this.specials = data;
                for (let entry of this.specials) {
                    //debugger;
                    entry.image320 = this.sanitizer.bypassSecurityTrustUrl(entry.image320);
                    entry.image100 = this.sanitizer.bypassSecurityTrustUrl(entry.image100);
                    entry.image600 = this.sanitizer.bypassSecurityTrustUrl(entry.image600);
                    entry.distance =   this.geocoding
                        .lineOfSightDistanceCalc(35.1747522,
                        33.3480448,
                        entry.latitude,
                        entry.longitude,
                        '');
                }

            },
            error => { alert(error) },
            () => {
                console.log("finished succesfully total collected: " + this.specials.length);
                this.stopRefreshing();
              }
            );
    }

    getVouchers(): void {
        this.vourcherService.getTopXVouchers(5).then(vouchers => this.vouchers = vouchers);
    }


    onSelect(voucher: Voucher): void {
        this.selectedVoucher = voucher;
    }

    //back nav
    goBack(): void {
        this.location.back();
    }

    //spinner
    onScrollDown() {
        

        // add another 20 items
        const start = this.sum;
        this.sum += 20;
        this.specialsCounter += 20;
        //for (let i = start; i < this.sum; ++i) {
        //    this.array.push(i);
        //}
        this.getSpecialsByLonglat(35.1747522, 33.3480448, this.specialsCounter,this.specialTypes);
        console.log('scrolled!!' + start + " pecialsCounter " + this.specialsCounter);
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
