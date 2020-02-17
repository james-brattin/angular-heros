import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})
export class CreateHeroComponent implements OnInit {
  createHeroForm: FormGroup;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.createHeroForm = this.createForm();
  }

  createForm() {
    return new FormGroup({
      name: new FormControl(''),
      description: new FormControl('')
    });
  };

  newHero() {
    let name = this.createHeroForm.get('name');
    let description = this.createHeroForm.get('description');
    this.heroService.saveHero({name: name.value, description: description.value})
    name.setValue('');
    description.setValue('');
  }
}
