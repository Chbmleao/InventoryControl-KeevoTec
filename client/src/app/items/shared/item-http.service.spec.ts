import { TestBed } from '@angular/core/testing';

import { ItemHttpService } from './item-http.service';

describe('HttpItemService', () => {
  let service: ItemHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
