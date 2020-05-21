import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import {
  CreateTodoAction,
  UpdateTodoAction,
} from '../store/actions/todo.actions';
import { Store } from '@ngrx/store';
import { TodoItem } from '../todolist/todolist.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  form = this.formBuilder.group({
    id: [],
    title: ['', Validators.required],
    description: [''],
    dueDate: [],
    photo: [],
  });

  constructor(
    private readonly store$: Store<TodoItem[]>,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.todo$.subscribe((todo) => this.form.patchValue(todo || {}));
  }

  get id$() {
    return this.route.params.pipe(
      map(({ id }) => +id),
      shareReplay(1)
    );
  }

  get todo$() {
    return this.route.data.pipe(
      map(({ todo }) => todo?.payload),
      shareReplay(1)
    );
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    const todo: TodoItem = this.form?.value;

    this.store$.dispatch(
      todo?.id ? new UpdateTodoAction(todo) : new CreateTodoAction(todo)
    );
    this.router.navigate(['..']);
  }
}
