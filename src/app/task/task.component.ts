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
  usersData: any[] = [];
  selectedUserName: string = '';
  selectedTaskName: string = '';
  taskDescription: string = '';
  selectedDeadline: Date = new Date();
  selectedStatus: string = '';
  selectedDelete: String = '';
  description: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTasksData();
    this.getUsersData();
  }

  getUsersData() {
    this.apiService.getUsers().subscribe(usersData => {
      this.usersData = usersData;
      console.log(this.usersData);
    })
  }

  getTasksData() {
    this.apiService.getData().subscribe(tasksData => {
      this.data = tasksData;
      console.log(this.data);
    });
  }
  deleteTask(taskId: string) {
    this.apiService.deleteTask(taskId).subscribe(
      response => {
        console.log('Tarea eliminada exitosamente:', response);
        this.reloadPage();
      },
      error => {
        console.error('Error al eliminar la tarea:', error);
      }
    );
  }
  onSubmit() {
    const newTask = {
      name_user: this.selectedUserName,
      name_task: this.selectedTaskName,
      description: this.taskDescription,
      status: this.selectedStatus,
      deadline: this.selectedDeadline,

    };

    this.apiService.addTask(newTask).subscribe(
      response => {
        console.log('Formulario enviado exitosamente:', response);
        this.reloadPage();
      },
      error => {
        console.error('Error al enviar el formulario:', error);
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  getUserNameById(userId: string): string {
    const user = this.usersData.find(user => user._id === userId);
    return user ? user.first_name : 'Unknown User';
  }
}
