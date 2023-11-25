import { Component } from '@angular/core';
import { FieldStorageService } from '../core/storages/field-storage.service';

@Component({
  selector: 'app-fields-container',
  templateUrl: './fields-container.component.html',
  styleUrls: ['./fields-container.component.css']
})
export class FieldsContainerComponent {

  constructor(public fieldStorage: FieldStorageService) {
  }
}
