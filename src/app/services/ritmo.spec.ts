import { TestBed } from '@angular/core/testing';

import { Ritmo } from './ritmo';

describe('Ritmo', () => {
  let service: Ritmo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ritmo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
