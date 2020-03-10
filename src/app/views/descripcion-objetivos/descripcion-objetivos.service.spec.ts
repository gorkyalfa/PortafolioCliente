import { TestBed } from '@angular/core/testing';

import { DescripcionObjetivosService } from './descripcion-objetivos.service';

describe('DescripcionObjetivosService', () => {
  let service: DescripcionObjetivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescripcionObjetivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
