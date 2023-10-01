import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Output() childEvent = new EventEmitter<any>();
  showSpinner:boolean=true;

  constructor(){ }

  ngOnInit(){ 
    this.sendToParent()
  }

  sendToParent() {
    this.childEvent.emit( this.showSpinner);
  }
}
