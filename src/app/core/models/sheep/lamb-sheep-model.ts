import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field-model';

export class LambSheep extends AbstractSheep {
  private readonly lambCantBeAssignedErrorMessage = "Lamb can't be assigned to a row!";

  override assignToRow(field: Field, rowIndex: number): void {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  override createNewRowAndAssignSheepThere(field: Field): void {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  override getIndexOfNewRowForSheep(field: Field): number {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  constructor(name: string, field: Field) {
    super(name, field, false);
  }

  override assignToField(field: Field): void {
    field.pushIntoLambSheepInsideArray(this);
  }
}
