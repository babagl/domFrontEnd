import { TestBed } from '@angular/core/testing';

import { DefaultCrudService } from './default-crud.service';

describe('DefaultCrudService', () => {
  let service: DefaultCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
