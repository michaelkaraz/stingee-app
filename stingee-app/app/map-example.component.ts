import { Component, OnInit, Pipe } from '@angular/core';
import { Location } from '@angular/common';
import { Voucher } from './voucher';
import { Special } from './special';
import { MapsService } from './maps.service';
import { GeolocationService } from './geolocation.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VoucherService } from './voucher.service';
import { Geolocation } from './geolocation';
import { GeocodingService } from './geocoding.service';
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
    templateUrl: './app/map-example.component.html',
    styleUrls: ['./app/map-example.component.css']
})
export class MapExampleComponent implements OnInit {
    geo: any;
    public isRequesting: boolean;
    vouchers: Voucher[];
    specials: Special[];
    selectedVoucher: Voucher;
    array = [];
    sum = 80;
    specialsCounter = 20;
    // Center map. Required.
    center: google.maps.LatLng;

    // MapOptions object specification.

    // The initial map zoom level. Required.
    zoom: number;

    disableDefaultUI: boolean;
    disableDoubleClickZoom: boolean;
    mapTypeId: google.maps.MapTypeId;
    maxZoom: number;
    minZoom: number;
    styles: Array<google.maps.MapTypeStyle>;

    // Marker position. Required.
    position: google.maps.LatLng;

    // Marker title.
    title: string;

    // Info window.
    content: string;

    // Address to be searched.
    address: string;

    // Warning flag & message.
    warning: boolean;
    message: string;

    constructor(
        public maps: MapsService,
        private vourcherService: VoucherService,
        private geolocation: GeolocationService,
        private geocoding: GeocodingService,
        private location: Location,
        private sanitizer: DomSanitizer

    ) {
        //debugger;
        // Sets initial center map.
        this.center = new google.maps.LatLng(41.910943, 12.476358);

        // Sets the initial zoom.
        this.zoom = 4;

        // Other options.
        this.disableDefaultUI = true;
        this.disableDoubleClickZoom = false;
        this.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.maxZoom = 15;
        this.minZoom = 4;
        // Styled Maps: https://developers.google.com/maps/documentation/javascript/styling
        // You can use the Styled Maps Wizard: http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html 
        this.styles = [
            {
                featureType: 'landscape',
                stylers: [
                    { color: '#ffffff' }
                ]
            }
        ];

        // Initially the marker isn't set.

        // Clears the search string.
        this.address = "";

        this.warning = false;
        this.message = "";
        //for (let i = 0; i < this.sum; ++i) {
        //    this.array.push(i);
        //}
    }


    ngOnInit(): void {
        //this.geolocation.getCurrentPosition().subscribe(
        //    data => {
        //        //debugger;

        //        this.geo = data;
        //        this.getSpecialsByLonglat(35.1747522, 33.3480448,20);
        //        //this.getSpecialsByLonglat(this.geo.coords.latitude, this.geo.coords.longitude);
        //    },
        //    error => { alert(error) },
        //    () => {
        //        console.log(this.geo);
        //    }
        //);

        //  this.getCurrentPosition();
    }

    private stopRefreshing() {
        this.isRequesting = false;
    }

    public getSpecialsByLonglat(x: any, y: any, count: number): void {
        this.isRequesting = true;
        this.vourcherService.getSpecialsByLonglat(x, y, count)
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
        this.getSpecialsByLonglat(35.1747522, 33.3480448, this.specialsCounter);
        console.log('scrolled!!' + start + " pecialsCounter " + this.specialsCounter);
    }

    // Tries to get the current position.
    getCurrentPosition() {
        //debugger;
        this.warning = false;
        this.message = "";

        if (navigator.geolocation) {
            //debugger;
            // Gets the current position.
            this.geolocation.getCurrentPosition().forEach(

                // Next.
                (position: Position) => {
                    //debugger;
                    if (this.center.lat() != position.coords.latitude && this.center.lng() != position.coords.longitude) {

                        // Sets the new center map & zoom.
                        // New center object: triggers OnChanges.
                        this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        this.zoom = 11;

                        // Translates the location into address.
                        this.geocoding.geocode(this.center).forEach(

                            // Next.
                            (results: google.maps.GeocoderResult[]) => {
                                //debugger;
                                // Sets the marker to the center map.
                                this.setMarker(this.center, "your locality", results[0].formatted_address,);

                            }, null

                        ).then(() => console.log('Geocoding service: completed.'));

                    }

                }, null

            ).then(() => console.log('Geolocation service: completed.')).catch(

                (error: PositionError) => {

                    if (error.code > 0) {

                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                this.message = 'permission denied';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                this.message = 'position unavailable';
                                break;
                            case error.TIMEOUT:
                                this.message = 'position timeout';
                                break;
                        }

                        this.warning = true;

                    }

                });

        } else {

            // Browser doesn't support geolocation.
            this.message = "browser doesn't support geolocation";
            this.warning = true;

        }

    }

    // Searches the address. 
    search(address: string) {

        if (address != "") {

            this.warning = false;
            this.message = "";

            // Converts the address into geographic coordinates.
            this.geocoding.codeAddress(address).forEach(

                // Next.
                (results: google.maps.GeocoderResult[]) => {

                    if (!this.center.equals(results[0].geometry.location)) {

                        // Sets the new center map & zoom.
                        // New center object: triggers OnChanges.                       
                        this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        this.zoom = 11;
                        debugger;                        
                        var dist = this.geocoding.lineOfSightDistanceCalc(-26.146705, 28.187735,results[0].geometry.location.lat(), results[0].geometry.location.lng(),'K');
                        
// Sets the marker to the center map.
                        this.setMarker(this.center, "search result", results[0].formatted_address);
                        debugger;
                    }

                }, null

            ).then(

                () => {

                    // Clears the search string.
                    this.address = "";

                    console.log('Geocoding service: completed.');

                }

                ).catch(

                (status: google.maps.GeocoderStatus) => {

                    // Zero results.
                    if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {

                        this.message = "zero results";
                        this.warning = true;

                    }

                });

        }

    }

    // Sets the marker & the info window.
    setMarker(latLng: google.maps.LatLng, title: string, content: string) {

        // Removes all markers.
        this.maps.deleteMarkers();

        // Sets the marker.
        this.position = latLng;
        this.title = title;
        // Sets the info window.
        this.content = content;

    }



}
