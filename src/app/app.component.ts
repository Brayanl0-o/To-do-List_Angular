import { Component } from '@angular/core';

import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Todo-list"

  allTasks = [
    {}
  ]

  // get items() {
  //   if (this.filter === "all") {
  //     return this.allItems
  //   }
  //   return this.allItems.filter((item) => {
  //     this.filter === "done" ? item.done : !item.done
  //   })
  // }

  addTask(description: string) {
    this.allTasks.unshift({
      description,
      done: false
    })
  }
  deleteTask(description: string) {
    const index = this.allTasks.findIndex(task => task === description);
    if (index !== -1) {
      this.allTasks.splice(index, 1);
    }
  }
}



