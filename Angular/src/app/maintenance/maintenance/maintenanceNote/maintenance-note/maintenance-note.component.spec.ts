import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceNoteComponent } from './maintenance-note.component';

describe('MaintenanceNoteComponent', () => {
  let component: MaintenanceNoteComponent;
  let fixture: ComponentFixture<MaintenanceNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceNoteComponent]
    });
    fixture = TestBed.createComponent(MaintenanceNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
