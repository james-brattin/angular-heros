import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../models/Hero';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit {
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
