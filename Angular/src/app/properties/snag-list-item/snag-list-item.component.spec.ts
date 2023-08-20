import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnagListItemComponent } from './snag-list-item.component';

describe('SnagListItemComponent', () => {
  let component: SnagListItemComponent;
  let fixture: ComponentFixture<SnagListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnagListItemComponent]
    });
    fixture = TestBed.createComponent(SnagListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
