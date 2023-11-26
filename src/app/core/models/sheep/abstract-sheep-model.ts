import { Field } from '../field-model';
import { LambSheep } from "./lamb-sheep-model";

export abstract class AbstractSheep {
  protected _name: string;
  protected _isBranded: boolean;
  protected fieldTheSheepIsAssignedTo: Field;
  protected _rowIndexTheSheepIsAssignedTo = -1;

  protected constructor(name: string, field: Field, isBranded: boolean = false) {
    this._name = name;
    this.fieldTheSheepIsAssignedTo = field;
    this._isBranded = isBranded;
    field.allSheep.push(this);
  }

  static isLamb(sheep: AbstractSheep): sheep is LambSheep {
    return !sheep.isAdult;
  }

  setRowIndex(value: number): void {
    this._rowIndexTheSheepIsAssignedTo = value;
  }

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

  brand(): void {
    this._isBranded = true;
  }

  get rowIndex(): number {
    return this._rowIndexTheSheepIsAssignedTo;
  }
}
