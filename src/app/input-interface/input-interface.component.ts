import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FieldStorageService } from '../core/storages/field-storage.service';

@Component({
  selector: 'app-input-interface',
  templateUrl: './input-interface.component.html',
  styleUrls: ['./input-interface.component.css']
})
export class InputInterfaceComponent implements OnInit, OnDestroy {

  private fieldNames: string[] = ['cieś', 'mama'];

  constructor(private toastrService: ToastrService, private fieldStorage: FieldStorageService) {
  }

  ngOnInit(): void {
    this.fieldStorage.getFieldNamesSubject().subscribe((names) => {
      this.fieldNames = [...names];
    })
    console.log(this.fieldNames);
  }

  ngOnDestroy() {
    this.fieldStorage.getFieldsSubject().unsubscribe();
  }

  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }

  public getFieldNames(): string[] {
    return this.fieldNames;
  }

  public isFieldNamesEmpty(): boolean {
    return this.fieldNames.length === 0;
  }

}
