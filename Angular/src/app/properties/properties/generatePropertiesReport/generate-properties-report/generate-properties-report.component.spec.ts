import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePropertiesReportComponent } from './generate-properties-report.component';

describe('GeneratePropertiesReportComponent', () => {
  let component: GeneratePropertiesReportComponent;
  let fixture: ComponentFixture<GeneratePropertiesReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratePropertiesReportComponent]
    });
    fixture = TestBed.createComponent(GeneratePropertiesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
