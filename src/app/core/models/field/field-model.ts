import { AbstractSheep } from '../sheep/abstract-sheep-model';
import { MaleSheep } from '../sheep/male-sheep-model';
import { FemaleSheep } from '../sheep/female-sheep-model';
import { LambSheep } from '../sheep/lamb-sheep-model';
import { RowOfSheep } from '../row-of-sheep/row-of-sheep-model';

export class Field {
  private readonly fieldName: string;
  private rows: RowOfSheep[] = []
  private sheepInside: AbstractSheep[] = [];
  private maleSheepInside: MaleSheep[] = [];
  private femaleSheepInside: FemaleSheep[] = [];
  private lambSheepInside: LambSheep[] = [];

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  addSheep(sheep: AbstractSheep): void {
    this.sheepInside.push(sheep);
    sheep.assignToField(this);
  }

  assignSheepToRow(sheep: AbstractSheep, numberOfRowsBeforeNewSheepAdded: number): number | null {
    if (sheep instanceof LambSheep) {
      return null;
    }

    const indexOfNewRow: number = sheep.getIndexOfNewRowForSheep(this);
    if (numberOfRowsBeforeNewSheepAdded > indexOfNewRow) {
      sheep.assignToRow(this, indexOfNewRow);
    } else {
      sheep.createNewRowAndAssignSheepThere(this);
    }

    sheep.setRowIndexTheSheepIsAssignedTo(indexOfNewRow);
    return indexOfNewRow;
  }

  getArrayOfTheBiggerAmountOfSheep(): AbstractSheep[] {
    return this.getFemaleSheep().length > this.getMaleSheep().length ? this.getFemaleSheep() : this.getMaleSheep();
  }

  pushIntoFemaleSheepInsideArray(sheep: FemaleSheep): void {
    this.femaleSheepInside.push(sheep);
  }

  pushIntoMaleSheepInsideArray(sheep: MaleSheep): void {
    this.maleSheepInside.push(sheep);
  }

  pushIntoLambSheepInsideArray(sheep: LambSheep): void {
    this.lambSheepInside.push(sheep);
  }

  pushIntoRowsArray(row: RowOfSheep): void {
    this.rows.push(row);
  }

  getNumberOfRows(): number {
    return this.getArrayOfTheBiggerAmountOfSheep().length;
  }

  getFieldName(): string {
    return this.fieldName;
  }

  getRows(): RowOfSheep[] {
    return this.rows;
  }

  getAllSheep(): AbstractSheep[] {
    return this.sheepInside;
  }

  getMaleSheep(): MaleSheep[] {
    return this.maleSheepInside;
  }

  getFemaleSheep(): FemaleSheep[] {
    return this.femaleSheepInside;
  }

  getLambSheep(): LambSheep[] {
    return this.lambSheepInside;
  }

  getRandomUnbrandedSheep(): AbstractSheep | null {
    const allUnbrandedSheep = this.getAllUnbrandedSheep();
    if (allUnbrandedSheep.length > 0) {
      return this.getAllUnbrandedSheep()[Math.floor(Math.random() * this.getAllUnbrandedSheep().length)];
    }
    return null;
  }

  removeOneLamb(): void {
    this.getLambSheep().pop();

    let indexToDelete = -1;
    this.getAllSheep().forEach((sheep, index) => {
      if (sheep instanceof LambSheep) {
        indexToDelete = index;
      }
    });

    if (indexToDelete >= 0) {
      this.getAllSheep().splice(indexToDelete, 1);
    } else {
      throw new Error('Lamb has escaped from growing up, I guess it will be happy forever...');
    }
  }

  private getAllUnbrandedSheep(): AbstractSheep[] {
    return this.sheepInside.filter((sheep) => {
      return !sheep.isBranded() && !(sheep instanceof LambSheep);
    })
  }
}
