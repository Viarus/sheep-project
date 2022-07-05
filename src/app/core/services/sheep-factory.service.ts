import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Field } from '../models/field/field-model';
import { MaleSheep } from '../models/sheep/male-sheep-model';
import { FemaleSheep } from '../models/sheep/female-sheep-model';
import { LambSheep } from '../models/sheep/lamb-sheep-model';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';
import { PublicConstantsService } from '../constants/public-constants.service';
import { FieldStorageService } from '../storages/field-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SheepFactoryService {
  public readonly gender_female = 'FEMALE';
  public readonly gender_male = 'MALE';
  public readonly gender_lamb = 'LAMB';
  public readonly gender_random = 'RANDOM';

  private newSheepEventSubject: Subject<void> = new Subject<void>();
  private timeOfLambGrowth = 12000;

  constructor(private publicConstants: PublicConstantsService, private fieldStorage: FieldStorageService) {
  }

  public readonly arrayOfAllSheepGenders: string[] = [
    this.gender_female,
    this.gender_lamb,
    this.gender_male
  ]

  public createAndAssignSheep(name: string, gender: string, fieldOrFieldName: Field | string, isBranded = false): AbstractSheep {
    let newSheep: AbstractSheep;
    const field = this.sanitizedField(fieldOrFieldName);
    const cachedNumberOfRows = field.getNumberOfRows();
    if (gender === this.gender_random) {
      newSheep = this.createSheepWithSpecifiedGender(name, this.getRandomSheepGender(), field, isBranded);
    } else {
      newSheep = this.createSheepWithSpecifiedGender(name, gender, field, isBranded);
    }
    field.addSheep(newSheep);
    field.assignSheepToRow(newSheep, cachedNumberOfRows);
    this.newSheepEventSubject.next();
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

  public getNewSheepEventSubject(): Subject<void> {
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
        throw new Error(this.publicConstants.WRONG_SHEEP_GENDER_EXCEPTION);
    }
  }

  private startGrowingProcess(lamb: LambSheep): void {
    new Promise(resolve => setTimeout(resolve, this.timeOfLambGrowth)).then(() => this.onLambGrown(lamb));
  }

  private onLambGrown(lamb: LambSheep): void {
    this.createAndAssignSheep(lamb.getName(), this.getRandomAdultSheepGender(), lamb.getFieldTheSheepIsAssignedTo());
    lamb.getFieldTheSheepIsAssignedTo().removeOneLamb();
  }

  private sanitizedField(field: Field | string): Field {
    if (field instanceof Field) {
      return field;
    }
    return this.fieldStorage.getFieldByName(field);
  }
}
