import { TestBed } from '@angular/core/testing';
import { DeliveryTatService } from 'src/core/admin/reports/deliveryTat.service';

describe('DeliveryTatService', () => {
  let service: DeliveryTatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryTatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});