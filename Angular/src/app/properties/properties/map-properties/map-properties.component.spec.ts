import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPropertiesComponent } from './map-properties.component';

describe('MapPropertiesComponent', () => {
  let component: MapPropertiesComponent;
  let fixture: ComponentFixture<MapPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPropertiesComponent]
    });
    fixture = TestBed.createComponent(MapPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
