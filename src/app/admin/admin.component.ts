import { Component } from '@angular/core';

@Component({
  selector: 'cx-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  btnSelectedType:string = '';
  onSelect(btnSelectedType:string){
    this.btnSelectedType = btnSelectedType;
  }
}
