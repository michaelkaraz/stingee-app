import { Component, OnInit, Pipe } from '@angular/core';
import { Location } from '@angular/common';
import { Voucher } from './voucher';
import { Special } from './special';
import { GeolocationService } from './geolocation.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VoucherService } from './voucher.service';
import { Geolocation } from './geolocation';
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

    constructor(
        private vourcherService: VoucherService,
        private geolocationService: GeolocationService,
        private location: Location,
        private sanitizer: DomSanitizer
    ) {

        for (let i = 0; i < this.sum; ++i) {
            this.array.push(i);
        }
    }
    geo: any;
    public isRequesting: boolean;
    ngOnInit(): void {
        this.geolocationService.getCurrentPosition().subscribe(
            data => {
                //debugger;
                this.geo = data;
                this.getSpecialsByLonglat(35.1747522, 33.3480448,20);
                //this.getSpecialsByLonglat(this.geo.coords.latitude, this.geo.coords.longitude);
            },
            error => { alert(error) },
            () => {
                console.log(this.geo);
            }
        );
    }


    private stopRefreshing() {
        this.isRequesting = false;
    }

    public getSpecialsByLonglat(x: any, y: any,count:number): void {
        this.isRequesting = true;
        this.vourcherService.getSpecialsByLonglat(x, y,count)
            .subscribe(
            data => {
                //debugger;
                this.specials = data;
                for (let entry of this.specials) {
                    //debugger;
                    entry.image320 = this.sanitizer.bypassSecurityTrustUrl(entry.image320);
                    entry.image100 = this.sanitizer.bypassSecurityTrustUrl(entry.image100);
                    entry.image600 = this.sanitizer.bypassSecurityTrustUrl(entry.image600);
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

    vouchers: Voucher[];
    specials: Special[];

    selectedVoucher: Voucher;

    onSelect(voucher: Voucher): void {
        this.selectedVoucher = voucher;
    }

    goBack(): void {
        this.location.back();
    }
    array = [];
    sum = 80;
    specialsCounter = 20;

    onScrollDown() {
        

        // add another 20 items
        const start = this.sum;
        this.sum += 20;
        this.specialsCounter += 20;
        for (let i = start; i < this.sum; ++i) {
            this.array.push(i);
        }
        this.getSpecialsByLonglat(35.1747522, 33.3480448, this.specialsCounter);
        console.log('scrolled!!' + start + " pecialsCounter " + this.specialsCounter);
    }

}
