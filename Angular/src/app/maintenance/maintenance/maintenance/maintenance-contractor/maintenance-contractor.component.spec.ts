import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceContractorComponent } from './maintenance-contractor.component';

describe('MaintenanceContractorComponent', () => {
  let component: MaintenanceContractorComponent;
  let fixture: ComponentFixture<MaintenanceContractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceContractorComponent]
    });
    fixture = TestBed.createComponent(MaintenanceContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
