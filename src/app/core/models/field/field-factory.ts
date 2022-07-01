import {Field} from "./field-model";
import {fieldsData} from "../../data/fields-data";
import {toastService} from "../../services/toast-service";

class FieldFactory{
    public createField(fieldName: string): void {
        const newField = new Field(fieldName);
        try {
            fieldsData.addFieldNameToArray(fieldName);
        } catch (e) {
            toastService.generateError(e.message);
            return;
        }
        fieldsData.addFieldToArray(newField);
    }
}

export const fieldFactory = new FieldFactory();