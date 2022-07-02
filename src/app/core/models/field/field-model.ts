import {AbstractSheep} from "../sheep/abstract-sheep-model";
import {MaleSheep} from "../sheep/male-sheep-model";
import {FemaleSheep} from "../sheep/female-sheep-model";
import {LambSheep} from "../sheep/lamb-sheep-model";

export class Field {
    private readonly fieldName: string;
    private sheepInside: AbstractSheep[] = [];
    private maleSheepInside: MaleSheep[] = [];
    private femaleSheepInside: FemaleSheep[] = [];
    private lambSheepInside: LambSheep[] = [];

    constructor(fieldName: string) {
        this.fieldName = fieldName;
    }

    public addSheep(sheep: AbstractSheep): void {
        this.sheepInside.push(sheep);

        // Indexing sheep too, because we are going to query them often.
        if (sheep instanceof MaleSheep) {
            this.maleSheepInside.push(sheep);
        }
        if (sheep instanceof FemaleSheep) {
            this.femaleSheepInside.push(sheep);
        }
        if (sheep instanceof LambSheep) {
            this.lambSheepInside.push(sheep);
        }
    }

    public getFieldName(): string {
        return this.fieldName;
    }

    public getAllSheep(): AbstractSheep[] {
        return this.sheepInside;
    }

    public getMaleSheep(): MaleSheep[] {
        return this.maleSheepInside;
    }

    public getFemaleSheep(): FemaleSheep[] {
        return this.femaleSheepInside;
    }

    public getLambSheep(): LambSheep[] {
        return this.lambSheepInside;
    }

    public getMaleSheepByIndex(index: number): MaleSheep | null {
        if (index > this.maleSheepInside.length - 1) {
            return null;
        }
        return this.maleSheepInside[index];
    }

    public getFemaleSheepByIndex(index: number): FemaleSheep | null {
        if (index > this.femaleSheepInside.length - 1) {
            return null;
        }
        return this.femaleSheepInside[index];
    }

    public getLambSheepByIndex(index: number): LambSheep | null {
        if (index > this.lambSheepInside.length - 1) {
            return null;
        }
        return this.lambSheepInside[index];
    }

    public getRandomUnbrandedSheep(): AbstractSheep {
        return this.getAllUnbrandedSheep()[Math.floor(Math.random() * this.getAllUnbrandedSheep().length)];
    }

    private getAllUnbrandedSheep(): AbstractSheep[] {
        const unbrandedSheepArray: AbstractSheep[] = [];
        this.sheepInside.forEach((sheep) => {
            if (!sheep.isBranded()){
                unbrandedSheepArray.push(sheep);
            }
        })
        return unbrandedSheepArray;
    }
}
