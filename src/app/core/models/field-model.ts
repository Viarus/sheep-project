import { AbstractSheep } from './sheep/abstract-sheep-model';
import { MaleSheep } from './sheep/male-sheep-model';
import { FemaleSheep } from './sheep/female-sheep-model';
import { LambSheep } from './sheep/lamb-sheep-model';
import { RowOfSheep } from './row-of-sheep-model';

export class Field {
  private readonly _fieldName: string;
  private _rows: RowOfSheep[] = []
  private sheepInside: AbstractSheep[] = [];
  private maleSheepInside: MaleSheep[] = [];
  private femaleSheepInside: FemaleSheep[] = [];
  private lambSheepInside: LambSheep[] = [];

  constructor(fieldName: string) {
    this._fieldName = fieldName;
  }

  addSheep(sheep: AbstractSheep, numberOfRowsBeforeNewSheepAdded: number): void {
    this.sheepInside.push(sheep);
    if (AbstractSheep.isLamb(sheep)) {
      this.lambSheepInside.push(sheep);
      return;
    }

    const indexOfNewRow: number = sheep.getIndexOfNewRowForSheep(this);
    if (numberOfRowsBeforeNewSheepAdded > indexOfNewRow) {
      sheep.assignToRow(this, indexOfNewRow);
    } else {
      sheep.createNewRowAndAssignSheepThere(this);
    }

    sheep.setRowIndexTheSheepIsAssignedTo(this, indexOfNewRow);
  }

  removeOneLamb(lamb: LambSheep): void {
    const indexForLambArray = this.lambSheepInside.findIndex(l => l.name === lamb.name);
    const indexForAllArray = this.sheepInside.findIndex(s => s.name === lamb.name && !s.isAdult);
    if (indexForLambArray >= 0) {
      this.lambSheepInside.splice(indexForLambArray, 1);
    } else {
      throw new Error('Lamb has escaped from growing up, I guess it will be happy forever...');
    }

    if (indexForAllArray >= 0) {
      this.sheepInside.splice(indexForLambArray, 1);
    } else {
      throw new Error('Data is desynchronized! I wonder how...');
    }
  }

  getRandomUnbrandedSheep(): AbstractSheep | null {
    const allUnbrandedSheep = this.sheepInside.filter((sheep) => !(sheep.isBranded || AbstractSheep.isLamb(sheep)));
    return allUnbrandedSheep.length > 0 ? allUnbrandedSheep[Math.floor(Math.random() * allUnbrandedSheep.length)] : null;
  }

  get biggerArrayOfSheep(): AbstractSheep[] {
    return this.femaleSheepInside.length > this.maleSheepInside.length ? this.femaleSheepInside : this.maleSheepInside;
  }

  get numberOfRows(): number {
    return this.biggerArrayOfSheep.length;
  }

  get fieldName(): string {
    return this._fieldName;
  }

  get rows(): RowOfSheep[] {
    return this._rows;
  }

  get allMaleSheep(): MaleSheep[] {
    return this.maleSheepInside;
  }

  get allFemaleSheep(): FemaleSheep[] {
    return this.femaleSheepInside;
  }

  get lambs(): LambSheep[] {
    return this.lambSheepInside;
  }
}
