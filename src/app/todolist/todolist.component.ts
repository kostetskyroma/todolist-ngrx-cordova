import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoItem } from './todolist.interface';
import { TodoListService } from './todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  public todos: TodoItem[] = [];

  constructor(private readonly todoListService: TodoListService) {}

  ngOnInit(): void {}

  get todos$() {
    return this.todoListService.getTodos();
  }

  show() {}

  remove() {}

  add() {}

  complete() {}

  search() {}

  onSearch($event: Event) {
    const value = ($event?.target as HTMLInputElement).value;
    console.log(value);
  }
}
