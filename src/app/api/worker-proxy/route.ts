import { updateTasksStatuses } from '@/actions/task';

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  const result = await updateTasksStatuses(data);
  return Response.json(result);
}
