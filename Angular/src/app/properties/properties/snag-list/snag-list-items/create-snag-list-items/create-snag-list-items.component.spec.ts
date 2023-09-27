import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnagListItemsComponent } from './create-snag-list-items.component';

describe('CreateSnagListItemsComponent', () => {
  let component: CreateSnagListItemsComponent;
  let fixture: ComponentFixture<CreateSnagListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSnagListItemsComponent]
    });
    fixture = TestBed.createComponent(CreateSnagListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
