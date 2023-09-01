import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeasesComponent } from './view-leases.component';

describe('ViewLeasesComponent', () => {
  let component: ViewLeasesComponent;
  let fixture: ComponentFixture<ViewLeasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLeasesComponent]
    });
    fixture = TestBed.createComponent(ViewLeasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
