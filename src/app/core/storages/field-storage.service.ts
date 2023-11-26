import { Injectable } from '@angular/core';
import { Field } from '../models/field-model';
import { ErrorHandlerService } from "../services/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class FieldStorageService {
  private _fields: Field[] = [];
  private fieldNames: string[] = [];

  private readonly pleaseSelectTheFieldErrorMessage = 'Please select the field!';
  private readonly fieldNameDoNotExistsErrorMessage = 'Field name do not exists!';
  private readonly fieldNameExistsErrorMessage = 'Field name already exists! Try a different name.';



  constructor(private errorHandler: ErrorHandlerService) {
  }

  createField(fieldName: string): void {
    if (this.fieldNames.includes(fieldName)) {
      this.errorHandler.handleError(this.fieldNameExistsErrorMessage);
      return;
    }

    this.fieldNames.push(fieldName);
    this._fields.push(new Field(fieldName));
  }

  getFieldByName(name: string): Field {
    if (!name) {
      throw new Error(this.pleaseSelectTheFieldErrorMessage);
    }

    const fetchedField: Field | undefined = this.fields.find((field) => field.fieldName === name);
    if (!!fetchedField) {
      return fetchedField;
    }

    throw new Error(this.fieldNameDoNotExistsErrorMessage);
  }

  get fields(): Field[] {
    return this._fields;
  }
}
