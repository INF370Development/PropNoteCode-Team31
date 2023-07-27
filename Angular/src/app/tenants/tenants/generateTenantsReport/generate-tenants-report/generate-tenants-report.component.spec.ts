import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTenantsReportComponent } from './generate-tenants-report.component';

describe('GenerateTenantsReportComponent', () => {
  let component: GenerateTenantsReportComponent;
  let fixture: ComponentFixture<GenerateTenantsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateTenantsReportComponent]
    });
    fixture = TestBed.createComponent(GenerateTenantsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
