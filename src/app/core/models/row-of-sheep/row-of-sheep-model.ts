import { FemaleSheep } from '../sheep/female-sheep-model';
import { MaleSheep } from '../sheep/male-sheep-model';

export class RowOfSheep {
  private _femaleSheep: FemaleSheep | undefined;
  private _maleSheep: MaleSheep | undefined;
  private _rowIndex: number;
  private _fieldName: string;
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

  public getFemaleSheep(): FemaleSheep | undefined {
    return this._femaleSheep;
  }

  public getMaleSheep(): MaleSheep | undefined {
    return this._maleSheep;
  }

  public getRowIndex(): number {
    return this._rowIndex;
  }

  public getFieldName(): string {
    return this._fieldName;
  }

  public getIsMatingNow(): boolean {
    return this._isMatingNow;
  }

  public getDidMatingProcessOccurRecently(): boolean {
    return this._didMatingProcessOccurRecently;
  }

  public setIsMatingNow(value: boolean): void {
    this._isMatingNow = value;
  }

  public setDidMatingProcessOccurRecently(value: boolean): void {
    this._didMatingProcessOccurRecently = value;
  }

  public setFemaleSheep(value: FemaleSheep): void {
    this._femaleSheep = value;
  }

  public setMaleSheep(value: MaleSheep): void {
    this._maleSheep = value;
  }
}
