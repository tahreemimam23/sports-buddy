import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class AreaService {
    baseApi = "http://localhost:3000/areas"
    constructor(private http: HttpClient) { }

    //return all data via get method
    getAllArea() {
        return this.http.get<any[]>(this.baseApi)
    }

    getAreaById(id: any) {
        return this.http.get<any>(this.baseApi + '/' + id);
    }

    addNewArea(newAreaData: FormGroup) {
        return this.http.post<any>(this.baseApi, newAreaData.value);
    }

    updateArea(id: any, updatedAreaData: FormGroup) {
        return this.http.put<any>(this.baseApi + '/' + id, updatedAreaData.value)
    }

    deleteArea(id: any) {
        return this.http.delete<any>(this.baseApi + '/' + id)
    }
}