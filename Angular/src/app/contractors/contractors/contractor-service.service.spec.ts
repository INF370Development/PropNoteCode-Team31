import { TestBed } from '@angular/core/testing';

import { ContractorServiceService } from './contractor-service.service';

describe('ContractorServiceService', () => {
  let service: ContractorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
