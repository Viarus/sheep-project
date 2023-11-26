import { Injectable } from '@angular/core';
import { Field } from '../models/field/field-model';
import { PublicConstantsService } from '../constants/public-constants.service';
import { ErrorHandlerService } from "../services/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class FieldStorageService {
  private _fields: Field[] = [];
  private fieldNames: string[] = [];

  constructor(private publicConstants: PublicConstantsService, private errorHandler: ErrorHandlerService) {
  }

  createField(fieldName: string): void {
    if (this.fieldNames.includes(fieldName)) {
      this.errorHandler.handleError(this.publicConstants.FIELD_NAME_EXISTS_EXCEPTION);
      return;
    }

    this.fieldNames.push(fieldName);
    this._fields.push(new Field(fieldName));
  }

  addFieldToArray(newField: Field): void {
    this._fields.push(newField);
  }

  getFieldByName(name: string): Field {
    if (!name) {
      throw new Error(this.publicConstants.PLEASE_SELECT_THE_FIELD);
    }

    const fetchedField: Field | undefined = this.fields.find((field) => field.getFieldName() === name);

    if (!!fetchedField) {
      return fetchedField;
    }

    throw new Error(this.publicConstants.FIELD_NOT_FOUND_EXCEPTION);
  }

  get fields(): Field[] {
    return this._fields;
  }
}
