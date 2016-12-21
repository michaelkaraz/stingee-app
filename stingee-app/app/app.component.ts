import { Component, OnInit } from '@angular/core';
import { MapsService } from './maps.service';
import { GeolocationService } from './geolocation.service';


import { Geolocation } from './geolocation';
import { GeocodingService } from './geocoding.service';

@Component({
    selector: 'demo-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit {
    title: string;
    geo: any;
    center: google.maps.LatLng;
    constructor(
        public maps: MapsService,
        private geolocation: GeolocationService,
        private geocoding: GeocodingService

    ) {
        this.title = "Boob";
    }

    ngOnInit(): void {
        this.geolocation.getCurrentPosition().subscribe(
            data => {
                //debugger;

                this.geo = data;
                this.center = new google.maps.LatLng(this.geo.coords.latitude, this.geo.coords.longitude);
                this.getLocationDetails(this.center);


            },
            error => { alert(error) },
            () => {
                console.log(this.geo);
            }
        );
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
