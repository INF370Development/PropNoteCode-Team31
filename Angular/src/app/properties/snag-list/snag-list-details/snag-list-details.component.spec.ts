import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnagListDetailsComponent } from './snag-list-details.component';

describe('SnagListDetailsComponent', () => {
  let component: SnagListDetailsComponent;
  let fixture: ComponentFixture<SnagListDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnagListDetailsComponent]
    });
    fixture = TestBed.createComponent(SnagListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
