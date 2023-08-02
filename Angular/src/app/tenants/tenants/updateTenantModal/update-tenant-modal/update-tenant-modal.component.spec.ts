import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTenantModalComponent } from './update-tenant-modal.component';

describe('UpdateTenantModalComponent', () => {
  let component: UpdateTenantModalComponent;
  let fixture: ComponentFixture<UpdateTenantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTenantModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTenantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
