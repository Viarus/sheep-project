import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field-model';

export class LambSheep extends AbstractSheep {
  private readonly lambCantBeAssignedErrorMessage = "Lamb can't be assigned to a row!";

  constructor(name: string, field: Field) {
    super(name, field, false);
  }

  override get isAdult(): boolean {
    return false;
  }

  override assignToRow(field: Field, rowIndex: number): void {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  override createNewRowAndAssignSheepThere(field: Field): void {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  override getIndexOfNewRowForSheep(field: Field): number {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  override setRowIndexTheSheepIsAssignedTo(field: Field, value: number) {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }
}
