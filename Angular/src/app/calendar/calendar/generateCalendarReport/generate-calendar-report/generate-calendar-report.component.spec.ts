import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCalendarReportComponent } from './generate-calendar-report.component';

describe('GenerateCalendarReportComponent', () => {
  let component: GenerateCalendarReportComponent;
  let fixture: ComponentFixture<GenerateCalendarReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateCalendarReportComponent]
    });
    fixture = TestBed.createComponent(GenerateCalendarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
