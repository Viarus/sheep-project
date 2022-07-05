import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field/field-model';

export class LambSheep extends AbstractSheep {
  constructor(name: string, field: Field) {
    super(name, field, false);
  }
}
