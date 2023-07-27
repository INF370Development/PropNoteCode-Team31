import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpproComponent } from './helppro.component';

describe('HelpproComponent', () => {
  let component: HelpproComponent;
  let fixture: ComponentFixture<HelpproComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpproComponent]
    });
    fixture = TestBed.createComponent(HelpproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
