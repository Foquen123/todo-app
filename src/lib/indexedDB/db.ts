// lib/db.ts

import { ITaskFromIDB } from '@/interfaces/task.interface';
import { openDB, DBSchema } from 'idb';

interface TaskLocalDB extends DBSchema {
  tasks: {
    key: string; 
    value: ITaskFromIDB;
    indexes: {
      'byTitle': string;
    }
  };
}

const dbPromise = openDB<TaskLocalDB>('TodoApp', 1, {
  upgrade(db) {
    const store = db.createObjectStore('tasks', { keyPath: 'id' });
    store.createIndex('byTitle', 'title');
  },
});

export { dbPromise };
