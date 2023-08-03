import { Component } from '@angular/core';
//Import file 'ApiServie' for connect Api data with
import { ApiService } from '../service/api.service';
// import { Task } from '../task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
//Class handling data sent for form and interaction page
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

  //Component live cicle method that execute where its initalitan
  ngOnInit(): void {
    this.getTasksData();
    this.getUsersData();
  }

  // Mehotd help store and get user name ID.
  getUserNameById(userId: string): string {
    const user = this.usersData.find(user => user._id === userId);
    return user ? user.first_name : 'Unknown User';
  }

  //Method for get data users Api, and show in console
  getUsersData() {
    this.apiService.getUsers().subscribe(usersData => {
      this.usersData = usersData;
      console.log(this.usersData);
    })
  }

  //Method for get data task Api, and show in console
  getTasksData() {
    this.apiService.getTask().subscribe(tasksData => {
      this.data = tasksData;
      console.log(this.data);
    });
  }

  //Method for delete selected task for task Id, and reloadPage
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

  //Method for sent new data typing in the form to API
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
  //Method for reload page
  reloadPage() {
    window.location.reload();
  }

}
