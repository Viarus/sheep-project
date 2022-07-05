import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldStorageService } from '../core/storages/field-storage.service';
import { Field } from '../core/models/field/field-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fields-container',
  templateUrl: './fields-container.component.html',
  styleUrls: ['./fields-container.component.css']
})
export class FieldsContainerComponent implements OnInit, OnDestroy {
  public fields: Field[] = this.fieldStorage.getFields();
  private fieldStorageSubscription: Subscription = new Subscription();

  constructor(private fieldStorage: FieldStorageService) {
  }

  ngOnInit(): void {
    this.fieldStorageSubscription = this.fieldStorage.getFieldsSubject().subscribe((fields) => {
      this.fields = [...fields];
    })
  }

  ngOnDestroy(): void {
    this.fieldStorageSubscription.unsubscribe();
  }
}
