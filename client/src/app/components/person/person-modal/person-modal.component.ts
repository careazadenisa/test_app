import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';                       //import @Input decorator
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';                    //service used to manage the active modal window in the component
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';                 //import REPLACE_DIACRITICS method
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html'
})
export class PersonModalComponent implements OnInit {
  @Input() id_person: number | undefined;                                       //id_person can be set with values ​​from outside the component using @Input decorator
  id_car: number | undefined;

  modal = {} as any;                                                            //object to store modal data

  selectedOptions = [];                                                         //array to store selected options

  constructor(private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (this.id_person) {                                                       //if id_person is defined, loads the person's data
      this._spinner.show();
      axios.get(`/api/person/${this.id_person}`).then(({ data }) => {           ////makes a GET request to the API to get the person data                 
        this.modal = data;                                                      // store fetched person data in the modal object
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea persoanei!'));
    }
    if (this.id_car) {
      this._spinner.show();
      axios.get(`/api/car/${this.id_car}`).then(({ data }) => {                           
        this.modal = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea masinii!'));
    }
  }

  save(): void {
    this._spinner.show();

    if (!this.id_person) {                                                      //if id_person is undefined             
      axios.post('/api/person', this.modal).then(() => {                        //post in table
        this._spinner.hide();
        this.toastr.success('Persoana a fost salvată cu succes!');
        this.activeModal.close();                                               //close the modal
      }).catch(() => this.toastr.error('Eroare la salvarea persoanei!'));
    } else {                                                                    //if id_person defined
      axios.put('/api/person', this.modal).then(() => {                         //put in table
        this._spinner.hide();
        this.toastr.success('Persoana a fost modificată cu succes!');
        this.activeModal.close();
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

  
  onSelectionChange(event: any) {                                                 //method for ng-select
    this.selectedOptions = event;
  }

  calculateAgeFromCNP(cnp: any) {                                                 //method to calculate age from CNP
    const year = parseInt(cnp.substring(1,3));                                    //extract the 2-3 digits that represent the year
    const month = parseInt(cnp.substring(3,5));                                   //extract the digits 4-5 representing the month
    const day = parseInt(cnp.substring(5,7));                                     //extract the digits 6-7 representing the day
    const gender = parseInt(cnp.substring(0,1));                                  //extract the first digit, which represents the gender
    //const currentYear = new Date().getFullYear();
    let birthYear:number =0 ;                                                     //initializes the birth year variable
    
    if (gender === 1 || gender ===2) {                                            //determine first 2 digits from the year of birth based gender
      birthYear = parseInt('19' + year);                                          //initializes birthYear and convert the string ('19' + year) to an integer
    } else if (gender ===3 || gender ===4) {
      birthYear = parseInt('18' + year);
    } else if (gender ===5 || gender ===6) {
      birthYear = parseInt('20' + year);
    }
    
    const birthDate = new Date(birthYear, month -1 , day);                              //create a date of birth based on the year, month and day extracted from the CNP where the month is numbered from 0 (January) to 11 (December)
    const ageInMilliseconds = new Date().getTime() - birthDate.getTime();               //calculates the difference in milliseconds between the current date and the date of birth
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 *60 *24 *365.25));     //convert milliseconds to years about a leap year
    
    return ageInYears;                                                                  //return age in year
  }
}