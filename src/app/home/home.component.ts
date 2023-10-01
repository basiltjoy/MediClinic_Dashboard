import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeTab = 'home';

  spinnerHandle: boolean = true;
  constructor( private router: Router) {

  }

  ngOninit() {
    this.activeTab = 'home';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinnerHandle = false
      console.log('afterviewinit', this.spinnerHandle);
    }, 3000);
  }


  setActiveTab(tab: any) {
    this.activeTab = tab;
    console.log(this.activeTab);
  }

  receiveChildEvent(eventData: any) {
    console.log(this.spinnerHandle = eventData);
  }

  appointment(){
    this.router.navigate(['/appointment']);
  }

  
}
