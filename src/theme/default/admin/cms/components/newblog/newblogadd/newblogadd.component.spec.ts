import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogaddComponent } from './newblogadd.component';

describe('NewBlogaddComponent', () => {
  let component: NewBlogaddComponent;
  let fixture: ComponentFixture<NewBlogaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBlogaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBlogaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
