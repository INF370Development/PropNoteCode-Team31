import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTenantsComponent } from './view-tenants.component';

describe('ViewTenantsComponent', () => {
  let component: ViewTenantsComponent;
  let fixture: ComponentFixture<ViewTenantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTenantsComponent]
    });
    fixture = TestBed.createComponent(ViewTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
