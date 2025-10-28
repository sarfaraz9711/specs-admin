import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusLayoutComponent } from './contactus-layout.component';

describe('ContactusLayoutComponent', () => {
  let component: ContactusLayoutComponent;
  let fixture: ComponentFixture<ContactusLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactusLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
