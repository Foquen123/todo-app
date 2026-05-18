import { TaskStatus } from '@/generated/prisma/enums';

export const siteConfig: {
  taskStatus: {
    id: TaskStatus;
    title: string;
    bgColor: string;
    borderColor: string;
  }[];
} = {
  taskStatus: [
    {
      id: 'TO_DO',
      title: 'Не начато',
      bgColor: 'var(--primary-100)',
      borderColor: 'var(--primary-200)',
    },
    {
      id: 'IN_PROGRESS',
      title: 'В процессе',
      bgColor: 'var(--warning-100)',
      borderColor: 'var(--warning-200)',
    },
    {
      id: 'COMPLETED',
      title: 'Завершено',
      bgColor: 'var(--error-100)',
      borderColor: 'var(--error-200)',
    },
  ],
} as const;
