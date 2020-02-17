import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';
import { Hero } from './models/Hero';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private backend: BackendService) {
    this.getInitialData()
  }
  
  private heros = new BehaviorSubject([]);
  public readonly heros$ = this.heros.asObservable();

  getInitialData() {
    this.backend.getAllHeros()
      .subscribe(
        res => {
          this._heros = res;
          this.heros.next(res);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        },
        () => console.log('HTTP request completed')
      );
  }

  saveHero(newHero: Hero) {
    this.backend.saveHero(newHero)
      .subscribe(
        res => {
          if (res) {
            this.getInitialData();
          } else {
            console.log('there was a problem');
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        },
        () => console.log('HTTP request completed')
      )
  }

  deleteHero(hero: Hero) {
    this.backend.removeHero(hero)
      .subscribe(
        res => {
          if (res.message === 'Hero deleted successfully') {
            this.getInitialData();
          } else {
            console.log('there was a problem');
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        },
        () => console.log('HTTP request completed')
      )
  }

  private _heros: Hero[] = [];
}
