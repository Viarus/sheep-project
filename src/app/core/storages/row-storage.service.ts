import { Injectable } from '@angular/core';
import { RowOfSheep } from '../models/row-of-sheep/row-of-sheep-model';
import { Field } from '../models/field/field-model';

@Injectable({
  providedIn: 'root'
})
export class RowStorageService {
  private rows: RowOfSheep[] = [];

  constructor() {
  }

  public registerNewRow(row: RowOfSheep) {
    this.rows.push(row);
  }

  public getRowsForField(field: Field): RowOfSheep[] {
    return this.rows.filter((row) => {
      return row.getFieldName() === field.getFieldName();
    })
  }

  public updateRowsInField(field: Field, rows: RowOfSheep[]) {

  }

}
