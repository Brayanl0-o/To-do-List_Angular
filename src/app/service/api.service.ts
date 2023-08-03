import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Import the class for handling real-time data
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})

//Api data handling class
export class ApiService {
  private urlApiTasks = 'http://www.localhost:3010/api/tasks';
  private urlApiUsers = 'http://www.localhost:3010/api/users';

  constructor(private http: HttpClient) { }

  // Method to fetch task data from the API
  public getTask(): Observable<any> {
    return this.http.get<any>(this.urlApiTasks)
  }

  // Method to fetch user data from the API
  getUsers(): Observable<any> {
    return this.http.get<any>(this.urlApiUsers);
  }

  // Method to add a new task using the API
  addTask(task: any): Observable<any> {
    return this.http.post<any>('http://www.localhost:3010/api/tasks/create', task);
  }


  //Method to delete a task using the API
  deleteTask(taskId: string): Observable<any> {
    const url = `${this.urlApiTasks}/delete/${taskId}`;
    return this.http.delete<any>(url);
  }


  // updateTask(task: any): Observable<any> {
  //   const url = `${this.urlApiTasks}/tasks/${task._id}`;
  //   return this.http.put(url, task);
  // }
}
