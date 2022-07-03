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
  public sheepNameInput: string = '';
  public selectedGender: string = this.getAllSheepGenders()[0];
  public isBrandedSelected: boolean = false;
  public fieldNameInput: string = '';

  public selectedField: string[] = [];
  public selectedFieldName: string = '';

  private fieldNames: string[] = this.fieldStorage.getFieldNames();
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

  public onCreatingSheep(): void {
    if (this.isSheepInputValid()) {
      const newSheep = this.sheepFactory.createAndAssignSheep(this.sheepNameInput, this.selectedGender, this.selectedFieldName, this.isBrandedSelected);
      if (newSheep) {
        this.toastrService.success(this.publicConstants.SHEEP_CREATED_MESSAGE);
      }
    }
  }

  public isSheepInputValid(): boolean {
    return !(
      this.isFieldNamesEmpty() ||
      !this.selectedFieldName ||
      !this.sheepNameInput
    );
  }

  public onAddField(): void {
    if (!this.isFieldNameInputEmpty()) {
      this.fieldFactory.createField(this.fieldNameInput);
    }
  }

  public isFieldNameInputEmpty(): boolean {
    return !this.fieldNameInput;
  }

  public getFieldNames(): string[] {
    return this.fieldNames;
  }

  public isFieldNamesEmpty(): boolean {
    return this.fieldNames.length === 0;
  }

  public getAllSheepGenders(): string[] {
    return [...this.sheepFactory.arrayOfAllSheepGenders];
  }

  public sanitizeSelectInput(): void {
    if (this.selectedField.length > 0) {
      this.selectedFieldName = this.selectedField[0];
    }
  }
}
