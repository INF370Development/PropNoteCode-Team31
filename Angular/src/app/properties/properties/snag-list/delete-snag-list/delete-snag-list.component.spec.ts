import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSnagListComponent } from './delete-snag-list.component';

describe('DeleteSnagListComponent', () => {
  let component: DeleteSnagListComponent;
  let fixture: ComponentFixture<DeleteSnagListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSnagListComponent]
    });
    fixture = TestBed.createComponent(DeleteSnagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
