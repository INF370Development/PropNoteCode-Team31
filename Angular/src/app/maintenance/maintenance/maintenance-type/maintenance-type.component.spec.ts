import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTypeComponent } from './maintenance-type.component';

describe('MaintenanceTypeComponent', () => {
  let component: MaintenanceTypeComponent;
  let fixture: ComponentFixture<MaintenanceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceTypeComponent]
    });
    fixture = TestBed.createComponent(MaintenanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
