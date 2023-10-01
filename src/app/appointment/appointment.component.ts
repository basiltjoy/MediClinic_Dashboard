import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableData } from '../services/table-data';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  modalOpen: boolean = true;
  docArray: any = [];

  Pt_name: string = ''
  Pt_mail: any;
  Pt_mob: any;
  selectedDoctor: string = '';
  appointmentArray: any = [];

  selectedDate: string = '';
  minDate: string;



  @ViewChild('alertPopup') alertPopup!: ElementRef;

  constructor(private router: Router) {
    this.minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    console.log(this.minDate);



  }

  ngOnInit() {
    console.log(TableData);
    this.docArray = TableData
  }

  appointmentConfirm() {
    if (this.Pt_name == '' || !this.Pt_mail || !this.Pt_mob || this.selectedDoctor == '' ||
    this.selectedDate =='') {
      this.alertPopup.nativeElement.classList.add('show');

      setTimeout(() => {
        this.alertPopup.nativeElement.classList.remove('show');
      }, 2000);
      return
    }

    const isConfirmed = window.confirm('Are you sure you want to take appointment with ' + this.selectedDoctor);
    this.appointmentArray.push({
      'Patient Name:': this.Pt_name, 'Patient Mail: ': this.Pt_mail, 'Patient Mobile: ': this.Pt_mob,
      'Doctor Details ': this.selectedDoctor, 'Appointment Dt ': this.selectedDate
    })

    if (isConfirmed) {
      alert('Appointment confirmed for '+this.selectedDate + ' with '+ this.selectedDoctor)
      sessionStorage.setItem('Appointment confirmed', JSON.stringify(this.appointmentArray))
      this.modalOpen = false;
      this.router.navigate(['']);
    }
  }
  closeAlert(): void {
    this.alertPopup.nativeElement.classList.remove('show');
    this.alertPopup.nativeElement.classList.add('fade');
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onDoctorSelectionChange() {
    if (this.selectedDoctor) {
      console.log('Selected doctor:', this.selectedDoctor);
    } else {
      console.log('No doctor selected');
    }
  }

  closeModal() {
    this.modalOpen = false;
    this.router.navigate(['']);
  }





}
