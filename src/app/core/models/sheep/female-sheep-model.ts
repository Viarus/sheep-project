import { AbstractSheep } from './abstract-sheep-model';
import { Field } from '../field/field-model';
import { MaleSheep } from './male-sheep-model';

export class FemaleSheep extends AbstractSheep {
  private _isAbleToMate: boolean = false;
  private _isMatingRightNow: boolean = false;
  private _wasMatingInLast8seconds: boolean = false;

  constructor(name: string, field: Field, isBranded: boolean = false) {
    super(name, field, isBranded);
  }

  public setIsAbleToMate(maleSheep: MaleSheep | null): void {
    if (this._wasMatingInLast8seconds || this.isBranded()) {
      this._isAbleToMate = false;
      return;
    }
    if (!!maleSheep) {
      if (maleSheep.isBranded()) {
        this._isAbleToMate = false;
        return;
      }
      this._isAbleToMate = true;
      return;
    }
    this._isAbleToMate = false;
    return;
  }


  public setWasMatingInLast8seconds(value: boolean): void {
    this._wasMatingInLast8seconds = value;
  }

  public wasMatingInLast8seconds(): boolean {
    return this._wasMatingInLast8seconds;
  }

  public isAbleToMate() {
    return this._isAbleToMate;
  }

  public setIsMatingRightNow(value: boolean): void {
    this._isMatingRightNow = value;
  }

  public isMatingRightNow(): boolean {
    return this._isMatingRightNow;
  }
}
