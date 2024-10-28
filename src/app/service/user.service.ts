import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseApi = "http://localhost:3000/sports"
  constructor(private http: HttpClient) { }

  //return all data via get method
  getAllSports() {
    return this.http.get<any[]>(this.baseApi)
  }

  getSportById(id: any) {
    return this.http.get<any>(this.baseApi + '/' + id);
  }

  addNewSport(newSportData: FormGroup) {
    return this.http.post<any>(this.baseApi, newSportData.value);
  }

//   updateCity(id: any, updatedCityData: FormGroup) {
//     return this.http.put<any>(this.baseApi + '/' + id, updatedCityData.value)
//   }

  deleteSport(id: any) {
    return this.http.delete<any>(this.baseApi + '/' + id)
  }
}
