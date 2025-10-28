import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Api } from '../../../core/admin/providers/api/api'


@Injectable()

export class StoresService extends Api {
    sendEditId = new BehaviorSubject(0)
    params: any = {};
    private URL = this.getBaseUrl();

    storeList() {
        return this.http.get(this.URL + '/maps/secure/get-store-list');
    }


    addStore(payload: any) {

        return this.http.post(this.URL + '/maps/secure/save-locations', payload);
    }

    searchLocationWithPinCode(pinCode: number) {
        return this.http.get(this.URL + `/store_state_city_master/get-state-citye-by-pin-code?pincode=${pinCode}`);
    }

    getStoreById(storeId: number) {
        return this.http.get(this.URL + `/maps/secure/get-store-by-id?id=${storeId}`);
    }
    
    updateStore(payload: any) {

        return this.http.post(this.URL + '/maps/secure/update-store', payload);
    }

    stateList() {
        return this.http.get(this.URL + '/zone/zone-all-list');
    }
    

}