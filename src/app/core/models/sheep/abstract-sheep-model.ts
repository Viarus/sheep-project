import { Field } from '../field-model';
import { LambSheep } from "./lamb-sheep-model";

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

  static isLamb(sheep: AbstractSheep): sheep is LambSheep {
    return !sheep.isAdult;
  }

  abstract getIndexOfNewRowForSheep(field: Field): number

  abstract assignToRow(field: Field, rowIndex: number): void

  abstract createNewRowAndAssignSheepThere(field: Field): void

  abstract setRowIndexTheSheepIsAssignedTo(field: Field, value: number): void

  get name(): string {
    return this._name;
  }

  get isAdult(): boolean {
    return true;
  }

  get isBranded(): boolean {
    return this._isBranded;
  }

  get field(): Field {
    return this.fieldTheSheepIsAssignedTo;
  }

  setIsBranded(value: boolean): void {
    this._isBranded = value;
  }

  get rowIndex(): number | undefined {
    return this._rowIndexTheSheepIsAssignedTo;
  }

}
