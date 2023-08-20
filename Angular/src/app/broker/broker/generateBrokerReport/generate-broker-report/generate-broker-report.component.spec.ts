import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBrokerReportComponent } from './generate-broker-report.component';

describe('GenerateBrokerReportComponent', () => {
  let component: GenerateBrokerReportComponent;
  let fixture: ComponentFixture<GenerateBrokerReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateBrokerReportComponent]
    });
    fixture = TestBed.createComponent(GenerateBrokerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});