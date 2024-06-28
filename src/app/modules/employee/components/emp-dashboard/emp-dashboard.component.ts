import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent {

  listOfTask: any = [];

  constructor(private empService : EmployeeService,private snackbar: MatSnackBar,
    private router: Router
  ){ }

  ngOnInit(){
    this.getAllTasks();
  }

  getAllTasks(){
    this.empService.getEmployeeTaskById().subscribe((res) =>{
      this.listOfTask = res;
      console.log(this.listOfTask)
    })
  }

  updateStatus(id:number, status:string){
    this.empService.updateStatus(id,status).subscribe((res) =>{
      if(res.id != null){
        this.snackbar.open("Task Status updated sucessfully","Close",{duration:5000});
        this.getAllTasks();
      }
      else{
        this.snackbar.open("Getting error while updating task","Close",{duration:5000});
      }
    })
  }
}
