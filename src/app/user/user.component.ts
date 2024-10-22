import { Component } from '@angular/core';

@Component({
  selector: 'cx-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  btnSelectedType:string = '';
  onSelect(btnSelectedType:string){
    this.btnSelectedType = btnSelectedType;
  }
}
