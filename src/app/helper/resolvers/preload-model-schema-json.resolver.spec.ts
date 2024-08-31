import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { preloadModelSchemaJsonResolver } from './preload-model-schema-json.resolver';

describe('preloadModelSchemaJsonResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => preloadModelSchemaJsonResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
