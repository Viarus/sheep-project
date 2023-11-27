import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field-model';
import { Observable, timer } from "rxjs";

export class LambSheep extends AbstractSheep {
  private readonly lambCantBeAssignedErrorMessage = "Lamb can't be assigned to a row!";
  private readonly timeOfLambGrowth = 12000;
  private readonly _lambGrown$: Observable<number>;

  constructor(name: string, field: Field) {
    super(name, field, false);
    field.lambs.push(this);
    this._lambGrown$ = timer(this.timeOfLambGrowth);
  }

  override get isAdult(): boolean {
    return false;
  }

  get lambGrown$(): Observable<number> {
    return this._lambGrown$;
  }

  override get rowIndex(): number {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  override setRowIndex(value: number) {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }
}
