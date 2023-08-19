import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractorModalComponent } from './update-contractor-modal.component';

describe('UpdateContractorModalComponent', () => {
  let component: UpdateContractorModalComponent;
  let fixture: ComponentFixture<UpdateContractorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateContractorModalComponent]
    });
    fixture = TestBed.createComponent(UpdateContractorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
