import { TestBed } from '@angular/core/testing';

import { ContractorService } from '../../../../services/contractor.service';

describe('ContractorService', () => {
  let service: ContractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});