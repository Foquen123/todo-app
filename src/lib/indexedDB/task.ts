import { Task } from '@/generated/prisma/client';
import { dbPromise } from './db';
import { AppError, AppSuccess } from '../errors';
import {
  ITaskFromIDB,
  ITaskRequest,
  ITaskStatusToUpdate,
} from '@/interfaces/task.interface';
import { v4 } from 'uuid';

function revokeImageUrl(url: string) {
  URL.revokeObjectURL(url);
}

function convertNoteToView(note: ITaskFromIDB): Task {
  let imageUrl: string | null = null;

  if (note.image && note.imageType) {
    const blob = new Blob([note.image], { type: note.imageType });
    imageUrl = URL.createObjectURL(blob);
  }

  return {
    id: note.id,
    title: note.title,
    description: note.description,
    image: imageUrl,
    createdAt: new Date(note.createdAt),
    status: note.status,
    updatedAt: new Date('1'),
    userId: '',
  };
}

export async function getAllNotes(searchTerm: string = '') {
  const db = await dbPromise;
  const index = db.transaction('tasks').store.index('byTitle');
  const query = IDBKeyRange.bound(searchTerm, searchTerm + '\uffff');
  const notes = await index.getAll(query);
  const data = notes.map(convertNoteToView);
  return AppSuccess.success<Task[]>(data);
}

export async function getNoteById(id: string) {
  const db = await dbPromise;
  const note = await db.get('tasks', id);

  if (!note) return AppError.readError();
  const data = convertNoteToView(note);
  return AppSuccess.success<Task>(data);
}

export async function saveToIndexedDB(data: ITaskRequest) {
  const db = await dbPromise;

  let imageBuffer: ArrayBuffer | null = null;
  let imageType: string | null = null;

  if (data.image) {
    imageBuffer = await data.image.arrayBuffer();
    imageType = data.image.type;
  }

  await db.put('tasks', {
    id: v4(),
    title: data.title,
    description: data.description,
    image: imageBuffer,
    imageType: imageType,
    createdAt: Date.now(),
    status: data.status,
  });

  return AppSuccess.success<string>(data.title);
}

export async function removeNoteById(id: string) {
  const db = await dbPromise;
  await db.delete('tasks', id);
  return AppSuccess.success<string>('');
}

export async function updateNote(id: string, data: ITaskRequest) {
  const db = await dbPromise;

  let imageBuffer: ArrayBuffer | null = null;
  let imageType: string | null = null;

  if (data.image) {
    imageBuffer = await data.image.arrayBuffer();
    imageType = data.image.type;
  }

  await db.put('tasks', {
    id: id,
    title: data.title,
    description: data.description,
    image: imageBuffer,
    imageType: imageType,
    createdAt: Date.now(),
    status: data.status,
  });

  return AppSuccess.success<string>(data.title);
}

export async function updateNotesStatuses(
  tasksToUpdate: ITaskStatusToUpdate[],
) {
  const db = await dbPromise;
  for (const taskToUpdate of tasksToUpdate) {
    const prevTask = await db.get('tasks', taskToUpdate.id);
    if (prevTask) {
      await db.put('tasks', {
        id: prevTask.id,
        title: prevTask.title,
        description: prevTask.description,
        image: prevTask.image,
        imageType: prevTask.imageType,
        createdAt: prevTask.createdAt,
        status: taskToUpdate.status,
      });
    }
  }

  return AppSuccess.success<null>(null);
}
