import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tasks',
  templateUrl: './post-tasks.component.html',
  styleUrls: ['./post-tasks.component.scss']
})
export class PostTasksComponent {

  taskForm!: FormGroup
  listOfEmployees:any = [];
  listOfPriorities:any = ["LOW","MEDIUM","HIGH"];

  constructor(private adminService : AdminService, private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,private snackbar: MatSnackBar,
    private router: Router
  ){ }

  ngOnInit(){
    this.dateAdapter.setLocale('en');
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    });
    this.getUsers();
  }

  getUsers(){
    this.adminService.getUsers().subscribe((res) =>{
      this.listOfEmployees = res
    })
  }

  postTask(){
    const taskDTO = this.taskForm.value;
    this.adminService.createTask(taskDTO).subscribe((res) =>{
      if(res.id != null){
        this.snackbar.open('Task created successfully!', 'Close', {
          duration: 5000
        });
        this.router.navigateByUrl("/admin/dashboard");
      }
      else{
        this.snackbar.open('Something went wrong!', 'ERROR', {
          duration: 5000
        });
      }
    },
    (err) => {
      console.error('Error creating task', err);
      this.snackbar.open('An error occurred while creating the task!', 'ERROR', {
        duration: 5000
      });
    })
  }

  filterFutureDates = (date: Date | null): boolean => {
    if (!date) {
      return false; // If no date is selected (null), disable it
    }
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current time to midnight for comparison
    return date >= currentDate; // Disable dates before the current date
  }

}
