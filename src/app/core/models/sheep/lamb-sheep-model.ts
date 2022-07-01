import {AbstractSheep} from "./abstract-sheep-model";
import {Field} from "../field/field-model";
import {sheepFactory} from "./sheep-factory";
import {lambSheepGrowingService} from "../../services/lamb-sheep-growing-service";
import {toastService} from "../../services/toast-service";

export class LambSheep extends AbstractSheep {
    constructor(name: string, field: Field, isBranded: boolean = false) {
        super(name, field, isBranded);
        try {
            this.lambGrowUpAfter(12000);
        } catch (e) {
            toastService.generateError(e.message);
        }
    }

    public lambGrowUpAfter(timeout: number): void {
        new Promise(res => setTimeout(res, timeout)).then(() => {
            try {
                sheepFactory.createAndAssignSheep(this.getName(), sheepFactory.getRandomAdultSheepGender(), this.getFieldTheSheepIsAssignedTo());
            } catch (e) {
                toastService.generateError(e.message);
            }
            // normally we should identify a specific sheep, but I don't have enough time for that now :)
            this.getFieldTheSheepIsAssignedTo().getLambSheep().pop();
            let indexToDelete: number = -1;
            this.getFieldTheSheepIsAssignedTo().getAllSheep().forEach((sheep, index) => {
                if (sheep instanceof LambSheep) {
                    indexToDelete = index;
                }
            });
            if (indexToDelete >= 0) {
                this.getFieldTheSheepIsAssignedTo().getAllSheep().splice(indexToDelete, 1);
            } else {
                throw new Error("Lamb sheep has escaped from growing up, I guess it will be happy forever...");
            }
            lambSheepGrowingService.refreshLambsAndSheep();
        })
    }
}