import { TestBed } from '@angular/core/testing';

import { SilaboServiceService } from './silabo-service.service';

describe('SilaboServiceService', () => {
  let service: SilaboServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilaboServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
