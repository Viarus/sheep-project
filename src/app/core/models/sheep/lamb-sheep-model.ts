import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field-model';
import { map, Observable, timer } from "rxjs";

export class LambSheep extends AbstractSheep {
  private readonly lambCantBeAssignedErrorMessage = "Lamb can't be assigned to a row!";
  private readonly timeOfLambGrowth = 12000;
  private readonly _lambGrown$: Observable<LambSheep>;

  constructor(name: string, field: Field) {
    super(name, field, false);
    field.lambs.push(this);
    this._lambGrown$ = timer(this.timeOfLambGrowth).pipe(map(() => this));
  }

  override get isAdult(): boolean {
    return false;
  }

  get lambGrown$(): Observable<LambSheep> {
    return this._lambGrown$;
  }

  override get rowIndex(): number {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }

  override setRowIndex(value: number) {
    throw new Error(this.lambCantBeAssignedErrorMessage);
  }
}
