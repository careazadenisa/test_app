import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html'
})
export class CarModalComponent implements OnInit {
  @Input() id_car: number | undefined;

  modal = {} as any;

  constructor(private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (this.id_car) {
      this._spinner.show();
      axios.get(`/api/car/${this.id_car}`).then(({ data }) => {
        this.modal = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea mașinii!'));
    }
  }

  save(): void {
    this._spinner.show();

    if (!this.id_car) {
      axios.post('/api/car', this.modal).then(() => {
        this._spinner.hide();
        this.toastr.success('Mașina a fost salvată cu succes!');
        this.activeModal.close();
      }).catch(() => this.toastr.error('Eroare la salvarea mașinii!'));
    } else {
      axios.put('/api/car', this.modal).then(() => {
        this._spinner.hide();
        this.toastr.success('Mașina a fost modificată cu succes!');
        this.activeModal.close();
      }).catch(() => this.toastr.error('Eroare la modificarea mașinii!'));
    }
  }

  selectSearch(term: string, item: any): boolean {
    const isWordThere = [] as any;
    const splitTerm = term.split(' ').filter(t => t);

    item = REPLACE_DIACRITICS(item.brand);

    splitTerm.forEach(term => isWordThere.push(item.indexOf(REPLACE_DIACRITICS(term)) !== -1));
    const all_words = (this_word: any) => this_word;

    return isWordThere.every(all_words);
  }

  calculateTax(): void {                                                                    //calculates the tax based on the cylinder capacity 
     const cylindercapacity = parseInt(this.modal.cylindercapacity, 10);                     //extract and convert the cylindrical capacity from the modal to an integer 

    if (cylindercapacity < 1500) {                                                          //check the cylinder capacity value to determine the tax
     this.modal.tax = '50';                                                             //if the cylinder capacity is less than 1500, tax is 50
    } else if (cylindercapacity > 1500 && cylindercapacity < 2000) {
      this.modal.tax = '100';
    } else if (cylindercapacity > 2000) {
      this.modal.tax = '200';
    }
    
  }
  

}