import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';                       //import @Input decorator
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';                    //service used to manage the active modal window in the component
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';                 //import REPLACE_DIACRITICS method
import { ToastrService } from 'ngx-toastr';

type Car = {
  id: number;
  brand: string;
};

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html'
})


export class PersonModalComponent implements OnInit {
  @Input() id_person: number | undefined;                                       //id_person can be set with values ​​from outside the component using @Input decorator
  id_car: number | undefined;

  modal = {} as any;                                                            //object to store modal data
  
  cars : any[] = [];

  selectedCars = [];


  constructor(private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (this.id_person) {
      this._spinner.show();
      axios.get(`/api/person/${this.id_person}`).then(({ data }) => {
        this.modal = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea datelor persoanei!'));
    }
    if (this.id_car) {
      this._spinner.show();
      axios.get(`/api/car/${this.id_car}`).then(({ data }) => {                           
        this.modal = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea masinii!'));
    }
    this.loadCars(); // Încărcarea listei de mașini
    this.loadJunctionCars(); // Încărcarea mașinilor asociate persoanei în cazul editării

  }
  

  loadCars(): void {
    axios.get('/api/car').then(({ data }) => {
      // this.cars = data;
      // console.log('Lista de mașini:', this.cars);
      this.cars = data.map((car: Car) => ({ id: car.id, brand: car.brand })); // Modificare format pentru ng-select
    }).catch(error => {
      console.error('Eroare la preluarea mașinilor', error);
      this.toastr.error('Eroare la preluarea mașinilor!');
    });
  }

  loadJunctionCars(): void {
    if (this.id_person) {
      axios.get(`/api/junction/person/${this.id_person}`)
        .then(({ data }) => {
          this.modal.selectedCars = data;
        })
        .catch(() => this.toastr.error('Eroare la preluarea mașinilor asociate persoanei!'));
    }
  }

  save(): void {
   this._spinner.show();

  if (!this.id_person) {                                                     //if id_person is undefined
    axios.post('/api/person', this.modal).then(({ data }) => {               //post in table
      const newPersonId = data.id;

        if (this.modal.selectedCars && this.modal.selectedCars.length > 0) {
          const promises = this.modal.selectedCars.map((carId: number) => {
          return axios.post('/api/junction', {
            id_person: newPersonId,
            id_car: carId
          });
        });

        Promise.all(promises)
          .then(() => {
            this._spinner.hide();
            this.toastr.success('Persoana a fost salvată cu succes!');
            this.activeModal.close();                                        //close the modal
          })
          .catch(() => this.toastr.error('Eroare la salvarea persoanei!'));
      } else {              
        this._spinner.hide();
        this.toastr.success('Persoana a fost salvată cu succes!');
        this.activeModal.close();
      }
    }).catch(() => this.toastr.error('Eroare la salvarea persoanei!'));
  } else {                                                                  //if id_person defined
    axios.put('/api/person', this.modal).then(() => {                       //put in table
        if (this.modal.selectedCars && this.modal.selectedCars.length > 0) {
          // Delete existing junction entries for the person
          axios.delete(`/api/junction/${this.id_person}`).then(() => {
            // Add new junction entries for the selected cars
            const promises = this.modal.selectedCars.map((carId: number) => {
            return axios.post('/api/junction', {
              id_person: this.id_person,
              id_car: carId
            });
          });

          Promise.all(promises)
            .then(() => {
              this._spinner.hide();
              this.toastr.success('Persoana a fost modificată cu succes!');
              this.activeModal.close();
            })
            .catch(() => this.toastr.error('Eroare la modificarea persoanei!'));
        }).catch(() => this.toastr.error('Eroare la ștergerea joncțiunii pentru persoana existentă!'));
      } else {
        this._spinner.hide();
        this.toastr.success('Persoana a fost modificată cu succes!');
        this.activeModal.close();
      }
    }).catch(() => this.toastr.error('Eroare la modificarea persoanei!'));
  }
}

  


  selectSearch(term: string, item: any): boolean {
    const isWordThere = [] as any;                                               //creates a vector to store the search results
    const splitTerm = term.split(' ').filter(t => t);                            //breaks the search term into individual words and removes blank spaces

    item = REPLACE_DIACRITICS(item.lastname);                                    //use REPLACE_DIACRITICS method on lastname 

    splitTerm.forEach(term => isWordThere                                        //for each word in the search term, it checks if it exists in the lastname
      .push(item.indexOf(REPLACE_DIACRITICS(term)) !== -1));                     //looks for the index at which the term first appears in the item string
    const all_words = (this_word: any) => this_word;                             //defines a method all_words that checks if all words in the term are present

    return isWordThere.every(all_words);                                         //check if all_words is true for each element of the vector isWordThere
  }

  
  onSelectionChange (selectedCars: any[]): void {
    // selectedCars conține opțiunile selectate
    this.modal.cars = selectedCars;
  }


  calculateAgeFromCNP(cnp: any): number {
    const year = parseInt(cnp.substring(1, 3));
    const month = parseInt(cnp.substring(3, 5));
    const day = parseInt(cnp.substring(5, 7));
    const gender = parseInt(cnp.substring(0, 1));
    const currentYear = new Date().getFullYear();
    let birthYear = 0;
  
    if (gender === 1 || gender === 2) {
      birthYear = 1900 + year;
    } else if (gender === 3 || gender === 4) {
      birthYear = 1800 + year;
    } else if (gender === 5 || gender === 6) {
      birthYear = (year <= currentYear % 100) ? 2000 + year : 1900 + year;
    }
  
    const birthDate = new Date(birthYear, month - 1, day);
    const ageInMilliseconds = new Date().getTime() - birthDate.getTime();
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
  
    return ageInYears;
  }
  
}

