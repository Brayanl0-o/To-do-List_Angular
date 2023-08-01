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
    { description: "Programar", done: true },
    { description: "Comer", done: false },
    { description: "Lavar", done: false },
    { description: "Hacer ejercicio", done: false }
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
}



