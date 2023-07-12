import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateContractReportComponent } from './generate-contract-report.component';

describe('GenerateContractReportComponent', () => {
  let component: GenerateContractReportComponent;
  let fixture: ComponentFixture<GenerateContractReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateContractReportComponent]
    });
    fixture = TestBed.createComponent(GenerateContractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
