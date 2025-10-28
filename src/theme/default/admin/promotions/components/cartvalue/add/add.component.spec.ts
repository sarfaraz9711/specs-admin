import { TestBed } from '@angular/core/testing';
import { CartValueService } from "src/core/admin/Promotions/cartValueService";

describe('CartValueService', () => {
  let service: CartValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});