import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBrokerGraphComponent } from './generate-broker-graph.component';

describe('GenerateBrokerGraphComponent', () => {
  let component: GenerateBrokerGraphComponent;
  let fixture: ComponentFixture<GenerateBrokerGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateBrokerGraphComponent]
    });
    fixture = TestBed.createComponent(GenerateBrokerGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
