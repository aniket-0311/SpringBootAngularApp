import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskEmpComponent } from './view-task-emp.component';

describe('ViewTaskEmpComponent', () => {
  let component: ViewTaskEmpComponent;
  let fixture: ComponentFixture<ViewTaskEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskEmpComponent]
    });
    fixture = TestBed.createComponent(ViewTaskEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
