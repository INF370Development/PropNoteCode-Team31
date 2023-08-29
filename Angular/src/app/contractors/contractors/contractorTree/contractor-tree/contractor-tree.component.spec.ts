import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorTreeComponent } from './contractor-tree.component';

describe('ContractorTreeComponent', () => {
  let component: ContractorTreeComponent;
  let fixture: ComponentFixture<ContractorTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractorTreeComponent]
    });
    fixture = TestBed.createComponent(ContractorTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
