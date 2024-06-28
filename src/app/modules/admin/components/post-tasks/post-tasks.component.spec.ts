import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTasksComponent } from './post-tasks.component';

describe('PostTasksComponent', () => {
  let component: PostTasksComponent;
  let fixture: ComponentFixture<PostTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostTasksComponent]
    });
    fixture = TestBed.createComponent(PostTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
