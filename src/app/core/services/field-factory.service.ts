import { Injectable } from '@angular/core';
import { Field } from '../models/field/field-model';
import { FieldStorageService } from '../storages/field-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FieldFactoryService {

  constructor(private fieldStorage: FieldStorageService) {
  }

  public createField(fieldName: string): void {
    const newField = new Field(fieldName);
    try {
      this.fieldStorage.addFieldNameToArray(fieldName);
    } catch (e) {
      toastService.generateError(e.message);
      return;
    }
    this.fieldStorage.addFieldToArray(newField);
  }
}
