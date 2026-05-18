import { ITaskStatusToUpdate } from '@/interfaces/task.interface';
import { updateNotesStatuses } from '@/lib/indexedDB/task';
import * as Comlink from 'comlink';

async function updateTasksStatusesWorker(data: ITaskStatusToUpdate[]) {
  await fetch('/api/worker-proxy', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return;
}

async function updateTasksStatusesWorkerLocal(data: ITaskStatusToUpdate[]) {
  await updateNotesStatuses(data);
  return;
}

Comlink.expose({
  updateTasksStatusesWorker,
  updateTasksStatusesWorkerLocal,
});
