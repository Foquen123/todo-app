// hooks/useIndexedDB.ts
'use client';

import { Task } from '@/generated/prisma/client';
import { TaskStatus } from '@/generated/prisma/enums';
import { AppSuccess } from '@/lib/errors';
import { useEffect, useState } from 'react';

export function useIndexedDB() {
  const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   // IndexedDB доступна только после монтирования на клиенте
  //   setIsReady(true);
  // }, []);

  const saveTaskToIDB = async (data: {
    id: string;
    title: string;
    description: string;
    imageFile?: File | null;
    status: TaskStatus;
  }) => {
    // if (!isReady) {
    //   throw new Error('IndexedDB ещё не готова');
    // }

    // Динамический импорт
    const { saveToIndexedDB } = await import('@/lib/indexedDB/saveToIndexedDB');
    return saveToIndexedDB(data);
  };

  const getTasksFromIDB = async () => {
    const { getAllNotes } = await import('@/lib/indexedDB/getFromIndexedDB');
    const data = await getAllNotes();
    return AppSuccess.success<Task[]>(data);
  };

  return {
    saveTaskToIDB,
    getTasksFromIDB,
  };
}
