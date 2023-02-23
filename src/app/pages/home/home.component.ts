import { Component, effect, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import CharactersService from '../../services/characters.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { fromSignal } from '../../utils/fromSignal';
import { map, switchMap, tap } from 'rxjs';
import CharacterCardComponent from '../../components/character-card.component';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgFor,
    CharacterCardComponent,
  ],
  selector: 'signals-home',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title> Home </ion-title>
        <ion-buttons slot="end" class="ion-padding-horizontal">
          <ion-spinner *ngIf="isLoading()" />
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-searchbar
          color="primary"
          placeholder="Enter a character's name"
          [value]="searchQuery()"
          (ionChange)="updateQuery($event)"
          [debounce]="300"
        />
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-row>
        <ion-col
          size="12"
          size-sm="6"
          size-md="3"
          size-xl="3"
          *ngFor="let character of characters$ | async"
        >
          <signals-character-card [character]="character" />
        </ion-col>
      </ion-row>
    </ion-content>
  `,
  styles: [``],
})
export default class HomeComponent {
  searchQuery = signal('');
  isLoading = signal(true);
  charactersService = inject(CharactersService);
  characters$ = fromSignal(this.searchQuery).pipe(
    switchMap((query) => this.charactersService.getCharacters(query)),
    tap(() => this.isLoading.set(false))
  );
  ngOnInit() {
    effect(() => {
      console.log(
        `Using the search query ${this.searchQuery()} to fetch Rick & Morty characters`
      );
    });
  }

  updateQuery(event: any) {
    this.isLoading.set(true);
    this.searchQuery.set(event.target.value);
  }
}
