import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FieldStorageService } from '../core/storages/field-storage.service';
import { SheepFactoryService } from '../core/services/sheep-factory.service';
import { PublicConstantsService } from '../core/constants/public-constants.service';
import { FieldFactoryService } from '../core/services/field-factory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-interface',
  templateUrl: './input-interface.component.html',
  styleUrls: ['./input-interface.component.css']
})
export class InputInterfaceComponent implements OnInit, OnDestroy {
  sheepNameInput = '';
  selectedGender: string = this.getAllSheepGenders()[0];
  isBrandedSelected = false;
  fieldNameInput = '';

  selectedField: string[] = [];
  selectedFieldName = '';

  private fieldNames: string[] = this.fieldStorage.fields.map(field => field.getFieldName());
  private fieldStorageNamesSubscription: Subscription = new Subscription();

  constructor(private toastrService: ToastrService,
              private fieldStorage: FieldStorageService,
              private sheepFactory: SheepFactoryService,
              private publicConstants: PublicConstantsService,
              private fieldFactory: FieldFactoryService) {
  }

  ngOnInit(): void {
    this.fieldStorageNamesSubscription = this.fieldStorage.getFieldNamesSubject().subscribe((names) => {
      this.fieldNames = [...names];
    })
  }

  ngOnDestroy(): void {
    this.fieldStorageNamesSubscription.unsubscribe();
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
      this.isFieldNamesEmpty() ||
      !this.selectedFieldName ||
      !this.sheepNameInput
    );
  }

  onAddField(): void {
    if (!this.isFieldNameInputEmpty()) {
      this.fieldFactory.createField(this.fieldNameInput);
    }
  }

  isFieldNameInputEmpty(): boolean {
    return !this.fieldNameInput;
  }

  getFieldNames(): string[] {
    return this.fieldNames;
  }

  isFieldNamesEmpty(): boolean {
    return this.fieldNames.length === 0;
  }

  getAllSheepGenders(): string[] {
    return [...this.sheepFactory.arrayOfAllSheepGenders];
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
