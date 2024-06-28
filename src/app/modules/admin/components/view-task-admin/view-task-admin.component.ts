import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-task-admin',
  templateUrl: './view-task-admin.component.html',
  styleUrls: ['./view-task-admin.component.scss']
})
export class ViewTaskAdminComponent {
  taskData:any;
  searchForm!: FormGroup;
  id:any;
  commentData:string = '';
  commentsList:any = [];
  
  constructor(private adminService : AdminService,private snackbar: MatSnackBar,
    private router: Router,private fb : FormBuilder,private route:ActivatedRoute,
  ){ }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getTaskById(this.id);
    this.getComments();
    this.searchForm = this.fb.group({
      title:[null]
    })
  }

  getTaskById(id:any){
    this.adminService.getTaskById(id).subscribe((res) =>{
      this.taskData = res
    })
  }

  getComments(){
    this.adminService.getCommentByTaskId(this.id).subscribe((res) =>{
      this.commentsList = res;
      console.log(res);
    })
  }

  postComment(){
    this.adminService.postComment(this.id,this.commentData).subscribe((res:any) =>{
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
