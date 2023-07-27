import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertiesModalComponent } from './create-properties-modal.component';

describe('CreatePropertiesModalComponent', () => {
  let component: CreatePropertiesModalComponent;
  let fixture: ComponentFixture<CreatePropertiesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePropertiesModalComponent]
    });
    fixture = TestBed.createComponent(CreatePropertiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
