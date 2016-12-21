/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */

import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

/**
 * GeocodingService class.
 * https://developers.google.com/maps/documentation/javascript/
 * 
 * @author Roberto Simonetti
 */
@Injectable() export class GeocodingService {

    /**
     * Geocoder.
     */
    geocoder: google.maps.Geocoder;

    constructor() {

        this.geocoder = new google.maps.Geocoder();

    }

    /**
     * Reverse geocoding by location.
     * 
     * Wraps the Google Maps API geocoding service into an observable.
     * 
     * @param latLng Location
     * @return An observable of GeocoderResult
     */
    geocode(latLng: google.maps.LatLng) {

        return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'location': latLng }, (

                // Results & status.
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {

                    if (status === google.maps.GeocoderStatus.OK) {

                        observer.next(results);
                        observer.complete();

                    } else {

                        console.log('Geocoding service: geocoder failed due to: ' + status);

                        observer.error(status);

                    }

                })

            );

        });

    }

    /**
     * Geocoding services.
     * 
     * Wraps the Google Maps API geocoding service into an observable.
     * 
     * @param address The address to be searched
     * @return An observable of GeocoderResult
     */
    codeAddress(address: string) {

        return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {

            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ 'address': address }, (

                // Results & status.
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {

                    if (status === google.maps.GeocoderStatus.OK) {

                        observer.next(results);
                        observer.complete();

                    } else {

                        console.log('Geocoding service: geocode was not successful for the following reason: ' + status);

                        observer.error(status);

                    }

                })

            );

        });

    }
    ///Use K for kilometers N for nautical miles and nothing for miles
    lineOfSightDistanceCalc(lat1: number, lon1: number, lat2: number, lon2: number, unit:string): number {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") {
            dist = dist * 1.609344;
        }
        if (unit === "N") {
            dist = dist * 0.8684;
        }
        return Math.round(dist) ;
    }
}
