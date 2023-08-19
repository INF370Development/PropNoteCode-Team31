import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContracorDialogComponent } from './delete-contracor-dialog.component';

describe('DeleteContracorDialogComponent', () => {
  let component: DeleteContracorDialogComponent;
  let fixture: ComponentFixture<DeleteContracorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteContracorDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteContracorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
