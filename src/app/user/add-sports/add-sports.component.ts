import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CityService } from '../../service/city.service';
import { AreaService } from '../../service/area.service';
import { CategoryService } from '../../service/category.service';
import { AuthService } from '../../service/auth.service';
import { userDetails } from '../../model/user-details.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'cx-add-sports',
  templateUrl: './add-sports.component.html',
  styleUrl: './add-sports.component.css'
})
export class AddSportsComponent {
  addSportForm: FormGroup = new FormGroup({});
  cities$: Observable<any>;
  areas$: Observable<any>;
  sportCategories$: Observable<any>;
  userDetails: userDetails;

  constructor(private cityService: CityService, private areaService: AreaService, private categoryService: CategoryService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userDetails = this.authService.userDetails;
    console.log(this.userDetails)
    this.cities$ = this.cityService.getAllCity();
    this.areas$ = this.areaService.getAllArea();
    this.sportCategories$ = this.categoryService.getAllCategory();
    this.addSportForm.setControl('city', new FormControl('', [Validators.required]));
    this.addSportForm.setControl('area', new FormControl('', [Validators.required]));
    this.addSportForm.setControl('sportsType', new FormControl('', [Validators.required]));
    this.addSportForm.setControl('date', new FormControl('', [Validators.required]));
    this.addSportForm.setControl('time', new FormControl('', [Validators.required]));
    this.addSportForm.setControl('mobile', new FormControl('', [Validators.required]));
    this.addSportForm.setControl('WhatsappNumber', new FormControl('', [Validators.required]));
    this.addSportForm.setControl('name', new FormControl({ value: this.userDetails.name, disabled: true }, [Validators.required]));
    this.addSportForm.setControl('email', new FormControl({ value: this.userDetails.email, disabled: true }, [Validators.required]));
    this.addSportForm.setControl('location', new FormControl({ value: this.userDetails.location, disabled: true }, [Validators.required]));
  }

  addSport() {
    console.log(this.addSportForm.value)
    if (this.addSportForm.valid) {
      this.userService.addNewSport(this.addSportForm).subscribe(
        res => alert("added successfully"),
        error => alert("error occured"),
        () => {
          this.addSportForm.reset()
          this.addSportForm.controls['name'].setValue(this.userDetails.name);
          this.addSportForm.controls['email'].setValue(this.userDetails.email);
          this.addSportForm.controls['location'].setValue(this.userDetails.location);
        }
      )
    }

  }

  get formControls() {
    return this.addSportForm['controls'];
  }
}
