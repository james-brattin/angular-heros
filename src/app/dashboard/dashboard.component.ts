import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Hero } from '../models/Hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heros$: Observable<Hero | any>;
  createNew: Boolean = false;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heros$ = this.heroService.heros$.pipe(share());
  }
}