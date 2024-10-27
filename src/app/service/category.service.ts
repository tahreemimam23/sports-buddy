import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    baseApi = "http://localhost:3000/categories"
    constructor(private http: HttpClient) { }

    //return all data via get method
    getAllCategory() {
        return this.http.get<any[]>(this.baseApi)
    }

    getCategoryById(id: any) {
        return this.http.get<any>(this.baseApi + '/' + id);
    }

    addNewCategory(newCategoryData: FormGroup) {
        return this.http.post<any>(this.baseApi, newCategoryData.value);
    }

    updateCategory(id: any, updatedCategoryData: FormGroup) {
        return this.http.put<any>(this.baseApi + '/' + id, updatedCategoryData.value)
    }

    deleteCategory(id: any) {
        return this.http.delete<any>(this.baseApi + '/' + id)
      }
}
