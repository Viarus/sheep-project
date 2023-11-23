import { FemaleSheep } from '../sheep/female-sheep-model';
import { MaleSheep } from '../sheep/male-sheep-model';
import { AbstractSheep } from "../sheep/abstract-sheep-model";

export class RowOfSheep {
  private _femaleSheep: FemaleSheep | undefined;
  private _maleSheep: MaleSheep | undefined;
  private readonly _rowIndex: number;
  private readonly _fieldName: string;
  private _isMatingNow: boolean;
  private _didMatingProcessOccurRecently = false;

  constructor(fieldName: string,
              rowIndex: number,
              femaleSheep: FemaleSheep | undefined,
              maleSheep: MaleSheep | undefined,
              isMatingNow: boolean = false,
              didMatingProcessOccurRecently: boolean = false) {
    this._femaleSheep = femaleSheep;
    this._maleSheep = maleSheep;
    this._rowIndex = rowIndex;
    this._fieldName = fieldName;
    this._isMatingNow = isMatingNow;
    this._didMatingProcessOccurRecently = didMatingProcessOccurRecently;
  }

  get femaleSheep(): FemaleSheep | undefined {
    return this._femaleSheep;
  }

  get maleSheep(): MaleSheep | undefined {
    return this._maleSheep;
  }

  get allSheep(): AbstractSheep[] {
    return [this.maleSheep, this.femaleSheep].filter((x): x is AbstractSheep => !!x);
  }

  getRowIndex(): number {
    return this._rowIndex;
  }

  get isMatingNow(): boolean {
    return this._isMatingNow;
  }

  didMatingProcessOccurRecently(): boolean {
    return this._didMatingProcessOccurRecently;
  }

  setIsMatingNow(value: boolean): void {
    this._isMatingNow = value;
  }

  setDidMatingProcessOccurRecently(value: boolean): void {
    this._didMatingProcessOccurRecently = value;
  }

  setFemaleSheep(value: FemaleSheep): void {
    this._femaleSheep = value;
  }

  setMaleSheep(value: MaleSheep): void {
    this._maleSheep = value;
  }
}
