import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FieldStorageService } from '../core/storages/field-storage.service';
import { SheepFactoryService } from '../core/services/sheep-factory.service';
import { PublicConstantsService } from '../core/constants/public-constants.service';

@Component({
  selector: 'app-input-interface',
  templateUrl: './input-interface.component.html',
  styleUrls: ['./input-interface.component.css']
})
export class InputInterfaceComponent implements OnInit, OnDestroy {

  private fieldNames: string[] = ['sss', 'eee', 'vvv'];

  public sheepNameInput: string = '';
  public selectedGender: string = this.getAllSheepGenders()[0];
  public isBrandedSelected: boolean = false;
  public selectedField: string = '';

  constructor(private toastrService: ToastrService,
              private fieldStorage: FieldStorageService,
              private sheepFactory: SheepFactoryService,
              private publicConstants: PublicConstantsService) {
  }

  ngOnInit(): void {
    this.fieldStorage.getFieldNamesSubject().subscribe((names) => {
      this.fieldNames = [...names];
    })
  }

  ngOnDestroy() {
    this.fieldStorage.getFieldsSubject().unsubscribe();
  }

  showSuccess() {

    console.log(this.selectedField);
  }

  public onCreatingSheep() {
    if (this.isSheepInputValid()) {
      const newSheep = this.sheepFactory.createAndAssignSheep(this.sheepNameInput, this.selectedGender, this.selectedField, this.isBrandedSelected);
      if (newSheep) {
        this.toastrService.success(this.publicConstants.SHEEP_CREATED_MESSAGE);
      }
    }
  }

  public isSheepInputValid(): boolean {
    return !(
      this.isFieldNamesEmpty() ||
      !this.selectedField ||
      !this.sheepNameInput
    );
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
}
