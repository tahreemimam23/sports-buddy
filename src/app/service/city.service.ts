import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseApi = "http://localhost:3000/cities"
  constructor(private http: HttpClient) { }

  //return all data via get method
  getAllCity() {
    return this.http.get<any[]>(this.baseApi)
  }

  getCityById(id: any) {
    return this.http.get<any>(this.baseApi + '/' + id);
  }

  addNewCity(newCityData: FormGroup) {
    return this.http.post<any>(this.baseApi, newCityData.value);
  }

  updateCity(id: any, updatedCityData: FormGroup) {
    return this.http.put<any>(this.baseApi + '/' + id, updatedCityData.value)
  }

  deleteCity(id: any) {
    return this.http.delete<any>(this.baseApi + '/' + id)
  }
}
