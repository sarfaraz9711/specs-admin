import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerLayoutComponent } from './banner-layout.component'

describe('FeedbackLayoutComponent', () => {
  let component: BannerLayoutComponent;
  let fixture: ComponentFixture<BannerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
