import {Field} from "../field/field-model";

export abstract class AbstractSheep {
    protected _name: string;
    protected _isBranded: boolean;
    protected _fieldTheSheepIsAssignedTo: Field;

    protected constructor(name: string, field: Field, isBranded: boolean = false) {
        this._name = name;
        this._fieldTheSheepIsAssignedTo = field;
        this._isBranded = isBranded;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public isBranded(): boolean {
        return this._isBranded;
    }

    public getFieldTheSheepIsAssignedTo(): Field {
        return this._fieldTheSheepIsAssignedTo;
    }

    public setIsBranded(value: boolean): void {
        this._isBranded = value;
    }
}