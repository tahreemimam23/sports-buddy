import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from '../../service/city.service';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'cx-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrl: './add-edit-city.component.css'
})
export class AddEditCityComponent implements OnInit {
  createCityForm: FormGroup = new FormGroup({});
  errors: any;
  cities$: Observable<any>;
  isUpdating: boolean = false;

  constructor(private service: CityService, private router: Router) { }
  ngOnInit(): void {
    this.createCityForm.setControl('city', new FormControl('', [Validators.required]));
    this.createCityForm.setControl('id', new FormControl(''));
    this.getCities();
  }

  getCities() {
    this.cities$ = this.service.getAllCity();
  }

  createCity() {
    if (this.createCityForm.valid) {
      const city = this.createCityForm.value.city;
      this.createCityForm.controls['id'].setValue(uuidv4)
      this.createCityForm.controls['city'].setValue(city.charAt(0).toUpperCase() + city.slice(1).toLowerCase())
      this.service.getAllCity().subscribe(
        response => {
          if ((response.filter(result => result.city === this.createCityForm.get('city').value)).length <= 0) {
            this.service.addNewCity(this.createCityForm)
              .subscribe(
                result => {
                  alert("city created successfully")
                },
                error => {
                  this.errors = error;
                  alert("error occured")
                  this.createCityForm.reset();
                },
                () => {
                  this.createCityForm.reset();
                  this.getCities();
                  this.router.navigate['city']
                }
              );
          } else {
            alert("Don't add duplicate city")
          }
        }
      )
    }
  }

  deleteCity(id: string) {
    this.service.deleteCity(id)
      .subscribe(
        result => {
          // Handle result
          alert("city deleted successfully")
        },
        error => {
          alert("Error occured")
        },
        () => {
          this.getCities();
          this.router.navigate['city']
        }
      );
  }

  editCity(id: string) {
    this.isUpdating = true;
    this.service.getCityById(id).subscribe(data => {
      const city: any = data;
      this.createCityForm.controls['id'].setValue(city.id)
      this.createCityForm.controls['city'].setValue(city.city)
    })
  }

  updateCity() {
    const id = this.createCityForm.value.id;
    const city = this.createCityForm.value.city
    this.createCityForm.controls['city'].setValue(city.charAt(0).toUpperCase() + city.slice(1).toLowerCase())
    this.service.updateCity(id, this.createCityForm)
      .subscribe(
        result => {
          // Handle result
          alert("city updated successfully")
        },
        error => {
          this.errors = error;
          alert("Error occured")
          this.isUpdating = false;
          this.createCityForm.reset();
        },
        () => {
          this.isUpdating = false;
          this.createCityForm.reset();
          this.getCities();
          this.router.navigate['city']
        }
      );
  }
}
