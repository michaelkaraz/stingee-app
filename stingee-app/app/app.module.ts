import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdlModule } from 'angular2-mdl';
import { AppComponent } from './app.component';

import { VouchersComponent } from './vouchers.component';
import { VoucherDetailComponent } from './voucher-detail.component';
import { ExamplesComponent } from './examples-component';
import { VoucherService } from './voucher.service';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MdlModule,
        AppRoutingModule
        
    
    ],
    declarations: [AppComponent, VouchersComponent, VoucherDetailComponent, ExamplesComponent],
    bootstrap: [AppComponent],
    providers: [VoucherService]
})
export class AppModule { }
