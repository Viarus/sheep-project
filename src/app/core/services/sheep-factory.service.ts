import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Field } from '../models/field/field-model';
import { MaleSheep } from '../models/sheep/male-sheep-model';
import { FemaleSheep } from '../models/sheep/female-sheep-model';
import { LambSheep } from '../models/sheep/lamb-sheep-model';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';
import { PublicConstantsService } from '../constants/public-constants.service';
import { LambSheepGrowingService } from './lamb-sheep-growing.service';

@Injectable({
  providedIn: 'root'
})
export class SheepFactoryService {

  constructor(private publicConstants: PublicConstantsService, private lambGrowingService: LambSheepGrowingService) {
  }

  readonly gender_female = 'FEMALE';
  readonly gender_male = 'MALE';
  readonly gender_lamb = 'LAMB';
  readonly gender_random = 'RANDOM';

  private sheepCounter: number = 0;
  private sheepCounterSubject: Subject<number> = new Subject<number>();

  readonly arrayOfAllSheepGenders: string[] = [
    this.gender_female,
    this.gender_lamb,
    this.gender_male
  ]

  public createAndAssignSheep(name: string, gender: string, field: Field, isBranded = false): MaleSheep | FemaleSheep | LambSheep {
    let newSheep: AbstractSheep;
    if (gender === this.gender_random) {
      newSheep = this.createSheepWithSpecifiedGender(name, this.getRandomSheepGender(), field, isBranded);
    } else {
      newSheep = this.createSheepWithSpecifiedGender(name, gender, field, isBranded);
    }
    field.addSheep(newSheep);
    this.sheepCounter++;
    this.sheepCounterSubject.next(this.sheepCounter);
    return newSheep;
  }

  public getRandomSheepGender(): string {
    return this.arrayOfAllSheepGenders[Math.floor(Math.random() * this.arrayOfAllSheepGenders.length)];
  }

  public getRandomAdultSheepGender(): string {
    if (Math.random() >= 0.5) {
      return this.gender_female;
    }
    return this.gender_male;
  }

  public getSheepCounterSubject(): Subject<number> {
    return this.sheepCounterSubject;
  }

  private createSheepWithSpecifiedGender(name: string, gender: string, field: Field, isBranded = false): MaleSheep | FemaleSheep | LambSheep {
    switch (gender) {
      case this.gender_female:
        return new FemaleSheep(name, field, isBranded);
      case this.gender_male:
        return new MaleSheep(name, field, isBranded);
      case this.gender_lamb:
        return new LambSheep(name, field, isBranded);
      default:
        throw new Error(this.publicConstants.WRONG_SHEEP_GENDER_EXCEPTION);
    }
  }
}
