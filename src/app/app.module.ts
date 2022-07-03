import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldsContainerComponent } from './fields-container/fields-container.component';
import { FieldComponent } from './fields-container/field/field.component';
import { InputInterfaceComponent } from './input-interface/input-interface.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FieldsContainerComponent,
    FieldComponent,
    InputInterfaceComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            preventDuplicates: true
        }),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
