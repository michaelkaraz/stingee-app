import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VouchersComponent } from './vouchers.component';
import { VoucherDetailComponent } from './voucher-detail.component';
import { ExamplesComponent } from './examples-component';
import { VoucherService } from './voucher.service';
const routes: Routes = [
    { path: '', redirectTo: '/vouchers', pathMatch: 'full' },
    { path: 'detail/:id', component: VoucherDetailComponent },
    { path: 'vouchers', component: VouchersComponent },
    { path: 'examples', component: ExamplesComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
