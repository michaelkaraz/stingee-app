import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VouchersComponent } from './vouchers.component';
import { VoucherDetailComponent } from './voucher-detail.component';
import { ExamplesComponent } from './examples-component';
import { HomeComponent } from './home.component';
import { VoucherService } from './voucher.service';
import { MapExampleComponent } from './map-example.component';
const routes: Routes = [
    { path: '', redirectTo: '/vouchers', pathMatch: 'full' },
    { path: 'about', component: HomeComponent },
    { path: 'map', component: MapExampleComponent },
    { path: 'detail/:id', component: VoucherDetailComponent },
    { path: 'vouchers', component: VouchersComponent },
    { path: 'examples', component: ExamplesComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
