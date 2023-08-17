import { TestBed } from '@angular/core/testing';

import { TenantService } from 'src/app/services/tenant.service';

describe('UserService', () => {
  let service: TenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
