import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field/field-model';
import { RowOfSheep } from '../row-of-sheep/row-of-sheep-model';

export class FemaleSheep extends AbstractSheep {
  constructor(name: string, field: Field, isBranded: boolean = false) {
    super(name, field, isBranded);
  }

  override assignToField(field: Field): void {
    field.pushIntoFemaleSheepInsideArray(this);
  }

  override getIndexOfNewRowForSheep(field: Field): number {
    return field.allFemaleSheep.length - 1;
  }

  override assignToRow(field: Field, rowIndex: number): void {
    field.rows[rowIndex].setFemaleSheep(this);
  }

  override createNewRowAndAssignSheepThere(field: Field): void {
    field.pushIntoRowsArray(new RowOfSheep(this, undefined));
  }
}
