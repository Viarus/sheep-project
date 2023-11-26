import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field-model';
import { RowOfSheep } from '../row-of-sheep-model';

export class MaleSheep extends AbstractSheep {
  constructor(name: string, field: Field, isBranded: boolean = false) {
    super(name, field, isBranded);
    const newRowIndex = field.allMaleSheep.length;
    field.numberOfRows > newRowIndex ? field.rows[newRowIndex].setMaleSheep(this) : field.rows.push(new RowOfSheep(undefined, this, field));
    this.setRowIndex(newRowIndex);
    field.allMaleSheep.push(this);
  }
}
