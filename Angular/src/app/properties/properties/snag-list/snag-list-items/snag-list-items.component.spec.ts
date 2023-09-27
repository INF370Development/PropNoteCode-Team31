import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnagListItemsComponent } from './snag-list-items.component';

describe('SnagListItemsComponent', () => {
  let component: SnagListItemsComponent;
  let fixture: ComponentFixture<SnagListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnagListItemsComponent]
    });
    fixture = TestBed.createComponent(SnagListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
