import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field-model';
import { RowOfSheep } from '../row-of-sheep-model';

export class MaleSheep extends AbstractSheep {
  constructor(name: string, field: Field, isBranded: boolean = false) {
    super(name, field, isBranded);
  }

  override assignToField(field: Field): void {
    field.pushIntoMaleSheepInsideArray(this);
  }

  override getIndexOfNewRowForSheep(field: Field): number {
    return field.allMaleSheep.length - 1;
  }

  override assignToRow(field: Field, rowIndex: number): void {
    field.rows[rowIndex].setMaleSheep(this);
  }

  override createNewRowAndAssignSheepThere(field: Field): void {
    field.pushIntoRowsArray(new RowOfSheep(undefined, this));
  }
}
