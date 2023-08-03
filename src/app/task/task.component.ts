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
  selectedTaskId: string = '';
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



  loadTasks() {
    // Llamada al servicio para obtener la lista de tareas
    this.apiService.getTask().subscribe((response: any) => {
      this.data = response; // Asignar la respuesta a la variable data
    });
  }

  // selectedTaskIdForEdit: string = '';
  // selectedUserNameForEdit: string = '';
  // selectedTaskNameForEdit: string = '';
  // taskDescriptionForEdit: string = '';
  // selectedDeadlineForEdit: Date = new Date();
  // selectedStatusForEdit: string = '';

  // editTask(task: any) {
  //   this.selectedTaskIdForEdit = task._id;
  //   this.selectedTaskNameForEdit = task.name_task;
  //   this.selectedUserNameForEdit = task.name_user;
  //   this.taskDescriptionForEdit = task.description;
  //   this.selectedDeadlineForEdit = task.deadline;
  //   this.selectedStatusForEdit = task.status;

  // }

  // updateTask() {
  //   // Crear un objeto con los datos actualizados de la tarea
  //   const updatedTask = {
  //     _id: this.selectedTaskIdForEdit,
  //     name_task: this.selectedTaskNameForEdit,
  //     name_user: this.selectedUserNameForEdit,
  //     description: this.taskDescriptionForEdit,
  //     deadline: this.selectedDeadlineForEdit,
  //     status: this.selectedStatusForEdit
  //   };

  //   // Llamada al servicio para actualizar la tarea
  //   this.apiService.updateTask(updatedTask).subscribe((response: any) => {
  //     // Si la actualización fue exitosa, buscar y actualizar la tarea en el arreglo data
  //     const index = this.data.findIndex(task => task._id === this.selectedTaskIdForEdit);
  //     if (index !== -1) {
  //       this.data[index] = updatedTask;
  //     }

  //     // Limpiar los campos del formulario después de la actualización
  //     this.clearForm();
  //   }, error => {
  //     // Manejar el error en caso de que ocurra
  //     console.error('Error updating task:', error);
  //     // Puedes mostrar un mensaje de error o tomar alguna otra acción aquí
  //   });
  // }

  // clearForm() {
  //   // Limpiar los campos del formulario después de la actualización
  //   this.selectedTaskId = '';
  //   this.selectedTaskName = '';
  //   this.selectedUserName = '';
  //   this.taskDescription = '';
  //   this.selectedDeadline = new Date();
  //   this.selectedStatus = '';
  // }



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
