import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeopleService, People } from './shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'agldemo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'agldemo';

  public male = [];
  public female = [];

  private unsubscribe: Subscription[] = [];

  constructor(private peopleService: PeopleService) {

  }

  public ngOnInit(): void {
    this.unsubscribe.push(this.peopleService.get().subscribe(x => this.prepareCats(x)));
  }

  public ngOnDestroy(): void {
    this.unsubscribe.forEach(subscribtion => {
      subscribtion.unsubscribe();
    });
  }

  private prepareCats(peoples: People[]): void {
    peoples?.filter(people => people?.pets?.filter(pet => pet?.type.toLocaleLowerCase() === 'cat').forEach(cat => {
      const gender = people?.gender.toLocaleLowerCase();
      if (gender === 'female') {
        this.female.push(cat?.name);
      } else if (gender === 'male') {
        this.male.push(cat?.name);
      }
    }));

    this.female = this.female.sort((a, b) => a.localeCompare(b));
    this.male = this.male.sort((a, b) => a.localeCompare(b));
  }
}
