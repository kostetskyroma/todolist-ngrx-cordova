import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { CreateTodoAction } from '../store/actions/todo.actions';
import { select, Store } from '@ngrx/store';
import { TodoItem } from '../todolist/todolist.interface';
import { Observable } from 'rxjs';
import { selectById } from '../store/selectors/todo.selectors';

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
    return this.id$.pipe(
      switchMap((id) => this.store$.pipe(select(selectById(id))))
    );
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }
    const data = {
      ...this.form?.value,
      ...{
        dueDate: this.form?.value?.dueDate
          ? new Date(this.form?.value?.dueDate)
          : null,
      },
    };
    this.store$.dispatch(new CreateTodoAction(data));
    this.router.navigate(['..']);
  }
}
