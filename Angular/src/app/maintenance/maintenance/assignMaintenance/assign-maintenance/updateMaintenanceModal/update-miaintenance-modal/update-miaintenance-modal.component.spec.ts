import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMiaintenanceModalComponent } from './update-miaintenance-modal.component';

describe('UpdateMiaintenanceModalComponent', () => {
  let component: UpdateMiaintenanceModalComponent;
  let fixture: ComponentFixture<UpdateMiaintenanceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMiaintenanceModalComponent]
    });
    fixture = TestBed.createComponent(UpdateMiaintenanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
