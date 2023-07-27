import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePropertyDialogComponent } from './delete-property-dialog.component';

describe('DeletePropertyDialogComponent', () => {
  let component: DeletePropertyDialogComponent;
  let fixture: ComponentFixture<DeletePropertyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePropertyDialogComponent]
    });
    fixture = TestBed.createComponent(DeletePropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
