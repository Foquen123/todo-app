'use server';

import { Task } from '@/generated/prisma/client';
import { ITaskRequest, ITaskStatusToUpdate } from '@/interfaces/task.interface';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { revalidatePath } from 'next/cache';
import { AppError, AppSuccess } from '@/lib/errors';
import { promises as fs } from 'fs';

async function uploadPhoto(file: File) {
  try {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return { error: 'Неподдерживаемый тип файла' };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { error: 'Файл слишком большой (макс. 5MB)' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${safeName}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Создаем папку если нет
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    revalidatePath('/');

    return {
      success: true,
      filename,
      url: `/uploads/${filename}`,
      apiUrl: `/api/uploads/${filename}`,
    };
  } catch (error) {
    console.error('Ошибка:', error);
    return { error: 'Ошибка при загрузке файла' };
  }
}

async function deletePhoto(filePath: string) {
  try {
    // Проверка на пустой путь
    if (!filePath || filePath.trim() === '') {
      return {
        success: false,
        error: 'Путь к файлу не указан',
      };
    }

    // Извлекаем только имя файла из полного пути
    // Например: /uploads/1778929008558-_______________6_.png -> 1778929008558-_______________6_.png
    const filename = path.basename(filePath);

    // Дополнительная проверка, что имя файла не пустое
    if (!filename) {
      return {
        success: false,
        error: 'Некорректный путь к файлу',
      };
    }

    // Проверка расширения файла (опционально)
    const allowedExtensions = [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.webp',
      '.pdf',
      '.doc',
      '.docx',
    ];
    const ext = path.extname(filename).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return {
        success: false,
        error: 'Недопустимый тип файла',
      };
    }

    // Формируем путь к файлу в папке public/uploads
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Проверка существования файла
    try {
      await fs.access(fullPath);
    } catch {
      return {
        success: false,
        error: 'Файл не найден',
      };
    }

    // Удаление файла
    await fs.unlink(fullPath);

    // Ревалидация кэша
    revalidatePath('/uploads');

    return {
      success: true,
      message: `Файл ${filename} успешно удален`,
      filename: filename,
    };
  } catch (error) {
    console.error('Ошибка при удалении файла:', error);
    return {
      success: false,
      error: 'Произошла ошибка при удалении файла',
    };
  }
}

async function checkAuthorize() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session) return session.user.id;
  return null;
}

export async function createTask(data: ITaskRequest) {
  const userId = await checkAuthorize();
  if (!userId) return AppError.unauthorized();
  try {
    let filename;
    if (data.image) {
      const res = await uploadPhoto(data.image);
      // filename = res.url;
      filename = res.apiUrl;
    }
    const task = await prisma.task.create({
      data: { ...data, userId: userId, image: filename },
    });
    return AppSuccess.success<Task>(task);
  } catch {
    return AppError.createError();
  }
}

export async function getTasks(searchTerm: string = '') {
  const userId = await checkAuthorize();
  if (!userId) return AppError.unauthorized();
  try {
    const tasks = await prisma.task.findMany({
      where: { userId, title: { contains: searchTerm, mode: 'insensitive' } },
    });
    return AppSuccess.success<Task[]>(tasks);
  } catch {
    return AppError.readError();
  }
}

export async function getTask(id: string) {
  const userId = await checkAuthorize();
  if (!userId) return AppError.unauthorized();
  try {
    const task = await prisma.task.findFirst({
      where: { id },
    });
    if (task) return AppSuccess.success<Task>(task);
    else return AppError.readError();
  } catch {
    return AppError.readError();
  }
}

export async function deleteTask(id: string) {
  const userId = await checkAuthorize();
  if (!userId) return AppError.unauthorized();
  try {
    const findedTask = await prisma.task.findFirst({ where: { id } });
    const image = findedTask?.image;
    if (image) {
      await deletePhoto(image);
    }
    const task = await prisma.task.delete({
      where: { id },
    });
    return AppSuccess.success<Task>(task);
  } catch {
    return AppError.deleteError();
  }
}

export async function updateTask(id: string, data: ITaskRequest) {
  const userId = await checkAuthorize();
  if (!userId) return AppError.unauthorized();

  try {
    let filename;
    if (data.image) {
      const task = await prisma.task.findFirst({ where: { id } });
      const image = task?.image;
      if (image) {
        await deletePhoto(image);
      }
      const res = await uploadPhoto(data.image);
      if (res.success) filename = res.apiUrl;
      if (res.error) throw res.error;
    }
    const task = await prisma.task.update({
      where: { id },
      data: { ...data, image: filename ? filename : null },
    });
    return AppSuccess.success<Task>(task);
  } catch {
    return AppError.updateError();
  }
}

export async function updateTasksStatuses(
  tasksToUpdate: ITaskStatusToUpdate[],
) {
  // await new Promise<void>((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 100000); // 100 секунд = 100000 миллисекунд
  // });
  const userId = await checkAuthorize();
  if (!userId) return AppError.unauthorized();
  try {
    for (const taskToUpdate of tasksToUpdate) {
      await prisma.task.update({
        where: { id: taskToUpdate.id },
        data: { status: taskToUpdate.status },
      });
    }

    return AppSuccess.success(null);
  } catch {
    return AppError.updateError();
  }
}
