import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintenanceComponent } from './maintenance.component';

describe('MaintenanceComponent', () => {
  let component: ViewMaintenanceComponent;
  let fixture: ComponentFixture<ViewMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMaintenanceComponent]
    });
    fixture = TestBed.createComponent(ViewMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
