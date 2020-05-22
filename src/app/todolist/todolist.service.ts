import { Injectable } from '@angular/core';
import { config } from '../core/config/api.config';
import { TodoItem } from './todolist.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TodoListService {
  constructor(private http: HttpClient) {}

  getAll(params?) {
    return this.http.get<TodoItem[]>(`${config.apiUrl}/todos`, {
      params,
    });
  }

  getById(id: number) {
    return this.http.get(`${config.apiUrl}/todos/` + id);
  }

  create(todo: TodoItem) {
    return this.http.post(`${config.apiUrl}/todos/create`, todo);
  }

  update(todo: TodoItem) {
    return this.http.put(`${config.apiUrl}/todos/` + todo.id, todo);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/todos/` + id);
  }

  complete(id: number) {
    return this.http.put(`${config.apiUrl}/todos/complete/` + id, id);
  }
}
