import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBloglistComponent } from './newbloglist.component';

describe('NewBloglistComponent', () => {
  let component: NewBloglistComponent;
  let fixture: ComponentFixture<NewBloglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBloglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBloglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
