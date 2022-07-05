import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicConstantsService {

  constructor() {
  }

  //Field
  readonly SELECTED_FIELD_WHEN_NO_FIELDS_CREATED = 'No fields created';

  //Sheep
  readonly LAMB_NEW_BORN_DEFAULT_NAME = 'Little Bob';
  readonly SHEEP_CREATED_MESSAGE = 'Sheep created successfully!'

  //Errors, Exceptions
  readonly WRONG_SHEEP_GENDER_EXCEPTION = 'Gender not found. Is your sheep an alien?';
  readonly FIELD_NAME_EXISTS_EXCEPTION = 'Field name already exists! Try a different name.';
  readonly FIELD_NOT_FOUND_EXCEPTION = 'Field name do not exists!';
  readonly PLEASE_SELECT_THE_FIELD = 'Please select the field!';
  readonly PLEASE_NAME_THE_FIELD = 'Please name the field!';
  readonly NO_MORE_SHEEP_TO_BRAND = 'No more sheep to brand';
}
