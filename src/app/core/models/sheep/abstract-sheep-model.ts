import { Field } from '../field/field-model';

export abstract class AbstractSheep {
  protected _name: string;
  protected _isBranded: boolean;
  protected fieldTheSheepIsAssignedTo: Field;
  protected _rowIndexTheSheepIsAssignedTo: number | undefined;

  protected constructor(name: string, field: Field, isBranded: boolean = false) {
    this._name = name;
    this.fieldTheSheepIsAssignedTo = field;
    this._isBranded = isBranded;
  }

  abstract assignToField(field: Field): void

  abstract getIndexOfNewRowForSheep(field: Field): number

  abstract assignToRow(field: Field, rowIndex: number): void

  abstract createNewRowAndAssignSheepThere(field: Field): void

  getName(): string {
    return this._name;
  }

  isBranded(): boolean {
    return this._isBranded;
  }

  getFieldTheSheepIsAssignedTo(): Field {
    return this.fieldTheSheepIsAssignedTo;
  }

  setIsBranded(value: boolean): void {
    this._isBranded = value;
  }

  getRowIndexTheSheepIsAssignedTo(): number | undefined {
    return this._rowIndexTheSheepIsAssignedTo;
  }

  setRowIndexTheSheepIsAssignedTo(value: number): void {
    this._rowIndexTheSheepIsAssignedTo = value;
  }
}
