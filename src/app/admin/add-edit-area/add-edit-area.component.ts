import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AreaService } from '../../service/area.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { CityService } from '../../service/city.service';

@Component({
  selector: 'cx-add-edit-area',
  templateUrl: './add-edit-area.component.html',
  styleUrl: './add-edit-area.component.css'
})
export class AddEditAreaComponent implements OnInit {
  createAreaForm: FormGroup = new FormGroup({});
  errors: any;
  areas$: Observable<any>;
  isUpdating: boolean = false;
  cities$:Observable<any>;

  constructor(private service: AreaService,private cityService: CityService, private router: Router) { }
  ngOnInit(): void {
    this.cities$ = this.cityService.getAllCity();
    this.createAreaForm.setControl('area', new FormControl('', [Validators.required]));
    this.createAreaForm.setControl('id', new FormControl(''));
    this.getAllArea();
  }

  getAllArea() {
    this.areas$ = this.service.getAllArea();
  }

  createArea() {
    if (this.createAreaForm.valid) {
      const area = this.createAreaForm.value.area;
      this.createAreaForm.controls['id'].setValue(uuidv4)
      this.createAreaForm.controls['area'].setValue(area.charAt(0).toUpperCase() + area.slice(1).toLowerCase())
      this.service.getAllArea().subscribe(
        response => {
          if ((response.filter(result => result.area === this.createAreaForm.get('area').value)).length <= 0) {
            this.service.addNewArea(this.createAreaForm)
              .subscribe(
                result => {
                  alert("area created successfully")
                },
                error => {
                  this.errors = error;
                  alert("error occured")
                  this.createAreaForm.reset();
                },
                () => {
                  this.createAreaForm.reset();
                  this.getAllArea();
                  this.router.navigate['area']
                }
              );
          } else {
            alert("Don't add duplicate area")
          }
        }
      )
    }
  }

  deleteArea(id: string) {
    this.service.deleteArea(id)
      .subscribe(
        result => {
          // Handle result
          alert("area deleted successfully")
        },
        error => {
          alert("Error occured")
        },
        () => {
          this.getAllArea();
          this.router.navigate['area']
        }
      );
  }

  editArea(id: string) {
    this.isUpdating = true;
    this.service.getAreaById(id).subscribe(data => {
      const area: any = data;
      this.createAreaForm.controls['id'].setValue(area.id)
      this.createAreaForm.controls['area'].setValue(area.area)
    })
  }

  updateArea() {
    const id = this.createAreaForm.value.id;
    const area = this.createAreaForm.value.area
    this.createAreaForm.controls['area'].setValue(area.charAt(0).toUpperCase() + area.slice(1).toLowerCase());
    this.service.updateArea(id, this.createAreaForm)
      .subscribe(
        result => {
          // Handle result
          alert("area updated successfully")
        },
        error => {
          this.errors = error;
          alert("Error occured")
          this.isUpdating = false;
          this.createAreaForm.reset();
        },
        () => {
          this.isUpdating = false;
          this.createAreaForm.reset();
          this.getAllArea();
          this.router.navigate['area']
        }
      );
  }

}
