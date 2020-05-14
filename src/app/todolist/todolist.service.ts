import { Injectable } from '@angular/core';
import { TodoItem } from './todolist.interface';
import { from, of } from 'rxjs';
import { find } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodoListService {
  public todos: TodoItem[] = [
    {
      id: 1,
      title: 'Task 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dueDate: new Date('2020-05-14T12:00:00.000Z'),
      photo:
        'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      done: true,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description of task 2',
      dueDate: new Date('2020-05-10T12:00:00.000Z'),
      photo:
        'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      done: false,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description of task 3',
      dueDate: new Date('2020-05-10T12:00:00.000Z'),
      photo:
        'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      done: true,
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description of task 4',
      dueDate: new Date('2020-05-10T12:00:00.000Z'),
      photo:
        'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      done: true,
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Description of task 5',
      dueDate: new Date('2020-05-10T12:00:00.000Z'),
      photo:
        'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      done: false,
    },
    {
      id: 6,
      title: 'Task 6',
      description: 'Description of task 6',
      dueDate: new Date('2020-05-10T12:00:00.000Z'),
      photo:
        'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      done: false,
    },
  ];

  constructor() {}

  getTodos() {
    return of(this.todos);
  }

  getTodo(id: number) {
    return of(this.todos[id]);
  }

  deleteTodo(id: number) {
    return from(this.todos).pipe(find((item) => item.id === id));
  }

  createTodo(todo: TodoItem) {
    this.todos.push(todo);
    return of(this.todos[todo.id]);
  }

  updateTodo(todo: TodoItem) {
    this.todos.filter((item) => item.id === todo.id);
    this.todos.push(todo);
    return of(this.todos[todo.id]);
  }
}
