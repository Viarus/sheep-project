import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  private readonly timeOfLambGrowth = 12000;

  private _newSheep$: Subject<void> = new Subject<void>();

  constructor(private fieldStorage: FieldStorageService, private errorHandler: ErrorHandlerService) {
  }

  getSheepGenders(includingRandom: boolean = false): string[] {
    const genders: string[] = [this.gender_female, this.gender_lamb, this.gender_male];
    return includingRandom ? [...genders, this.gender_random] : [...genders];
  }

  createLamb(name: string, field: Field) {
    const lamb = this.createSheepWithSpecifiedGender(name, this.gender_lamb, field);
    if (AbstractSheep.isLamb(lamb)) {
      field.addSheep(lamb, field.numberOfRows);
      this.startGrowingProcess(lamb);
      this._newSheep$.next();
    } else {
      this.errorHandler.handleError('Lamb was created as an adult... something went horribly wrong!');
    }
  }

  createAndAssignSheep(name: string, gender: string, fieldOrFieldName: Field | string, isBranded = false): AbstractSheep {
    let newSheep: AbstractSheep;
    const field = this.sanitizedField(fieldOrFieldName);
    const cachedNumberOfRows = field.numberOfRows;
    if (gender === this.gender_random) {
      newSheep = this.createSheepWithSpecifiedGender(name, this.getRandomSheepGender(), field, isBranded);
    } else {
      newSheep = this.createSheepWithSpecifiedGender(name, gender, field, isBranded);
    }
    field.addSheep(newSheep, cachedNumberOfRows);
    this._newSheep$.next();
    return newSheep;
  }

  getRandomSheepGender(): string {
    const genders = this.getSheepGenders();
    return genders[Math.floor(Math.random() * genders.length)];
  }

  getRandomAdultSheepGender(): string {
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
        const newLamb: LambSheep = new LambSheep(name, field);
        this.startGrowingProcess(newLamb);
        return newLamb;
      default:
        throw new Error(this.wrongGenderErrorMessage);
    }
  }

  private startGrowingProcess(lamb: LambSheep): void {
    new Promise(resolve => setTimeout(resolve, this.timeOfLambGrowth)).then(() => this.onLambGrown(lamb));
  }

  private onLambGrown(lamb: LambSheep): void {
    lamb.field.removeOneLamb(lamb);
    this.createAndAssignSheep(lamb.name, this.getRandomAdultSheepGender(), lamb.field);
  }

  private sanitizedField(field: Field | string): Field {
    if (field instanceof Field) {
      return field;
    }
    return this.fieldStorage.getFieldByName(field);
  }
}
