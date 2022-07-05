import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowOfSheepComponent } from './row-of-sheep.component';

describe('RowOfSheepComponent', () => {
  let component: RowOfSheepComponent;
  let fixture: ComponentFixture<RowOfSheepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RowOfSheepComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RowOfSheepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
