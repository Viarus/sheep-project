import { FemaleSheep } from '../sheep/female-sheep-model';
import { MaleSheep } from '../sheep/male-sheep-model';

export class RowOfSheep {
  private femaleSheep: FemaleSheep | null;
  private maleSheep: MaleSheep | null;

  constructor(femaleSheep: FemaleSheep | null, maleSheep: MaleSheep | null) {
    this.femaleSheep = femaleSheep;
    this.maleSheep = maleSheep;
  }

  public isMatingHappening(): boolean {
  }
}
