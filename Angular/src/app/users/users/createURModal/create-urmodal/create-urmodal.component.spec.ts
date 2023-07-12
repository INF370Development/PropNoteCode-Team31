import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateURModalComponent } from './create-urmodal.component';

describe('CreateURModalComponent', () => {
  let component: CreateURModalComponent;
  let fixture: ComponentFixture<CreateURModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateURModalComponent]
    });
    fixture = TestBed.createComponent(CreateURModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
