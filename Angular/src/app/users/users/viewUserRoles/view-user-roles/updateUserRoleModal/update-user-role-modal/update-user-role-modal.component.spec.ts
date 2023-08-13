import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserRoleModalComponent } from './update-user-role-modal.component';

describe('UpdateUserRoleModalComponent', () => {
  let component: UpdateUserRoleModalComponent;
  let fixture: ComponentFixture<UpdateUserRoleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserRoleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
