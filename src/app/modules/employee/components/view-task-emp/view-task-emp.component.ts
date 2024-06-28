import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-emp',
  templateUrl: './view-task-emp.component.html',
  styleUrls: ['./view-task-emp.component.scss']
})
export class ViewTaskEmpComponent {
  taskData:any;
  id:any;
  commentData:string = '';
  commentsList:any = [];
  
  constructor(private empService : EmployeeService,
    private snackbar: MatSnackBar,
    private router: Router,private route:ActivatedRoute,
  ){ }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getTaskById(this.id);
    this.getComments();
  }

  getTaskById(id:any){
    this.empService.getTaskById(id).subscribe((res) =>{
      this.taskData = res
    })
  }

  getComments(){
    this.empService.getCommentByTaskId(this.id).subscribe((res) =>{
      this.commentsList = res;
      console.log(res);
    })
  }

  postComment(){
    this.empService.postComment(this.id,this.commentData).subscribe((res:any) =>{
      if(res.id != null){
        this.snackbar.open('Comment added successfully!', 'Close', {duration: 5000});
        this.commentData = '';
        this.getComments();
      }
      else{
        this.snackbar.open('Unable to post comment', 'ERROR', {
          duration: 5000
        });
      }
    })
  }
      
}
