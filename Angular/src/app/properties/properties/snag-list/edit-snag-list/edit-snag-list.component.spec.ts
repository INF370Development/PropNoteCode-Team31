import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSnagListComponent } from './edit-snag-list.component';

describe('EditSnagListComponent', () => {
  let component: EditSnagListComponent;
  let fixture: ComponentFixture<EditSnagListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSnagListComponent]
    });
    fixture = TestBed.createComponent(EditSnagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
