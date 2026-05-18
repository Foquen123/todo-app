import { getTask } from '@/actions/task';
import TaskForm from '@/components/forms/TaskForm/TaskForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if(!session) return <TaskForm taskId={id?.toString()} initialData={undefined} isLocal={true}></TaskForm>;

  const result = await getTask(id);
  const task = result.data;
  if (!task) {
    notFound(); // Вызывается на сервере, до рендера клиентского компонента
  }

  return <TaskForm taskId={id?.toString()} initialData={task}></TaskForm>;
}
