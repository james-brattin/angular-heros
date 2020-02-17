import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from './models/Hero';
import { HeroResponse } from './models/HeroResponse';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  // localUrl = `http://localhost:8080/api/heros`;
  localUrl = '/api/heros';

  getAllHeros() {
    return this.http.get<Hero[]>(this.localUrl);
  }

  saveHero(newHero: Hero) {
    return this.http.post<Hero>(this.localUrl, newHero);
  }

  removeHero(hero: Hero) {
    return this.http.delete<HeroResponse>(this.localUrl + `/${hero._id}`);
  }
}
