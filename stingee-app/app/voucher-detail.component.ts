import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Voucher } from './voucher';
import { VoucherService } from './voucher.service';

@Component({
    selector: 'voucher-detail',
    templateUrl: './app/voucher-detail.component.html',
    styleUrls: ['./app/voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit  {
    constructor(
        private voucherService: VoucherService,
        private route: ActivatedRoute,
        private location: Location
    ) { }
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.voucherService.getVoucher(+params['id']))
            .subscribe(voucher => this.voucher = voucher);
    }


    @Input() voucher: Voucher;

    goBack(): void {
        this.location.back();
    }

}