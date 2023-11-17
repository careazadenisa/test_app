import axios from 'axios';                                                                      //the library makes HTTP requests to an API to get or send data
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';                                          //NgbModal from ng-bootstrap is use to create and control _modal
import { faPlus, faEdit, faTrashAlt, faChevronUp } from '@fortawesome/free-solid-svg-icons';    //import icons from FontAwesome
import { SCROLL_TOP, SET_HEIGHT } from 'src/app/utils/utils-table';                             //methods for managing tables
import { PersonModalComponent } from './person-modal/person-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';                                                //NgxSpinnerService is used to control the showing and hiding of this _spinner
import { ToastrService } from 'ngx-toastr';                                                     //ToastrService is used to display notification messages 
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';            


@Component({                                                                                    //the @Component decorator is used to define components (add metadata)
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {                                                //the OnInit interface handles component initialization
  faTrashAlt = faTrashAlt; faEdit = faEdit; faChevronUp = faChevronUp; faPlus = faPlus;         //icons 
  limit: number = 70;                                                                           //data upload limit
  showBackTop: string = '';                                                                     //backTop button
  person: any = [];                                                                             //person array
  cars: any = [];                                                                               //add cars array
  junction: any = [];                                                                           //add junction array
  nrCrt: number = 1; 

  constructor(                                                                                  //object init
    private _modal: NgbModal,                                                                   //gets an instance of the NgbModal service
    private _spinner: NgxSpinnerService, 
    private toastr: ToastrService, 
    ) { 
      SET_HEIGHT('view', 20, 'height');                                                         //set view height
    }

  ngOnInit(): void {
    this.loadData();                                                                            //initializes the data on page load
    this.loadCars();                                                                            //load cars data
    this.loadJunction();                                                                        //load junction data
  }

  // loadData = (): void => {                                                                      //method for loading data from database                    
  //   this._spinner.show();                                                                       //show loading spinner
  //   axios.get('/api/person').then(({ data }) => {                                               //makes a GET request to the API to get the person data           
  //     this.person = data;                                                                       //store the data in the "person" vector
  //     // pentru fiecare persoană, obține mașinile asociate
  //   const carRequests = this.person.map((person: any) => {                                      //using the map method, an array of promises is created to get the data about the cars associated with each person
  //      return axios.get(`/api/junction/person/${person.id}`).then(({ data }) => {               //wait for all created promises to complete
  //       // return axios.get('/api/junction/person/:id_person').then(({ data }) => {
  //       person.cars = data;
  //     });
  //   });

  //   Promise.all(carRequests)
  //     .then(() => {
  //       this._spinner.hide();
  //     })
  //     .catch(() => this.toastr.error('Eroare la preluarea datelor persoanei!'));
  // }).catch(() => this.toastr.error('Eroare la preluare persoana!'));                               //error handling with catch method
  // }
  loadData = (): void => {                                                                      //method for loading data from database                    
    this._spinner.show();                                                                       //show loading spinner
    axios.get('/api/person').then(({ data }) => {                                               //makes a GET request to the API to get the person data           
      this.person = data;                                                                       //store the data in the "person" vector
      this._spinner.hide();                                                                     //hide the spinner
    }).catch(() => this.toastr.error('Eroare la preluare persoana!'));                          //error handling with catch method
  }

  loadCars = (): void => {
    axios.get('/api/car').then(({ data }) => {
      this.cars = data;
    }).catch(() => this.toastr.error('Eroare la preluare masini!'));
  }

  loadJunction = (): void => {
    axios.get('/api/junction').then(({ data }) => {
      this.junction = data;
    }).catch(() => this.toastr.error('Eroare la preluare junction!'));
  }

  addEdit = (id_person?: number): void => {                                                     //id_person from modal
    const modalRef = this._modal.open(PersonModalComponent, {                                   //open modal component
      size: 'lg', keyboard: false, backdrop: 'static'
    });               
    modalRef.componentInstance.id_person = id_person;                                           //Pass the ID of the person to the modal window
    modalRef.componentInstance.cars = this.cars; // Pass cars data to modal
    modalRef.componentInstance.junction = this.junction; // Pass junction data to modal
    modalRef.closed.subscribe(() => {                                                           // subscribes to the closed event of the modal window and defines an anonymous function that will be executed when the modal window closes
      this.loadData();
    
    });
  }

  delete = (person: any): void => {
    const modalRef = this._modal.open(ConfirmDialogComponent, {                                 //open ConfirmDialogComponent
      size: 'lg', keyboard: false, backdrop: 'static'
    });
    modalRef.componentInstance.title = `Ștergere persoana`;                                     //sets the value of the title property of the modalRef component
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Doriți să ștergeți persoana cu numele <b>${person.lastname}</b> și prenumele <b>${person.firstname}</b>?`;
    modalRef.closed.subscribe(() => {
      axios.delete(`/api/person/${person.id}`).then(() => {                               //id from table person
        this.toastr.success('Persoana a fost ștearsă cu succes!');
        this.loadData();                                                                        //refresh table
      }).catch(() => this.toastr.error('Eroare la ștergerea persoanei!'));
    });
  }

  onResize(): void {                                                                            //resize window method
    SET_HEIGHT('view', 20, 'height');
  }

  showTopButton(): void {                                                                       //method to show "back up" button when scrolling
    if (document
      .getElementsByClassName('view-scroll-informations')[0]                                    //DOM selection where the first element found from the 'view-scroll-informations' class is get
      .scrollTop > 500) {                                                                       //the amount of pixels an element is scrolled up within the viewport
        this.showBackTop = 'show';
      } else {
        this.showBackTop = '';
     }
  }

  onScrollDown(): void {                                                                        //method to load multiple items based on scrolling
    this.limit += 20;                                                                           //increases the limit for additional item loading
  }

  onScrollTop(): void {                                                                         //method to return to the top of the page
    SCROLL_TOP('view-scroll-informations', 0);
    this.limit = 70;                                                                            //reset the limit
  }

  
}
