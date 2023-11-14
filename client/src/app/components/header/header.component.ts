import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // @Output() featureSelected = new EventEmitter<string>();               //emit own event that can be listened to from outside the component

  // onSelect(feature: string) {                                           //the method of selecting pages from the menu
  //   this.featureSelected.emit(feature);                                 //an event with the name featureSelected is emitted, and the feature object is passed as an argument to the event listeners
  // }

}
