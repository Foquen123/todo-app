'use client';

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/actions/task';
import { ITaskRequest, ITaskStatusToUpdate } from '@/interfaces/task.interface';
import { AppError } from '@/lib/errors';
import { useEffect, useRef, useState } from 'react';
import * as Comlink from 'comlink';
import { authClient } from '@/lib/auth-client';

type WorkerApi = {
  updateTasksStatusesWorker: (data: ITaskStatusToUpdate[]) => Promise<void>;
  updateTasksStatusesWorkerLocal: (
    data: ITaskStatusToUpdate[],
  ) => Promise<void>;
};

export function useTask() {
  // const [isLocal, setIsLocal] = useState(false);

  const { data: session } = authClient.useSession();

  const workerRef = useRef<Comlink.Remote<WorkerApi> | null>(null);
  const workerInstanceRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerInstanceRef.current = new Worker(
      new URL('@/workers/api.worker.ts', import.meta.url),
      { type: 'module' },
    );
    workerRef.current = Comlink.wrap<WorkerApi>(workerInstanceRef.current);

    return () => {
      workerInstanceRef.current?.terminate();
    };
  }, []);

  const create = async (data: ITaskRequest) => {
    const res = await createTask(data);
    if (res.code === AppError.unauthorized().code) {
      const { saveToIndexedDB } = await import('@/lib/indexedDB/task');
      const localSaveRes = await saveToIndexedDB(data);
      return localSaveRes;
    } else {
      return res;
    }
  };

  const getOne = async (id: string) => {
    const res = await getTask(id);
    if (res.code === AppError.unauthorized().code) {
      const { getNoteById } = await import('@/lib/indexedDB/task');
      const localGetRes = await getNoteById(id);
      return localGetRes;
    } else {
      return res;
    }
  };

  const getMany = async (searchTerm: string = '') => {
    const res = await getTasks(searchTerm);
    if (res.code === AppError.unauthorized().code) {
      const { getAllNotes } = await import('@/lib/indexedDB/task');
      const localGetRes = await getAllNotes(searchTerm);
      return localGetRes;
    } else {
      return res;
    }
  };

  const remove = async (id: string) => {
    const res = await deleteTask(id);
    if (res.code === AppError.unauthorized().code) {
      const { removeNoteById } = await import('@/lib/indexedDB/task');
      const localDeleteRes = await removeNoteById(id);
      return localDeleteRes;
    } else {
      return res;
    }
  };

  const update = async (id: string, data: ITaskRequest) => {
    const res = await updateTask(id, data);
    if (res.code === AppError.unauthorized().code) {
      const { updateNote } = await import('@/lib/indexedDB/task');
      const localUpdateRes = await updateNote(id, data);
      return localUpdateRes;
    } else {
      return res;
    }
  };

  const updateStatuses = async (data: ITaskStatusToUpdate[]) => {
    if (workerRef.current) {
      if (session) {
        await workerRef.current.updateTasksStatusesWorker(data);
      } else {
        await workerRef.current.updateTasksStatusesWorkerLocal(data);
      }
    }
  };

  return { create, getOne, getMany, remove, update, updateStatuses };
}
