import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInterfaceComponent } from './input-interface.component';

describe('InputInterfaceComponent', () => {
  let component: InputInterfaceComponent;
  let fixture: ComponentFixture<InputInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
