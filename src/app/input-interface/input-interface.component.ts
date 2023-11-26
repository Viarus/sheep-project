import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FieldStorageService } from '../core/storages/field-storage.service';
import { SheepFactoryService } from '../core/services/sheep-factory.service';
import { PublicConstantsService } from '../core/constants/public-constants.service';

@Component({
  selector: 'app-input-interface',
  templateUrl: './input-interface.component.html',
  styleUrls: ['./input-interface.component.css']
})
export class InputInterfaceComponent {
  sheepNameInput = '';
  selectedGender: string = this.getAllSheepGenders()[0];
  isBrandedSelected = false;
  fieldNameInput = '';

  selectedField: string[] = [];
  selectedFieldName = '';

  constructor(private toastrService: ToastrService,
              private sheepFactory: SheepFactoryService,
              private publicConstants: PublicConstantsService,
              public fieldStorage: FieldStorageService) {
  }

  onCreatingSheep(): void {
    if (this.isSheepInputValid()) {
      const newSheep = this.sheepFactory.createAndAssignSheep(this.sheepNameInput, this.selectedGender, this.selectedFieldName, this.isBrandedSelected);
      if (newSheep) {
        this.toastrService.success(this.publicConstants.SHEEP_CREATED_MESSAGE);
      }
    }
  }

  isSheepInputValid(): boolean {
    return !(
      this.noFieldsExist() ||
      !this.selectedFieldName ||
      !this.sheepNameInput
    );
  }

  onAddField(): void {
    if (!this.isFieldNameInputEmpty()) {
      this.fieldStorage.createField(this.fieldNameInput);
    }
  }

  isFieldNameInputEmpty(): boolean {
    return !this.fieldNameInput;
  }

  noFieldsExist(): boolean {
    return this.fieldStorage.fields.length <= 0;
  }

  getAllSheepGenders(): string[] {
    return [...this.sheepFactory.allSheepGenders];
  }

  sanitizeSelectInput(): void {
    //Needed because select element returns an array instead of string.
    if (this.selectedField.length > 0) {
      this.selectedFieldName = this.selectedField[0];
    }
  }

  isLambSelected(): boolean {
    return this.selectedGender === this.sheepFactory.gender_lamb;
  }
}
