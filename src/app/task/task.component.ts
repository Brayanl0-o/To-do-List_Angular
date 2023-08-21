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
  taskData: any[] = [];
  usersData: any[] = [];
  selectedTaskId: string = '';
  selectedUserName: string = '';
  selectedTaskName: string = '';
  selectedDescription: string = '';
  selectedDeadline: Date = new Date();
  selectedStatus: string = '';


  constructor(private apiService: ApiService) { }

  // onSelect(task: Task): void {
  //   this.selectedTaskId = task;
  //   this.selectedTaskId.add('TaskComponent: Selected hero id=${data.id')
  // }


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
      this.taskData = tasksData;
      console.log(this.taskData);
    });
  }

  //Method for sent new data typing in the form to API
  onSubmit() {
    const newTask = {
      name_user: this.selectedUserName,
      name_task: this.selectedTaskName,
      description: this.selectedDescription,
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



  // EDIT AND DELETE

  selectedTaskIdForEdit: string = '';
  selectedUserNameForEdit: string = '';
  selectedTaskNameForEdit: string = '';
  taskDescriptionForEdit: string = '';
  selectedDeadlineForEdit: Date = new Date();
  selectedStatusForEdit: string = '';

  editTask(task: any) {
    this.selectedTaskIdForEdit = task._id;
    this.selectedTaskNameForEdit = task.name_task;
    this.selectedUserNameForEdit = task.name_user;
    this.taskDescriptionForEdit = task.description;
    this.selectedDeadlineForEdit = task.deadline;
    this.selectedStatusForEdit = task.status;

  }

  updateTask() {
    // Create an object with the task update data
    const updatedTask = {
      _id: this.selectedTaskIdForEdit,
      name_task: this.selectedTaskNameForEdit,
      name_user: this.selectedUserNameForEdit,
      description: this.taskDescriptionForEdit,
      deadline: this.selectedDeadlineForEdit,
      status: this.selectedStatusForEdit
    };
    // Call to service for update task
    this.apiService.updateTask(updatedTask).subscribe((response: any) => {
      // If update was exit, search and update the task in the data array
      const index = this.taskData.findIndex(taskData => taskData._id === this.selectedTaskIdForEdit);
      if (index !== -1) {
        this.taskData[index] = updatedTask;
      }
      console.log("Task update")
      // Clean the form fields after from update
      this.clearForm();

    }, error => {
      console.error('Error updating task:', error);
    });
  }

  clearForm() {
    // CLean the form fields after update
    this.selectedTaskId = '';
    this.selectedTaskName = '';
    this.selectedUserName = '';
    this.selectedDescription = '';
    this.selectedDeadline = new Date();
    this.selectedStatus = '';
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


}
