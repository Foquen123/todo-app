import { TaskStatus } from '@/generated/prisma/enums';

export interface ITaskRequest {
  title: string;
  image?: File;
  // image: {
  //   file: File | null;
  //   url: string | null;
  // };
  description: string;
  status: TaskStatus;
}

export interface ITaskResponse {
  id: string;
  title: string;
  image?: string;
  description: string;
  status: TaskStatus;
}

export interface ITaskStatusToUpdate {
  id: string;
  status: TaskStatus;
}

export interface ITaskFromIDB {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  image: ArrayBuffer | null;
  imageType: string | null;
  createdAt: number;
}