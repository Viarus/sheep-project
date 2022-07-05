import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field/field-model';
import { RowOfSheep } from '../row-of-sheep/row-of-sheep-model';

export class MaleSheep extends AbstractSheep {
  constructor(name: string, field: Field, isBranded: boolean = false) {
    super(name, field, isBranded);
  }

  public override assignToField(field: Field): void {
    field.pushIntoMaleSheepInsideArray(this);
  }

  public override getIndexOfNewRowForSheep(field: Field): number {
    return field.getMaleSheep().length - 1;
  }

  public override assignToRow(field: Field, rowIndex: number): void {
    field.getRows()[rowIndex].setMaleSheep(this);
  }

  public override createNewRowAndAssignSheepThere(field: Field, rowIndex: number): void {
    field.pushIntoRowsArray(new RowOfSheep(field.getFieldName(), rowIndex, undefined, this));
  }
}
