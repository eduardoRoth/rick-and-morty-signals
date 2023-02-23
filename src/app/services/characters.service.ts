import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { CharacterResponse } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export default class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(query: string = '') {
    return this.http
      .get<CharacterResponse>(
        `https://rickandmortyapi.com/api/character?name=${query}`
      )
      .pipe(
        map((response) => response.results),
        catchError((err) => of([]))
      );
  }
}
