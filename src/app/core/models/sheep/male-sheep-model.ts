import {AbstractSheep} from "./abstract-sheep-model";
import {Field} from "../field/field-model";

export class MaleSheep extends AbstractSheep{
    constructor(name: string, field: Field, isBranded: boolean = false) {
        super(name, field, isBranded);
    }
}