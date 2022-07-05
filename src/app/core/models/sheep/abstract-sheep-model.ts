import { Field } from '../field/field-model';

export abstract class AbstractSheep {
  protected _name: string;
  protected _isBranded: boolean;
  protected fieldTheSheepIsAssignedTo: Field;
  protected _rowIndexTheSheepIsAssignedTo: number | undefined;

  private METHOD_CALLED_ON_PARENT_ERROR_MESSAGE = 'Method called on the parent class.';

  protected constructor(name: string, field: Field, isBranded: boolean = false) {
    this._name = name;
    this.fieldTheSheepIsAssignedTo = field;
    this._isBranded = isBranded;
  }

  public assignToField(field: Field): void {
    throw new Error(this.METHOD_CALLED_ON_PARENT_ERROR_MESSAGE);
  }

  public getIndexOfNewRowForSheep(field: Field): number {
    throw new Error(this.METHOD_CALLED_ON_PARENT_ERROR_MESSAGE);
  }

  public assignToRow(field: Field, rowIndex: number): void {
    throw new Error(this.METHOD_CALLED_ON_PARENT_ERROR_MESSAGE);
  }

  public createNewRowAndAssignSheepThere(field: Field, rowIndex: number): void {
    throw new Error(this.METHOD_CALLED_ON_PARENT_ERROR_MESSAGE);
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
