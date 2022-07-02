import { Field } from '../field/field-model';

export abstract class AbstractSheep {
  protected _name: string;
  protected isBranded: boolean;
  protected fieldTheSheepIsAssignedTo: Field;

  protected constructor(name: string, field: Field, isBranded: boolean = false) {
    this._name = name;
    this.fieldTheSheepIsAssignedTo = field;
    this.isBranded = isBranded;
  }

  public setName(name: string): void {
    this._name = name;
  }

  public getName(): string {
    return this._name;
  }

  public getIsBranded(): boolean {
    return this.isBranded;
  }

  public getFieldTheSheepIsAssignedTo(): Field {
    return this.fieldTheSheepIsAssignedTo;
  }

  public setIsBranded(value: boolean): void {
    this.isBranded = value;
  }
}
