import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepositDialogComponent } from './add-deposit-dialog.component';

describe('AddDepositDialogComponent', () => {
  let component: AddDepositDialogComponent;
  let fixture: ComponentFixture<AddDepositDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDepositDialogComponent]
    });
    fixture = TestBed.createComponent(AddDepositDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
