import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
import { ViewTaskEmpComponent } from './components/view-task-emp/view-task-emp.component';

const routes: Routes = [
  {path:"dashboard", component:EmpDashboardComponent},
  {path:"task-details/:id", component:ViewTaskEmpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
