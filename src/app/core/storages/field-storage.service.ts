import { Injectable } from '@angular/core';
import { Field } from '../models/field/field-model';
import { Subject } from 'rxjs';
import { PublicConstantsService } from '../constants/public-constants.service';

@Injectable({
  providedIn: 'root'
})
export class FieldStorageService {
  private fields: Field[] = [];
  private fieldNames: string[] = [];
  private fieldNamesSubject: Subject<string[]> = new Subject<string[]>();
  private fieldsSubject: Subject<string[]> = new Subject<string[]>();

  constructor(private publicConstants: PublicConstantsService) { }

  addFieldNameToArray(newFieldName: string) {
    this.fieldNames.forEach((fieldName) => {
      if (fieldName === newFieldName) {
        throw new Error(this.publicConstants.FIELD_NAME_EXISTS_EXCEPTION);
      }
    })
    this.fieldNames.push(newFieldName);
    this.fieldNamesSubject.next(this.fieldNames);
  }

  addFieldToArray(newField: Field) {
    this.fields.push(newField);
    this.fieldsSubject.next(this.fieldNames);
  }

  public getFieldByName(name: string): Field {
    if (!name) {
      throw new Error(this.publicConstants.PLEASE_SELECT_THE_FIELD);
    }
    let fetchedField: Field | null = null;
    for (let field of this.fields) {
      if (field.getFieldName() === name) {
        fetchedField = field;
        break;
      }
    }
    if (!!fetchedField) {
      return fetchedField;
    }
    throw new Error(this.publicConstants.FIELD_NOT_FOUND_EXCEPTION);
  }

  public getFieldByArrayIndex(index: number): Field | null {
    if (this.fields.length < 1) {
      return null;
    }
    return this.fields[index];
  }

  public getFields(): Field[] {
    return this.fields;
  }

  public getFieldNames(): string[] {
    return this.fieldNames;
  }

  public getFieldNamesSubject(): Subject<string[]> {
    return this.fieldNamesSubject;
  }

  public getFieldsSubject(): Subject<string[]> {
    return this.fieldsSubject;
  }
}
