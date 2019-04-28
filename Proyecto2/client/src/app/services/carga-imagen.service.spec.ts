import { TestBed } from '@angular/core/testing';

import { CargaImagenService } from './carga-imagen.service';

describe('CargaImagenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargaImagenService = TestBed.get(CargaImagenService);
    expect(service).toBeTruthy();
  });
});
