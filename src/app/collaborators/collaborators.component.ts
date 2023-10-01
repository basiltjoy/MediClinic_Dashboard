import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.getHospitals()
  }

  getHospitals() {
    const state = 'NC';
    const apiUrl = ``;

    this.http.get(apiUrl).subscribe(
      (data) => {
        console.log('API Response:', data);
        // Process the data as needed
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

}
