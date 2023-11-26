import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Field } from '../models/field-model';
import { MaleSheep } from '../models/sheep/male-sheep-model';
import { FemaleSheep } from '../models/sheep/female-sheep-model';
import { LambSheep } from '../models/sheep/lamb-sheep-model';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';
import { FieldStorageService } from '../storages/field-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SheepFactoryService {
  private readonly wrongGenderErrorMessage = 'Gender not found. Is your sheep an alien?';
  private readonly gender_female = 'FEMALE';
  private readonly gender_male = 'MALE';
  readonly gender_lamb = 'LAMB';
  private readonly gender_random = 'RANDOM';

  private newSheepEventSubject: Subject<void> = new Subject<void>();
  private timeOfLambGrowth = 12000;

  constructor(private fieldStorage: FieldStorageService) {
  }

  readonly allSheepGenders: string[] = [
    this.gender_female,
    this.gender_lamb,
    this.gender_male
  ]

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
    this.newSheepEventSubject.next();
    return newSheep;
  }

  getRandomSheepGender(): string {
    return this.allSheepGenders[Math.floor(Math.random() * this.allSheepGenders.length)];
  }

  getRandomAdultSheepGender(): string {
    if (Math.random() >= 0.5) {
      return this.gender_female;
    }
    return this.gender_male;
  }

  getNewSheepEventSubject(): Subject<void> {
    return this.newSheepEventSubject;
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
    this.createAndAssignSheep(lamb.name, this.getRandomAdultSheepGender(), lamb.field);

    // TODO it must be the same lamb!
    lamb.field.removeOneLamb();
  }

  private sanitizedField(field: Field | string): Field {
    if (field instanceof Field) {
      return field;
    }
    return this.fieldStorage.getFieldByName(field);
  }
}
