import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractorsComponent } from './view-contractors.component';

describe('ViewContractorsComponent', () => {
  let component: ViewContractorsComponent;
  let fixture: ComponentFixture<ViewContractorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewContractorsComponent]
    });
    fixture = TestBed.createComponent(ViewContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
