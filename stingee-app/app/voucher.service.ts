import { Injectable } from '@angular/core';
import { Voucher } from './voucher';
import { VOUCHERS } from './mock-vouchers';
import { SpecialType } from './specialtype';

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

    getTypes() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(
            'http://dev.exeliatech.com:2256/api/get_types',
            headers)
            .map((res: Response) => res.json());
    }

    getSpecialsByLonglat(x: any, y: any, count: number, st: SpecialType[]) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //debugger;
        if (st!=null) {
            //multiple
            //{ "latitude":35.1747522, "longitude":33.3480448, "limit":20, "offset":0, "types":["Coupon", "InStore"] }
            //single
            //{"latitude":35.1747522,"longitude":33.3480448,"limit":20,"offset":0,"types":"Coupon"}
            var result = st.filter(item => item.isActive === true);
            if (result.length > 1) {
                //multiple
                var search = "";
                for (let entry of result) {
                    search += '"'+entry.code+'",';
                }
                search = search.substring(0, search.length - 1);
                //debugger;
                return this.http.post(
                    'http://dev.exeliatech.com:2256/api/get_specials_by_longlat',
                    '{"latitude":' + x + ',"longitude":' + y + ',"limit":' + count + ',"offset":0,"types":[' + search+']}',
                    headers)
                    .map((res: Response) => res.json());
            } else if (result.length === 0) {
                return this.http.post(
                    'http://dev.exeliatech.com:2256/api/get_specials_by_longlat',
                    '{"latitude":' + x + ',"longitude":' + y + ',"limit":' + count + ',"offset":0}',
                    headers)
                    .map((res: Response) => res.json());
            } else {
                //single
                //debugger;
                return this.http.post(
                    'http://dev.exeliatech.com:2256/api/get_specials_by_longlat',
                    '{"latitude":' + x + ',"longitude":' + y + ',"limit":' + count + ',"offset":0,"types":"'+result[0].code+'"}',
                    headers)
                    .map((res: Response) => res.json());
            }
           
           
        } else {
             return this.http.post(
            'http://dev.exeliatech.com:2256/api/get_specials_by_longlat',
            '{"latitude":' + x + ',"longitude":' + y + ',"limit":' + count + ',"offset":0}',
            headers)
            .map((res: Response) => res.json());
        }
       

    }

    getSpecial(id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        var json = '{"specials_id":"' + id + '"}';
        return this.http.post(
            'http://dev.exeliatech.com:2256/api/get_specials_info',
            json,
            headers)
            .map((res: Response) => res.json());
    }

}
