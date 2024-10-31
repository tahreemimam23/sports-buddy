import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-all-sports',
  templateUrl: './all-sports.component.html',
  styleUrl: './all-sports.component.css'
})
export class AllSportsComponent implements OnInit {
  sports$:Observable<any>;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.sports$ = this.userService.getAllSports();
    this.sports$.subscribe(res=>console.log(res))
  }
}
