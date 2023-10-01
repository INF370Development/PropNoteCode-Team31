import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesStatusesComponent } from './types-statuses.component';

describe('TypesStatusesComponent', () => {
  let component: TypesStatusesComponent;
  let fixture: ComponentFixture<TypesStatusesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypesStatusesComponent]
    });
    fixture = TestBed.createComponent(TypesStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
