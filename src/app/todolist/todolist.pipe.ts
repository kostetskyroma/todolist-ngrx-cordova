import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from './todolist.interface';
import { identity } from 'rxjs';

@Pipe({
  name: 'todolist',
})
export class TodolistPipe implements PipeTransform {
  transform(todos: TodoItem[], searchString: string, time: string): unknown {
    let filterStrategyFn;
    if (time === 'all') {
      filterStrategyFn = identity;
    } else if (time === 'month') {
      filterStrategyFn = this.byMonth.bind(this);
    } else if (time === 'week') {
      filterStrategyFn = this.byWeek.bind(this);
    }
    return todos.filter((todo) => {
      return (
        todo.title.toLowerCase().includes(searchString.toLowerCase()) &&
        filterStrategyFn(todo)
      );
    });
  }

  byMonth(todo: TodoItem) {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    return this.include(startOfMonth, endOfMonth, todo.dueDate);
  }

  byWeek(todo: TodoItem) {
    const currentDate = new Date();
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );
    const endOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    );

    return this.include(startOfWeek, endOfWeek, todo.dueDate);
  }

  include(first: Date, last: Date, date: Date): boolean {
    return date >= first && date <= last;
  }
}
