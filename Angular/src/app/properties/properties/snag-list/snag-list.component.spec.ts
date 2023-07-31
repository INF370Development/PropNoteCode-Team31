import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnagListComponent } from './snag-list.component';

describe('SnagListComponent', () => {
  let component: SnagListComponent;
  let fixture: ComponentFixture<SnagListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnagListComponent]
    });
    fixture = TestBed.createComponent(SnagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
