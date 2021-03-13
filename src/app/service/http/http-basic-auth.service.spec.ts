import { TestBed } from '@angular/core/testing';

import { HttpBasicAuthService } from './http-basic-auth.service';

describe('HttpBasicAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpBasicAuthService = TestBed.get(HttpBasicAuthService);
    expect(service).toBeTruthy();
  });
});
