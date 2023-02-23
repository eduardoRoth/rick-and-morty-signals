import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Character } from '../models/character.model';

@Component({
  standalone: true,
  selector: 'signals-character-card',
  template: `
    <ion-card tappable>
      <img [src]="character.image" />
      <ion-card-content>
        <h2 class="ion-text-center">{{ character.name }}</h2>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    img {
      width: 100%;
    }
  `],
  imports: [IonicModule],
})
export default class CharacterCardComponent {
  @Input() character!: Character;
}
