import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectionModalComponent } from './add-inspection-modal.component';

describe('AddInspectionModalComponent', () => {
  let component: AddInspectionModalComponent;
  let fixture: ComponentFixture<AddInspectionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInspectionModalComponent]
    });
    fixture = TestBed.createComponent(AddInspectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
