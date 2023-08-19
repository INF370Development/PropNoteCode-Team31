import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractorModalComponent } from './create-contractor-modal.component';

describe('CreateContractorModalComponent', () => {
  let component: CreateContractorModalComponent;
  let fixture: ComponentFixture<CreateContractorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateContractorModalComponent]
    });
    fixture = TestBed.createComponent(CreateContractorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
