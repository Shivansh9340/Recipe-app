import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  // loadedFeature = 'recipe';
  // onNavigate(feature:string){
  //   console.log(feature);
  //   this.loadedFeature = feature;
  // }
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.autologin();
  }
  ngOnDestroy(): void {
    
  }
}
