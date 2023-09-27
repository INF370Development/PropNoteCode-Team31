import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSnagListItemsComponent } from './edit-snag-list-items.component';

describe('EditSnagListItemsComponent', () => {
  let component: EditSnagListItemsComponent;
  let fixture: ComponentFixture<EditSnagListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSnagListItemsComponent]
    });
    fixture = TestBed.createComponent(EditSnagListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
