import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';                                                           //import the RouterModule module to be able to define our application's routes.
import { InformationComponent } from './components/information/information.component';
import { InformationModalComponent } from './components/information/information-modal/information-modal.component';
import { PersonComponent } from './components/person/person.component';
import { PersonModalComponent } from './components/person/person-modal/person-modal.component';
import { CarComponent } from './components/car/car.component';
import { CarModalComponent } from './components/car/car-modal/car-modal.component';

const routes: Routes = [                                                                    //define an array of route objects that indicate how the application should behave according to the accessed URL
  { path: 'information', component: InformationComponent , children:[
    { path: 'information-modal' , component: InformationModalComponent} 
  ]},
  { path: 'person' , component: PersonComponent , children:[                                //route for "person", which displays the "PersonComponent" component
    { path: 'person-modal', component: PersonModalComponent}                                //built-in "person-modal" route, which renders the "PersonModalComponent" component.
  ]},
  { path: 'car' , component: CarComponent, children:[
    { path: 'car-modal', component: CarModalComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],                                                  //import the routes defined above using RouterModule.forRoot and configure them.
  exports: [RouterModule]                                                                   //export the RouterModule module to be available in other application components
})
export class AppRoutingModule { }
