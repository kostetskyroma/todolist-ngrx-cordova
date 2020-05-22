import { Component, OnInit } from '@angular/core';
import { TodoItem, TodoListRange } from './todolist.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectTodos } from '../store/selectors/todo.selectors';
import {
  CompleteTodoAction,
  DeleteTodoAction,
  GetAllTodoAction,
  GetWithParamsTodoAction,
} from '../store/actions/todo.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  public todos$: Observable<TodoItem[]> = this.store$.pipe(select(selectTodos));
  public infiniteScroll = {
    throttle: 300,
    scrollDistance: 0.2,
    limit: 10,
    page: 1,
    scrollWindow: false,
  };
  public filter = {
    search: '',
    time: 'all',
  };

  constructor(
    private readonly store$: Store<TodoItem[]>,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    const params: TodoListRange = {
      page:
        +this.route.snapshot.queryParamMap.get('page') ||
        this.infiniteScroll.page,
      limit:
        +this.route.snapshot.queryParamMap.get('limit') ||
        this.infiniteScroll.limit,
    };
    this.store$.dispatch(new GetAllTodoAction(params));
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
    });
  }

  ngOnInit(): void {}

  onScroll() {
    const params: TodoListRange = {
      page: +this.route.snapshot.queryParamMap.get('page') + 1,
      limit: +this.route.snapshot.queryParamMap.get('limit'),
    };
    this.store$.dispatch(new GetWithParamsTodoAction(params));
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
    });
  }

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
