import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecoveriesModalComponent } from './add-recoveries-modal.component';

describe('AddRecoveriesModalComponent', () => {
  let component: AddRecoveriesModalComponent;
  let fixture: ComponentFixture<AddRecoveriesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecoveriesModalComponent]
    });
    fixture = TestBed.createComponent(AddRecoveriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
