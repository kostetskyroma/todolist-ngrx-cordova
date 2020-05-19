import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todolist.interface';
import { TodoListService } from './todolist.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectTodos } from '../store/selectors/todo.selectors';
import {
  CompleteTodoAction,
  DeleteTodoAction,
  GetAllTodoAction,
} from '../store/actions/todo.actions';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private readonly todoListService: TodoListService,
    private readonly store$: Store<TodoItem[]>,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.store$.dispatch(new GetAllTodoAction());
  }

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

  add() {
    this.router.navigate(['todo'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

  select(todo: TodoItem) {
    this.router.navigate([`todo/${todo?.id}`], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
