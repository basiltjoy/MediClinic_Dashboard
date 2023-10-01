import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  constructor( private router: Router){ }


  ngOnInit(){ }


  appointment(){
    this.router.navigate(['/appointment']);
  }
}
