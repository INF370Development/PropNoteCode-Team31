import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnagListComponent } from './create-snag-list.component';

describe('CreateSnagListComponent', () => {
  let component: CreateSnagListComponent;
  let fixture: ComponentFixture<CreateSnagListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSnagListComponent]
    });
    fixture = TestBed.createComponent(CreateSnagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
