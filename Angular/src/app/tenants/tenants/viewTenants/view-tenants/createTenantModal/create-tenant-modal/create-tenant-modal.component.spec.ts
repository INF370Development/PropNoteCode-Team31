import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTenantModalComponent } from './create-tenant-modal.component';

describe('CreateTenantModalComponent', () => {
  let component: CreateTenantModalComponent;
  let fixture: ComponentFixture<CreateTenantModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTenantModalComponent]
    });
    fixture = TestBed.createComponent(CreateTenantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
