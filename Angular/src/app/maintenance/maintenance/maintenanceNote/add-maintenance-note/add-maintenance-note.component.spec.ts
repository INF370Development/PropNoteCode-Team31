import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintenanceNoteComponent } from './add-maintenance-note.component';

describe('AddMaintenanceNoteComponent', () => {
  let component: AddMaintenanceNoteComponent;
  let fixture: ComponentFixture<AddMaintenanceNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMaintenanceNoteComponent]
    });
    fixture = TestBed.createComponent(AddMaintenanceNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
