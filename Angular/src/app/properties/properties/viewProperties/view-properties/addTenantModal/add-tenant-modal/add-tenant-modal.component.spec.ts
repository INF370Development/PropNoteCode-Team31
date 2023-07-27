import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenantModalComponent } from './add-tenant-modal.component';

describe('AddTenantModalComponent', () => {
  let component: AddTenantModalComponent;
  let fixture: ComponentFixture<AddTenantModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTenantModalComponent]
    });
    fixture = TestBed.createComponent(AddTenantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
