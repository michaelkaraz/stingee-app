import { Injectable } from '@angular/core';
import { Voucher } from './voucher';
import { VOUCHERS } from './mock-vouchers';


import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/catch';
@Injectable()
export class VoucherService {
    constructor(private http: Http) { }

    getVoucher(id: number): Promise<Voucher> {
        return this.getVouchers()
            .then(vouchers => vouchers.find(voucher => voucher.id === id));
    }

    getVouchers(): Promise<Voucher[]> {
        return Promise.resolve(VOUCHERS);
    }
    getTopXVouchers(num: number): Promise<Voucher[]> {
        return Promise.resolve(VOUCHERS.slice(0, num));
    }


    getSpecialsByLonglat(x: any, y: any, count: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(
            'http://dev.exeliatech.com:2255/api/get_specials_by_longlat',
            '{"latitude":' + x + ',"longitude":' + y + ',"limit":' + count + ',"offset":0}',
            headers)
            .map((res: Response) => res.json());

    }

    getSpecial(id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        var json = '{"specials_id":"' + id + '"}';
        return this.http.post(
            'http://dev.exeliatech.com:2255/api/get_specials_info',
            json,
            headers)
            .map((res: Response) => res.json());
    }

}
