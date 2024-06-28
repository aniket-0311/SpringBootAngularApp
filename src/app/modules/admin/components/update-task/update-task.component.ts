import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {

  id:any;
  updateTaskForm!: FormGroup
  listOfEmployees:any = [];
  listOfPriorities:any = ["LOW","MEDIUM","HIGH"];
  listOfTaskStatus:any = [ "PENDING","INPROGRESS","COMPLETED","DEFERED","CANCELLED"]

  constructor(private adminService: AdminService,private route:ActivatedRoute,
    private fb: FormBuilder,private snackbar: MatSnackBar,private router: Router
  ){ }


  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    if (this.id) {
      this.getTaskById(this.id);
    }
    this.getUsers();

    this.updateTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus:[null,[Validators.required]]
    });
  }

  getUsers(){
    this.adminService.getUsers().subscribe((res) =>{
      this.listOfEmployees = res
    })
  }

  getTaskById(id:any){
    this.adminService.getTaskById(id).subscribe((res) =>{
      if(res){
        this.updateTaskForm.patchValue({
          employeeId: res.employeeId,
          title: res.title,
          description: res.description ,
          dueDate: res.dueDate,
          priority: res.priority,
          taskStatus:res.taskStatus
        })
      }
    })
  }

  updateTask(){
    const taskDTO = this.updateTaskForm.value;
    this.adminService.updateTask(this.id,taskDTO).subscribe((res) =>{
      if(res.id != null){
        this.snackbar.open('Task updated successfully!', 'Close', {
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
