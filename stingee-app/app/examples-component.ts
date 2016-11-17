import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
    selector: 'demo-app',
    templateUrl: './app/examples.component.html',
    styleUrls: ['./app/examples.component.css']
})
export class ExamplesComponent implements OnInit{
    constructor(
        private location: Location
    ) { }
    ngOnInit(): void {
    }
    goBack(): void {
        this.location.back();
    }
}
