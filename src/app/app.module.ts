import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldsContainerComponent } from './fields-container/fields-container.component';
import { FieldComponent } from './fields-container/field/field.component';
import { InputInterfaceComponent } from './input-interface/input-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldsContainerComponent,
    FieldComponent,
    InputInterfaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
