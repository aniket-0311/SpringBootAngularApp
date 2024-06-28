import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTasksComponent } from './components/post-tasks/post-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/angularMaterial.module';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ViewTaskAdminComponent } from './components/view-task-admin/view-task-admin.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PostTasksComponent,
    UpdateTaskComponent,
    ViewTaskAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
