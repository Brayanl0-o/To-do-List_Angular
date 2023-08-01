import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://www.localhost:3010/api/tasks'
  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get<any>(this.urlApi)
  }
  addTask(task: any): Observable<any> {

    return this.http.post<any>('http://www.localhost:3010/api/tasks/create', task);
  }
}
