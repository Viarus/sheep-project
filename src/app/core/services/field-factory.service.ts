import { Injectable } from '@angular/core';
import { Field } from '../models/field/field-model';
import { FieldStorageService } from '../storages/field-storage.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FieldFactoryService {

  constructor(private fieldStorage: FieldStorageService, private errorHandler: ErrorHandlerService) {
  }

  createField(fieldName: string): void {
    const newField = new Field(fieldName);
    try {
      this.fieldStorage.addFieldNameToArray(fieldName);
    } catch (e) {
      this.errorHandler.handleError(e);
      return;
    }
    this.fieldStorage.addFieldToArray(newField);
  }
}
