import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL = "http://localhost:8083";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeTaskById(): Observable<any> {
    return this.http.get(BASE_URL + "/api/employee/tasks", {
      headers: this.createAutorizationHeader()
    })
  }

  updateStatus(id:number, status:string): Observable<any> {
    return this.http.get(BASE_URL + `/api/employee/task/${id}/${status}`, {
      headers: this.createAutorizationHeader()
    })
  }

  postComment(taskId:number,comment:string){
    let params = new HttpParams()
      .set('content', comment);
    return this.http.post(BASE_URL + `/api/employee/task/comment/${taskId}`, null,{
      headers: this.createAutorizationHeader(),
      params: params
    })
  }

  getCommentByTaskId(taskId:number){
    return this.http.get(BASE_URL + `/api/employee/comment/${taskId}`,{
      headers: this.createAutorizationHeader(),
    })
  }

  getTaskById(id: any): Observable<any> {
    return this.http.get(BASE_URL + "/api/employee/getTask/" + id, {
      headers: this.createAutorizationHeader()
    })
  }

  private createAutorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

}
