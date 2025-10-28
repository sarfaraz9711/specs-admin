import { TestBed } from '@angular/core/testing';
import { CartValueService } from "src/core/admin/Promotions/cartValueService";
import { ConfigrationFacilityCodeService } from 'src/core/admin/reports/configrationFacilityCode.service';

describe('ConfigrationFacilityCodeService', () => {
  let service: ConfigrationFacilityCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigrationFacilityCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});