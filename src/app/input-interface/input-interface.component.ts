import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FieldStorageService } from '../core/storages/field-storage.service';
import { SheepFactoryService } from '../core/services/sheep-factory.service';

@Component({
  selector: 'app-input-interface',
  templateUrl: './input-interface.component.html',
  styleUrls: ['./input-interface.component.css']
})
export class InputInterfaceComponent implements OnInit, OnDestroy {

  private fieldNames: string[] = ['cieś', 'mama'];

  constructor(private toastrService: ToastrService, private fieldStorage: FieldStorageService, private sheepFactory: SheepFactoryService) {
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
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }

  public onCreatingSheepFormSubmit(formValue: any) {

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
