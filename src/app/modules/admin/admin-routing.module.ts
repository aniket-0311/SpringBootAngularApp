import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTasksComponent } from './components/post-tasks/post-tasks.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ViewTaskAdminComponent } from './components/view-task-admin/view-task-admin.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"tasks", component:PostTasksComponent} ,
  {path:"task/:id/edit", component:UpdateTaskComponent} ,
  {path:"task-details/:id", component:ViewTaskAdminComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
