import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApiTasks = 'http://www.localhost:3010/api/tasks';
  private urlApiUsers = 'http://www.localhost:3010/api/users';

  constructor(private http: HttpClient) { }

  // mehod for get data tasks
  public getData(): Observable<any> {
    return this.http.get<any>(this.urlApiTasks)
  }

  // mehod for get data users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.urlApiUsers);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>('http://www.localhost:3010/api/tasks/create', task);
  }
  deleteTask(taskId: string): Observable<any> {
    const url = `${this.urlApiTasks}/delete/${taskId}`;
    return this.http.delete<any>(url);
  }
}
