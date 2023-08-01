import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Task } from '../task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  data: any[] = [];
  selectedUserName: string = '';
  selectedStatus: string = '';
  taskDescription: string = '';
  selectedDeadline: Date = new Date();


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData()
  }
  llenarData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
  onSubmit() {
    const newTask = {
      name_user: this.selectedUserName,
      description: this.taskDescription,
      status: this.selectedStatus,
      deadline: this.selectedDeadline,

    };

    this.apiService.addTask(newTask).subscribe(
      response => {

        console.log('Formulario enviado exitosamente:', response);
      },
      error => {

        console.error('Error al enviar el formulario:', error);
      }
    );
  }
}
