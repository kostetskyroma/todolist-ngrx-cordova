import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { getRandomId } from '../utils/id.util';
import { from } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable()
export class UserService {
  private readonly storeName = 'users';

  constructor(
    private http: HttpClient,
    private databaseService: NgxIndexedDBService
  ) {}

  getAll() {
    return this.databaseService.getAll(this.storeName);
  }

  getById(id: number) {
    return this.databaseService.getByID(this.storeName, id);
  }

  create(user: User) {
    const item = { ...user, id: getRandomId() };
    return from(
      this.databaseService
        .add(this.storeName, item)
        .then((id) => this.databaseService.getByID(this.storeName, id))
    );
  }

  update(user: User) {
    return from(this.databaseService.update(this.storeName, user));
  }

  delete(id: number) {
    return from(this.databaseService.delete(this.storeName, id));
  }
}
