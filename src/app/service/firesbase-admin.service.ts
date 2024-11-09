import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserDetails } from "../model/user-details.model";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";

@Injectable({
    providedIn: 'root'
})
export class FirebaseAdminService {
    cityList: AngularFireList<UserDetails>;
    users: any[];

    constructor(private db: AngularFireDatabase) {}

    getAllCity() {
        this.cityList = this.db.list('cities');
    }

    getAllCity2() {
        return this.db.list('cities');
    }

    addCity(newCity: FormGroup) {
        this.cityList.push(newCity.value);
    }

    updateCity(key: string, upadatedCityData: FormGroup) {
        return this.db.list('cities').update(key, upadatedCityData.value)
    }

    deleteCity(key: string) {
        this.db.list('cities').remove(key)
    }
}
