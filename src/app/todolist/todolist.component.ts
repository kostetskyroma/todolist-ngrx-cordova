import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todolist.interface';
import { TodoListService } from './todolist.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectTodos } from '../store/selectors/todo.selectors';
import {
  CompleteTodoAction,
  CreateTodoAction,
  DeleteTodoAction,
} from '../store/actions/todo.actions';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  public todos$: Observable<TodoItem[]> = this.store$.pipe(select(selectTodos));
  public filter = {
    search: '',
    time: 'all',
  };
  public todo: string;

  constructor(
    private readonly todoListService: TodoListService,
    private readonly store$: Store<TodoItem[]>
  ) {}

  ngOnInit(): void {}

  filterByTime(by: string) {
    this.filter.time = by;
  }

  delete(id: number) {
    this.store$.dispatch(new DeleteTodoAction(id));
  }

  complete(id: number) {
    this.store$.dispatch(new CompleteTodoAction(id));
  }

  add(todo: string) {
    this.store$.dispatch(
      new CreateTodoAction({ title: todo, done: false, dueDate: new Date() })
    );
    this.todo = '';
  }
}
