import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUModalComponent } from './create-umodal.component';

describe('CreateUModalComponent', () => {
  let component: CreateUModalComponent;
  let fixture: ComponentFixture<CreateUModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUModalComponent]
    });
    fixture = TestBed.createComponent(CreateUModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
