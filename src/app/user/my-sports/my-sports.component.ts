import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { map, Observable } from 'rxjs';
import { UserData } from '../../model/user-data.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'cx-my-sports',
  templateUrl: './my-sports.component.html',
  styleUrl: './my-sports.component.css'
})
export class MySportsComponent implements OnInit {
  sports$: Observable<any>;
  userDetails: UserData;

  constructor(private userService: UserService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.userDetails = this.authService.userDetails;
    this.sports$ = this.userService.getAllSports().pipe(
      map(sports=>{
        return sports.filter(sport => sport.email === this.userDetails.email)
      })
    );
  }

}
