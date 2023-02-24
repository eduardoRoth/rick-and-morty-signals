import { Component, effect, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import CharactersService from '../../services/characters.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { fromSignal } from '../../utils/fromSignal';
import { debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';
import CharacterCardComponent from '../../components/character-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fromObservable } from '../../utils/form-observable';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgFor,
    CharacterCardComponent,
    ReactiveFormsModule,
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
          [formControl]="searchQuery"
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
          *ngFor="let character of characters()"
        >
          <signals-character-card [character]="character" />
        </ion-col>
      </ion-row>
    </ion-content>
  `,
})
export default class HomeComponent {
  searchQuery = new FormControl('');
  isLoading = signal(true);
  charactersService = inject(CharactersService);
  characters = fromObservable(
    (this.searchQuery.valueChanges as Observable<string>).pipe(
      debounceTime(300),
      startWith(''),
      tap(() => this.isLoading.set(true)),
      switchMap((query: string) => this.charactersService.getCharacters(query)),
      tap(() => this.isLoading.set(false))
    ),
    []
  );
}
