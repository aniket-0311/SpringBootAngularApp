import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angularMaterial.module';
import { ViewTaskEmpComponent } from './components/view-task-emp/view-task-emp.component';


@NgModule({
  declarations: [
    EmpDashboardComponent,
    ViewTaskEmpComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class EmployeeModule { }
