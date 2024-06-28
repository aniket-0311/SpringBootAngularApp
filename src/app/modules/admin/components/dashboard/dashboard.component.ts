import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTask: any = [];
  searchForm!: FormGroup;
  
  constructor(private adminService : AdminService,private snackbar: MatSnackBar,
    private router: Router,private fb : FormBuilder
  ){ }

  ngOnInit(){
    this.getAllTasks();
    this.searchForm = this.fb.group({
      title:[null]
    })
  }

  getAllTasks(){
    this.adminService.getAllTasks().subscribe((res) =>{
      this.listOfTask = res;
      console.log(this.listOfTask)
    })
  }

  deleteTask(id: any): void {
    this.adminService.deleteTaskById(id).subscribe(
      (res: boolean) => {
        if (res) {
          this.snackbar.open('Task deleted successfully!', 'Close', {
            duration: 5000
          });
          this.getAllTasks();
        } else {
          this.snackbar.open('Something went wrong!', 'ERROR', {
            duration: 5000
          });
        }
      },
      (err: any) => {
        console.error('Error deleting task', err);
        this.snackbar.open('An error occurred while deleting the task!', 'ERROR', {
          duration: 5000
        });
      }
    );
  }

  searchTask(){
    this.listOfTask = []
    const title = this.searchForm.get('title')?.value || null;
    this.adminService.searchTask(title).subscribe((res) =>{
      if(res){
        this.listOfTask = res;
      }
    })
  }
  
}
