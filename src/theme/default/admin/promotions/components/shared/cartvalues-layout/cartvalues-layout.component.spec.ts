import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartValuesLayoutComponent  } from './cartvalues-layout.component'

describe('CartValuesLayoutComponent', () => {
  let component: CartValuesLayoutComponent;
  let fixture: ComponentFixture<CartValuesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartValuesLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartValuesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
