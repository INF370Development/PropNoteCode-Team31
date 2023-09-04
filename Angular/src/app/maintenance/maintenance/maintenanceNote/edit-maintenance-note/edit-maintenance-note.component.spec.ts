import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintenanceNoteComponent } from './edit-maintenance-note.component';

describe('EditMaintenanceNoteComponent', () => {
  let component: EditMaintenanceNoteComponent;
  let fixture: ComponentFixture<EditMaintenanceNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaintenanceNoteComponent]
    });
    fixture = TestBed.createComponent(EditMaintenanceNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
