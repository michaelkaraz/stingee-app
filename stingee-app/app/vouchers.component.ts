import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Voucher } from './voucher';
import { VoucherService } from './voucher.service';
@Component({
    selector: 'vouchers-app',
    templateUrl: './app/vouchers.component.html',
    styleUrls: ['./app/vouchers.component.css']
})
export class VouchersComponent implements OnInit {

    constructor(
        private vourcherService: VoucherService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.getVouchers();
    }

    getVouchers(): void {
        this.vourcherService.getTopXVouchers(10).then(vouchers => this.vouchers = vouchers );
    }

    vouchers : Voucher[];

    selectedVoucher: Voucher;

    onSelect(voucher: Voucher): void {
        this.selectedVoucher = voucher;
    }

    goBack(): void {
        this.location.back();
    }

}
