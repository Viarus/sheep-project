import { Injectable } from '@angular/core';
import { Field } from '../models/field/field-model';
import { Subject } from 'rxjs';
import { PublicConstantsService } from '../constants/public-constants.service';

@Injectable({
  providedIn: 'root'
})
export class FieldStorageService {
  private _fields: Field[] = [];
  private fieldNames: string[] = [];
  private fieldNamesSubject: Subject<string[]> = new Subject<string[]>();
  private fieldsSubject: Subject<Field[]> = new Subject<Field[]>();

  constructor(private publicConstants: PublicConstantsService) {
  }

  addFieldNameToArray(newFieldName: string): void {
    if (this.fieldNames.includes(newFieldName)) {
      throw new Error(this.publicConstants.FIELD_NAME_EXISTS_EXCEPTION);
    }

    this.fieldNames.push(newFieldName);
    this.fieldNamesSubject.next(this.fieldNames);
  }

  addFieldToArray(newField: Field): void {
    this._fields.push(newField);
    this.fieldsSubject.next(this._fields);
  }

  getFieldByName(name: string): Field {
    if (!name) {
      throw new Error(this.publicConstants.PLEASE_SELECT_THE_FIELD);
    }
    let fetchedField: Field | null = null;
    for (let field of this._fields) {
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

  get fields(): Field[] {
    return this._fields;
  }

  getFieldNamesSubject(): Subject<string[]> {
    return this.fieldNamesSubject;
  }

  getFieldsSubject(): Subject<Field[]> {
    return this.fieldsSubject;
  }
}
