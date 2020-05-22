import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'database',
  version: 1,
  objectStoresMeta: [
    {
      store: 'todos',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'title',
          keypath: 'title',
          options: { unique: false },
        },
        {
          name: 'description',
          keypath: 'description',
          options: { unique: false },
        },
        {
          name: 'dueDate',
          keypath: 'dueDate',
          options: { unique: false },
        },
        {
          name: 'photo',
          keypath: 'photo',
          options: { unique: false },
        },
        {
          name: 'done',
          keypath: 'done',
          options: { unique: false },
        },
      ],
    },
    {
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'username',
          keypath: 'username',
          options: { unique: true },
        },
        {
          name: 'password',
          keypath: 'password',
          options: { unique: false },
        },
        {
          name: 'firstname',
          keypath: 'firstname',
          options: { unique: false },
        },
        {
          name: 'lastname',
          keypath: 'lastname',
          options: { unique: false },
        },
      ],
    },
  ],
};
