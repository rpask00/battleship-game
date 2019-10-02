import { TestBed } from '@angular/core/testing';

import { GemplayService } from './gemplay.service';

describe('GemplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GemplayService = TestBed.get(GemplayService);
    expect(service).toBeTruthy();
  });
});
