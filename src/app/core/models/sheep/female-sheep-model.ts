import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field-model';
import { RowOfSheep } from '../row-of-sheep-model';

export class FemaleSheep extends AbstractSheep {
  constructor(name: string, field: Field, isBranded: boolean = false) {
    super(name, field, isBranded);
    const newRowIndex = field.allFemaleSheep.length;
    field.numberOfRows > newRowIndex ? field.rows[newRowIndex].setFemaleSheep(this) : field.rows.push(new RowOfSheep(this, undefined, field));
    this.setRowIndex(newRowIndex);
    field.allFemaleSheep.push(this);
  }
}
