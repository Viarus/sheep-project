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

  public getName(): string {
    return this._name;
  }

  public isBranded(): boolean {
    return this._isBranded;
  }

  public getFieldTheSheepIsAssignedTo(): Field {
    return this.fieldTheSheepIsAssignedTo;
  }

  public setIsBranded(value: boolean): void {
    this._isBranded = value;
  }

  public getRowIndexTheSheepIsAssignedTo(): number | undefined {
    return this._rowIndexTheSheepIsAssignedTo;
  }

  public setRowIndexTheSheepIsAssignedTo(value: number): void {
    this._rowIndexTheSheepIsAssignedTo = value;
  }
}
