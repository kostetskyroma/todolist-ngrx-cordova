import { Injectable } from '@angular/core';
import { TodoItem, TodoListRange } from './todolist.interface';
import { HttpClient } from '@angular/common/http';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { from } from 'rxjs';
import { getRandomId } from '../core/utils/id.util';

@Injectable({ providedIn: 'root' })
export class TodoListService {
  private readonly storeName = 'todos';

  constructor(
    private http: HttpClient,
    private databaseService: NgxIndexedDBService
  ) {}

  getAll(params?: TodoListRange) {
    return this.getWithParams(params);
  }

  getWithParams(params: TodoListRange) {
    const page = params.page;
    const limit = params.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return from(
      this.databaseService.getAll(this.storeName).then((todos) => {
        const limitedTodos = [];
        todos.forEach((user, index) => {
          if (index >= startIndex && index < endIndex) {
            limitedTodos.push(user);
          }
        });
        return limitedTodos;
        // TODO: move logic to getAllByIndex method
        // return this.databaseService.getAllByIndex(this.storeName);
      })
    );
  }

  getById(id: number) {
    return from(this.databaseService.getByID(this.storeName, id));
  }

  create(todo: TodoItem) {
    const item = { ...todo, id: getRandomId() };
    return from(
      this.databaseService
        .add(this.storeName, item)
        .then((id) => this.databaseService.getByID(this.storeName, id))
    );
  }

  update(todo: TodoItem) {
    return from(this.databaseService.update(this.storeName, todo));
  }

  delete(id: number) {
    return from(
      this.databaseService
        .delete(this.storeName, id)
        .then(() => this.databaseService.getAll(this.storeName))
    );
  }

  complete(id: number) {
    return from(
      this.databaseService
        .getByID(this.storeName, id)
        .then((item: TodoItem) => {
          item.done = !item.done;
          return this.databaseService.update(this.storeName, item).then(() => {
            return this.databaseService.getAll(this.storeName);
          });
        })
    );
  }
}
