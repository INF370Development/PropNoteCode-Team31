import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSnagListItemComponent } from './delete-snag-list-item.component';

describe('DeleteSnagListItemComponent', () => {
  let component: DeleteSnagListItemComponent;
  let fixture: ComponentFixture<DeleteSnagListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSnagListItemComponent]
    });
    fixture = TestBed.createComponent(DeleteSnagListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
