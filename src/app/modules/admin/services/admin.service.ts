import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL = "http://localhost:8083";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(BASE_URL + "/api/admin/users", {
      headers: this.createAutorizationHeader()
    })
  }

  createTask(taskDTO: any): Observable<any> {
    return this.http.post(BASE_URL + "/api/admin/task", taskDTO, {
      headers: this.createAutorizationHeader()
    })
  }

  updateTask(id: number, taskDTO: any): Observable<any> {
    return this.http.put(BASE_URL + `/api/admin/updateTask/${id}`, taskDTO, {
      headers: this.createAutorizationHeader()
    })
  }

  getAllTasks(): Observable<any> {
    return this.http.get(BASE_URL + "/api/admin/getAlltask", {
      headers: this.createAutorizationHeader()
    })
  }

  deleteTaskById(id: any): Observable<any> {
    return this.http.delete(BASE_URL + "/api/admin/deleteTask/" + id, {
      headers: this.createAutorizationHeader()
    })
  }

  getTaskById(id: any): Observable<any> {
    return this.http.get(BASE_URL + "/api/admin/getTask/" + id, {
      headers: this.createAutorizationHeader()
    })
  }

  searchTask(title: string): Observable<any> {
    return this.http.get(BASE_URL + `/api/admin/tasks/search/${title}`, {
      headers: this.createAutorizationHeader()
    })
  }

  postComment(taskId:number,comment:string){
    let params = new HttpParams()
      .set('content', comment);
    return this.http.post(BASE_URL + `/api/admin/task/comment/${taskId}`, null,{
      headers: this.createAutorizationHeader(),
      params: params
    })
  }

  getCommentByTaskId(taskId:number){
    return this.http.get(BASE_URL + `/api/admin/comment/${taskId}`,{
      headers: this.createAutorizationHeader(),
    })
  }

  private createAutorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

}
