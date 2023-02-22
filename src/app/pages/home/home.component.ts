import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule],
  selector: 'signals-home',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title> Home </ion-title>
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-searchbar color="primary" placeholder="Enter a character's name" />
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-content> This is the home page </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [``],
})
export default class HomeComponent {
  title = 'signals';
}
