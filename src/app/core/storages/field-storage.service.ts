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

  constructor(private publicConstants: PublicConstantsService) {
  }

  addFieldNameToArray(newFieldName: string): void {
    if (this.fieldNames.includes(newFieldName)) {
      throw new Error(this.publicConstants.FIELD_NAME_EXISTS_EXCEPTION);
    }

    this.fieldNames.push(newFieldName);
  }

  addFieldToArray(newField: Field): void {
    this._fields.push(newField);
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
}
