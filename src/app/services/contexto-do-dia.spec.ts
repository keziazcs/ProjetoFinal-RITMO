import { TestBed } from '@angular/core/testing';

import { ContextoDoDia } from './contexto-do-dia';

describe('ContextoDoDia', () => {
  let service: ContextoDoDia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextoDoDia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
