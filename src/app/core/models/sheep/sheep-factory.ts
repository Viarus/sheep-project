import {MaleSheep} from "./male-sheep-model";
import {FemaleSheep} from "./female-sheep-model";
import {publicConstants} from "../../constants/public-constants";
import {LambSheep} from "./lamb-sheep-model";
import {Field} from "../field/field-model";
import {AbstractSheep} from "./abstract-sheep-model";
import {Subject} from "rxjs";

class SheepFactory {

    readonly gender_female = 'FEMALE';
    readonly gender_male = 'MALE';
    readonly gender_lamb = 'LAMB';
    readonly gender_random = 'RANDOM';

    private sheepCounter: number = 0;
    private sheepCounterSubject: Subject<number> = new Subject<number>();

    readonly arrayOfAllSheepGenders: string[] = [
        this.gender_female,
        this.gender_lamb,
        this.gender_male
    ]

    public createAndAssignSheep(name: string, gender: string, field: Field, isBranded = false): MaleSheep | FemaleSheep | LambSheep {
        let newSheep: AbstractSheep;
        if (gender === this.gender_random) {
            const specifiedGender = this.getRandomSheepGender();
            newSheep = this.createSheepWithSpecifiedGender(name, specifiedGender, field, isBranded);
        } else {
            newSheep = this.createSheepWithSpecifiedGender(name, gender, field, isBranded);
        }
        field.addSheep(newSheep);
        this.sheepCounter++;
        this.sheepCounterSubject.next(this.sheepCounter);
        return newSheep;
    }

    public getRandomSheepGender(): string {
        return this.arrayOfAllSheepGenders[Math.floor(Math.random() * this.arrayOfAllSheepGenders.length)];
    }

    public getRandomAdultSheepGender(): string {
        if (Math.random() >= 0.5) {
            return this.gender_female;
        }
        return this.gender_male;
    }

    private createSheepWithSpecifiedGender(name: string, gender: string, field: Field, isBranded = false): MaleSheep | FemaleSheep | LambSheep {
        switch (gender) {
            case this.gender_female:
                return new FemaleSheep(name, field, isBranded);
            case this.gender_male:
                return new MaleSheep(name, field, isBranded);
            case this.gender_lamb:
                return new LambSheep(name, field, isBranded);
            default:
                throw new Error(publicConstants.WRONG_SHEEP_GENDER_EXCEPTION);
        }
    }

    public getSheepCounterSubject(): Subject<number> {
        return this.sheepCounterSubject;
    }
}

export const sheepFactory = new SheepFactory();