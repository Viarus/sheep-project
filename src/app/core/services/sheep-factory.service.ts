import { Injectable } from '@angular/core';
import { first, Subject, tap } from 'rxjs';
import { Field } from '../models/field-model';
import { MaleSheep } from '../models/sheep/male-sheep-model';
import { FemaleSheep } from '../models/sheep/female-sheep-model';
import { LambSheep } from '../models/sheep/lamb-sheep-model';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';
import { FieldStorageService } from '../storages/field-storage.service';
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class SheepFactoryService {
  readonly gender_lamb = 'LAMB';
  private readonly gender_female = 'FEMALE';
  private readonly gender_male = 'MALE';
  private readonly wrongGenderErrorMessage = 'Gender not found. Is your sheep an alien?';
  private readonly gender_random = 'RANDOM';


  private _newSheep$: Subject<void> = new Subject<void>();

  constructor(private errorHandler: ErrorHandlerService) {
  }

  createLamb(name: string, field: Field): LambSheep | null {
    const lamb = this.createSheepWithSpecifiedGender(name, this.gender_lamb, field);
    if (AbstractSheep.isLamb(lamb)) {
      lamb.lambGrown$.pipe(first(), tap(() => {
        lamb.field.removeOneLamb(lamb);
        this.createAndAssignSheep(lamb.name, this.getRandomAdultGender(), lamb.field);
      })).subscribe();

      return lamb;
    } else {
      this.errorHandler.handleError('Lamb was created as an adult... something went horribly wrong!');
      return null;
    }
  }

  createAndAssignSheep(name: string, gender: string, field: Field, isBranded = false): AbstractSheep | null {
    const newSheepGender = gender === this.gender_random ? this.getRandomGender() : gender;
    if (newSheepGender === this.gender_lamb) {
      return this.createLamb(name, field);
    }

    const newSheep = this.createSheepWithSpecifiedGender(name, gender, field, isBranded);
    this._newSheep$.next();
    return newSheep;
  }

  getGenders(includingRandom: boolean = false): string[] {
    const genders: string[] = [this.gender_female, this.gender_lamb, this.gender_male];
    return includingRandom ? [...genders, this.gender_random] : [...genders];
  }

  getRandomGender(): string {
    const genders = this.getGenders();
    return genders[Math.floor(Math.random() * genders.length)];
  }

  getRandomAdultGender(): string {
    if (Math.random() >= 0.5) {
      return this.gender_female;
    }
    return this.gender_male;
  }

  get newSheep$(): Subject<void> {
    return this._newSheep$;
  }

  private createSheepWithSpecifiedGender(name: string, gender: string, field: Field, isBranded = false): AbstractSheep {
    switch (gender) {
      case this.gender_female:
        return new FemaleSheep(name, field, isBranded);
      case this.gender_male:
        return new MaleSheep(name, field, isBranded);
      case this.gender_lamb:
        return new LambSheep(name, field);
      default:
        throw new Error(this.wrongGenderErrorMessage);
    }
  }
}
