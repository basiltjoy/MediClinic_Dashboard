import { Component } from '@angular/core';
import { TableData } from './table-data';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  data: any[] = []
  filteredData: any[] = []
  // columns = [
  //   { prop: 'doctor_id' },
  //   { prop: 'name' },
  //   { prop: 'email_id' },
  //   { prop: 'mobile_no' },
  //   { prop: 'qualification' },
  //   { prop: 'speciality'}
  // ];
  columns = [
    { prop: 'doctor_id', name: 'ID' },
    { prop: 'name', name: 'Doctor' },
    // { prop: 'email_id', name: 'Mail ID' },
    // { prop: 'mobile_no', name: 'Mobile', },
    // { prop: 'qualification', name: 'Qualification' },
    // { prop: 'speciality', name: 'Speciality' }
  ];
  currentPage: number = 1;

  totalItems = 100; // Total number of items in the data array
  pageSize = 10; // Number of items to display per page
  offset = 0; // Current page offset

  modalOpen: boolean = false;
  appointmentData: any ='';

  constructor() { }

  ngOnInit() {
    this.data = TableData
    console.log(this.data);
    this.filteredData = [...this.data];
  }


  filterColumn(event: any, column: string): void {
    const filterValue = event.target.value.toLowerCase();

    if (filterValue === '') {
      this.filteredData = [...this.data];
      return;
    }

    this.filteredData = this.data.filter((item) => {
      const columnValue = (item as any)[column].toString().toLowerCase();
      return columnValue.includes(filterValue);
    });
  }

  onRowActivate(event: any) {
    if (event.type == 'click') {
      console.log(event);
    }
  }

  appontmentRqstClicked(row: any) {
    this.appointmentData=row;
    this.modalOpen = true;
    // const isConfirmed = window.confirm('Are you sure you want to proceed?');
    // if (isConfirmed) {
    //   sessionStorage.setItem('NGX tableData', row.name + ',    extension:  ' + row.ext)
    // }
  }

  appointmentConfirm() {
    console.log(this.appointmentData.name);
    
    const isConfirmed = window.confirm('Are you sure you want to take appointment of '+this.appointmentData.name+', '
    +this.appointmentData.speciality);
    if (isConfirmed) {
      alert('Appointment confirmed, Our team will contact you shortly with appointment details ')
      sessionStorage.setItem('Appointment date confirmed', this.appointmentData.name )
      this.modalOpen = false;
      isConfirmed
    }
  }
  closeModal() {
    this.modalOpen = false;
  }


  onPageChange(event: any) {
    this.currentPage = event.offset + 1
    console.log(this.currentPage);
  }


}
