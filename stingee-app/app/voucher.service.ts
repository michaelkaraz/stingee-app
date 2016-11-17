import { Injectable } from '@angular/core';
import { Voucher } from './voucher';
import { VOUCHERS } from './mock-vouchers';
@Injectable()
export class VoucherService {


    getVoucher(id: number): Promise<Voucher> {
        return this.getVouchers()
            .then(vouchers => vouchers.find(voucher => voucher.id === id));
    }

    getVouchers(): Promise<Voucher[]> {
        return Promise.resolve(VOUCHERS);
    } 
    getTopXVouchers(num :number): Promise<Voucher[]> {
        return Promise.resolve(VOUCHERS.slice(0,num));
    } 
}
