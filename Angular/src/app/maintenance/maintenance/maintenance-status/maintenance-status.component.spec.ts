import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceStatusComponent } from './maintenance-status.component';

describe('MaintenanceStatusComponent', () => {
  let component: MaintenanceStatusComponent;
  let fixture: ComponentFixture<MaintenanceStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceStatusComponent]
    });
    fixture = TestBed.createComponent(MaintenanceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
