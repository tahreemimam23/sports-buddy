import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AddSportsComponent } from './add-sports/add-sports.component';
import { AllSportsComponent } from './all-sports/all-sports.component';
import { MySportsComponent } from './my-sports/my-sports.component';



@NgModule({
  declarations: [UserComponent,AddSportsComponent,AllSportsComponent,MySportsComponent],
  imports: [
    CommonModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
