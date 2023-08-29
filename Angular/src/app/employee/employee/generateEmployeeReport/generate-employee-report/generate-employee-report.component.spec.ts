import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateEmployeeReportComponent } from './generate-employee-report.component';

describe('GenerateEmployeeReportComponent', () => {
  let component: GenerateEmployeeReportComponent;
  let fixture: ComponentFixture<GenerateEmployeeReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateEmployeeReportComponent]
    });
    fixture = TestBed.createComponent(GenerateEmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
