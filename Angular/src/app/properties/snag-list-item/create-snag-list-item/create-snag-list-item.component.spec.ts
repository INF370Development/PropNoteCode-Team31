import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnagListItemComponent } from './create-snag-list-item.component';

describe('CreateSnagListItemComponent', () => {
  let component: CreateSnagListItemComponent;
  let fixture: ComponentFixture<CreateSnagListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSnagListItemComponent]
    });
    fixture = TestBed.createComponent(CreateSnagListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
