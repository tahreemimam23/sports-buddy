import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddEditAreaComponent } from './add-edit-area/add-edit-area.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AddEditCityComponent } from './add-edit-city/add-edit-city.component';



@NgModule({
  declarations: [
    AdminComponent,
    AddEditAreaComponent,
    AddEditCategoryComponent,
    AddEditCityComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
