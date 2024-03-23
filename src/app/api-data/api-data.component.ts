import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { ChildActivationStart } from '@angular/router';
@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css']
})
export class ApiDataComponent {
  sources = [
    this.http.get('https://www.healthit.gov/data/open-api?source=workforce-programs-trained.csv'),
    this.http.get('https://www.healthit.gov/data/open-api?source=SKA_State_County_Data_2011-2013.csv'),

  ];
  spinnerHandle: boolean = true;
  workforce_trained: [] = [];
  chart: any = []
  workForce: any;

  Health_Care_Practitioners: any = [];
  regions: any = null;
  chosenRegion: any = '';
  practitioners: any;
  chart2: any;
  nationWide: boolean = false;
  @ViewChild('alertPopup') alertPopup!: ElementRef;
  errorMsg: string = '';
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.spinnerHandle = false;
    this.getData()

  }

  getData() {
    this.spinnerHandle = true;

    // forkJoin(this.sources[0]).pipe(
    //   catchError((error: any) => {
    //     const parts = error.message.split(':');
    //     const errorMessage = parts[0].trim();

    //     console.log(parts);
    //     // console.error('API call error:', error.message);
    //     window.confirm(error.message)
    //     this.spinnerHandle = false;
    //     return [];
    //   })
    // ).subscribe((event: any) => {
    //   this.workforce_trained = event[0]
    //   this.Health_Care_Practitioners = event[1]
    //   // console.log(event);

    //   this.spinnerHandle = false;
    //   this.extractData()
    //   // this.practitionersData()
    // });
  
    this.http.get<any>('https://www.healthit.gov/data/open-api?source=workforce-programs-trained.csv', {
    }).subscribe(data => {
      if (data) {
        console.log('subscribe method', data);
        this.workforce_trained = data
        this.spinnerHandle = false;
        this.extractData()
      }
    }, ((error: HttpErrorResponse) => {
      this.errorMsg= error.error
      console.log(this.errorMsg)
      window.confirm(error.message)
      this.alertPopup.nativeElement.classList.add('show');
      this.spinnerHandle = false;
    }));

  }

  extractData() { //chart 1
    let AreaGeography: any = [];
    this.workForce = this.workforce_trained.filter((coins: any) => coins.region == 'National');
    this.workForce.map((item: any) => AreaGeography.push(item.geo_area))
    console.log(AreaGeography);

    let NoOfTrained: any = [];
    let staffTrained = this.workforce_trained.filter((coins: any) => coins.region == 'National');
    staffTrained.map((item: any) => NoOfTrained.push(item.students_trained))
    console.log(NoOfTrained);

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: AreaGeography,
        datasets: [
          {
            label: '# of Students Trained',
            data: NoOfTrained,
            borderWidth: 5,
            borderRadius: 10,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            }
          },
          x: {
            ticks: {
              color: 'white',
            },
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
      },
    });

  }

  nationWideData() {
    this.nationWide = !this.nationWide;
    if (this.nationWide) {
      this.spinnerHandle = true;

      forkJoin(this.sources[1]).pipe(
        catchError((error: any) => {
          const parts = error.message.split(':');
          const errorMessage = parts[0].trim();

          console.log(parts);
          // console.error('API call error:', error.message);
          window.confirm(error.message)
          this.spinnerHandle = false;
          return [];
        })
      ).subscribe((event: any) => {
        this.Health_Care_Practitioners = event[0]
        this.practitionersData()
        this.spinnerHandle = false;

      });
    }
    else {
      this.chart2.destroy();
      this.chosenRegion = '';
    }
  }

  practitionersData() {   //chart 2
    this.regions = [...new Set(
      this.Health_Care_Practitioners.map((item: any) =>
        item.region
      )
    )];

    if (this.chosenRegion) {
      if (this.chart2) {
        this.chart2.destroy()
      }

      const regionFilter = this.Health_Care_Practitioners.filter((item: any) =>
        item.region == this.chosenRegion
      )
      let array: any = [];
      regionFilter.map((item: any) =>
        this.practitioners = item
      )
      console.log('practitioners', this.practitioners);

      this.chart2 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: ['Nurse Practitioners', 'Physician Assistants', 'Physicians',
            'Primary Care Nurse Practitioners', 'Primary Care Physician Assistants',
            'Primary Care Physicians', 'Primary Care Providers'],
          datasets: [{
            label: 'Our Strength',
            data: [this.practitioners.all_nurse_practitioners, this.practitioners.all_physician_assistants, this.practitioners.all_physicians,
            this.practitioners.all_primary_care_nurse_practitioners, this.practitioners.all_primary_care_physician_assistants,
            this.practitioners.all_primary_care_physicians, this.practitioners.all_primary_care_providers],
            borderColor: 'rgb(51, 103, 103)',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            fill: true,
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black',
              },
            },
            x: {
              ticks: {
                color: 'black',
              },
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'black',
              },
            },
          },
        },
      });
    }
    // console.log(this.Health_Care_Practitioners);
  }

  areaSelection() {
    // console.log(this.chosenRegion);
    this.practitionersData()
  }





  receiveChildEvent(eventData: any) {
    this.spinnerHandle = eventData;
  }

}
