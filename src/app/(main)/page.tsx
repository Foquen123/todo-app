'use client';

import PercentCircle from '@/components/tasks-page/PercentCircle/PercentCircle';
import TasksColumn from '@/components/tasks-page/TasksColumn/TasksColumn';
import Todo from '@/components/tasks-page/Todo/Todo';
import { DragDropProvider } from '@dnd-kit/react';
import { useEffect, useState } from 'react';
import { move } from '@dnd-kit/helpers';
import { siteConfig } from '@/config/site.config';
import { Task, TaskStatus } from '@/generated/prisma/client';
import toast from 'react-hot-toast';
import Spinner from '@/components/common/Spinner/Spinner';
import Link from 'next/link';
import { useTask } from '@/hooks/useTask';

const TODOS_ICONS: { icon: React.ReactNode }[] = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 3.9375C4.71821 3.9375 4.44796 4.04944 4.2487 4.2487C4.04944 4.44796 3.9375 4.71821 3.9375 5V19C3.9375 19.2818 4.04944 19.552 4.2487 19.7513C4.44796 19.9506 4.71821 20.0625 5 20.0625H19C19.2818 20.0625 19.552 19.9506 19.7513 19.7513C19.9506 19.552 20.0625 19.2818 20.0625 19V5C20.0625 4.71821 19.9506 4.44796 19.7513 4.2487C19.552 4.04944 19.2818 3.9375 19 3.9375H5ZM2.92287 2.92287C3.47376 2.37199 4.22093 2.0625 5 2.0625H19C19.7791 2.0625 20.5262 2.37199 21.0771 2.92287C21.628 3.47376 21.9375 4.22093 21.9375 5V19C21.9375 19.7791 21.628 20.5262 21.0771 21.0771C20.5262 21.628 19.7791 21.9375 19 21.9375H5C4.22093 21.9375 3.47376 21.628 2.92287 21.0771C2.37199 20.5262 2.0625 19.7791 2.0625 19V5C2.0625 4.22093 2.37199 3.47376 2.92287 2.92287Z"
          fill="#14367B"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.75 7C5.75 6.58579 6.08579 6.25 6.5 6.25H17.5C17.9142 6.25 18.25 6.58579 18.25 7C18.25 7.41421 17.9142 7.75 17.5 7.75H6.5C6.08579 7.75 5.75 7.41421 5.75 7Z"
          fill="#8F4F00"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.75 17C5.75 16.5858 6.08579 16.25 6.5 16.25H17.5C17.9142 16.25 18.25 16.5858 18.25 17C18.25 17.4142 17.9142 17.75 17.5 17.75H6.5C6.08579 17.75 5.75 17.4142 5.75 17Z"
          fill="#8F4F00"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 12.75C10.6076 12.75 9.27226 13.3031 8.28769 14.2877C7.30312 15.2723 6.75 16.6076 6.75 18V20C6.75 20.0663 6.77634 20.1299 6.82322 20.1768C6.87011 20.2237 6.93369 20.25 7 20.25H17C17.0663 20.25 17.1299 20.2237 17.1768 20.1768C17.2237 20.1299 17.25 20.0663 17.25 20V18C17.25 16.6076 16.6969 15.2723 15.7123 14.2877C14.7277 13.3031 13.3924 12.75 12 12.75ZM7.22703 13.227C8.4929 11.9612 10.2098 11.25 12 11.25C13.7902 11.25 15.5071 11.9612 16.773 13.227C18.0388 14.4929 18.75 16.2098 18.75 18V20C18.75 20.4641 18.5656 20.9092 18.2374 21.2374C17.9092 21.5656 17.4641 21.75 17 21.75H7C6.53587 21.75 6.09075 21.5656 5.76256 21.2374C5.43437 20.9092 5.25 20.4641 5.25 20V18C5.25 16.2098 5.96116 14.4929 7.22703 13.227Z"
          fill="#8F4F00"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.76256 2.76256C6.09075 2.43437 6.53587 2.25 7 2.25H17C17.4641 2.25 17.9092 2.43437 18.2374 2.76256C18.5656 3.09075 18.75 3.53587 18.75 4V6C18.75 7.79021 18.0388 9.5071 16.773 10.773C15.5071 12.0388 13.7902 12.75 12 12.75C10.2098 12.75 8.4929 12.0388 7.22703 10.773C5.96116 9.5071 5.25 7.79021 5.25 6V4C5.25 3.53587 5.43437 3.09075 5.76256 2.76256ZM7 3.75C6.9337 3.75 6.87011 3.77634 6.82322 3.82322C6.77634 3.87011 6.75 3.9337 6.75 4V6C6.75 7.39239 7.30312 8.72774 8.28769 9.71231C9.27226 10.6969 10.6076 11.25 12 11.25C13.3924 11.25 14.7277 10.6969 15.7123 9.71231C16.6969 8.72774 17.25 7.39239 17.25 6V4C17.25 3.93369 17.2237 3.87011 17.1768 3.82322C17.1299 3.77634 17.0663 3.75 17 3.75H7Z"
          fill="#8F4F00"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 3.75C4.66848 3.75 4.35054 3.8817 4.11612 4.11612C3.8817 4.35054 3.75 4.66848 3.75 5V19C3.75 19.3315 3.8817 19.6495 4.11612 19.8839C4.35054 20.1183 4.66848 20.25 5 20.25H19C19.3315 20.25 19.6495 20.1183 19.8839 19.8839C20.1183 19.6495 20.25 19.3315 20.25 19V5C20.25 4.66848 20.1183 4.35054 19.8839 4.11612C19.6495 3.8817 19.3315 3.75 19 3.75H5ZM3.05546 3.05546C3.57118 2.53973 4.27065 2.25 5 2.25H19C19.7293 2.25 20.4288 2.53973 20.9445 3.05546C21.4603 3.57118 21.75 4.27065 21.75 5V19C21.75 19.7293 21.4603 20.4288 20.9445 20.9445C20.4288 21.4603 19.7293 21.75 19 21.75H5C4.27065 21.75 3.57118 21.4603 3.05546 20.9445C2.53973 20.4288 2.25 19.7293 2.25 19V5C2.25 4.27065 2.53973 3.57118 3.05546 3.05546Z"
          fill="#81290E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5303 9.46967C15.8232 9.76256 15.8232 10.2374 15.5303 10.5303L11.5303 14.5303C11.2374 14.8232 10.7626 14.8232 10.4697 14.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697C8.76256 11.1768 9.23744 11.1768 9.53033 11.4697L11 12.9393L14.4697 9.46967C14.7626 9.17678 15.2374 9.17678 15.5303 9.46967Z"
          fill="#81290E"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const [stats, setStats] = useState<
    {
      type: TaskStatus;
      percent: number;
    }[]
  >([]);
  const [items2, setItems2] = useState<{
    TO_DO: Task[];
    IN_PROGRESS: Task[];
    COMPLETED: Task[];
  }>({
    TO_DO: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  });
  const [itemsCount, setItemsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { getMany, remove, updateStatuses } = useTask();

  useEffect(() => {
    const toDoCount = items2.TO_DO.length;
    const inProgressCount = items2.IN_PROGRESS.length;
    const completedCount = items2.COMPLETED.length;

    if (itemsCount > 0) {
      function x() {
        setStats([
          {
            percent: Math.ceil((toDoCount / itemsCount) * 100),
            type: 'TO_DO',
          },
          {
            percent: Math.ceil((inProgressCount / itemsCount) * 100),
            type: 'IN_PROGRESS',
          },
          {
            percent: Math.ceil((completedCount / itemsCount) * 100),
            type: 'COMPLETED',
          },
        ]);
      }
      x();
    }
  }, [items2, itemsCount]);

  useEffect(() => {
    async function getAll() {
      setIsLoading(true);
      // const res = await getTasks();
      const res = await getMany();

      // const res = await getTasksFromIDB();

      if (res.data) {
        setItemsCount(res.data.length);
        setItems2((prev) => {
          const newItems = { ...prev };
          newItems.TO_DO = res.data.filter((t) => t.status === 'TO_DO');
          newItems.IN_PROGRESS = res.data.filter(
            (t) => t.status === 'IN_PROGRESS',
          );
          newItems.COMPLETED = res.data.filter((t) => t.status === 'COMPLETED');
          return newItems;
        });
      }
      setIsLoading(false);
    }
    getAll();
  }, []);

  async function handleDragEnd() {
    const items = Object.entries(items2)
      .map(([i, j]) =>
        j.map((task) => {
          const newTask = task;
          newTask.status = i as TaskStatus;
          return newTask;
        }),
      )
      .flat();
    const itemsToUpdate = items.map((i) => ({ id: i.id, status: i.status }));

    await updateStatuses(itemsToUpdate);
  }

  async function onDelete(id: string) {
    setItems2((prev) => {
      const newItems = { ...prev };
      newItems.TO_DO = prev.TO_DO.filter((p) => p.id !== id);
      newItems.IN_PROGRESS = prev.IN_PROGRESS.filter((p) => p.id !== id);
      newItems.COMPLETED = prev.COMPLETED.filter((p) => p.id !== id);
      return newItems;
    });

    toast.promise(
      async () => {
        const result = await remove(id);
        if (result.error) throw result.error;
      },
      {
        loading: 'Удаление...',
        success: () => {
          return <p>Задача удалена!</p>;
        },
        error: (error) => <p>{error}</p>,
      },
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <h1 className="font-medium text-[32px] text-neutral-700">Задачи</h1>
        <div className="flex flex-wrap w-full p-2.5 justify-around items-center gap-2.5">
          {siteConfig.taskStatus.map((s, index) => (
            <PercentCircle
              key={s.id}
              pathColor={s.bgColor}
              value={stats[index] ? stats[index].percent : 0}
              desc={s.title}
            />
          ))}
        </div>
        {itemsCount === 0 && !isLoading && (
          <div className="flex flex-col gap-6 justify-center items-center py-12 px-4">
            <p className="text-neutral-600 text-lg font-medium">
              У вас нет ни одной задачи
            </p>
            <Link
              href={'/add'}
              className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Создать задачу
            </Link>
          </div>
        )}
        {itemsCount > 0 && (
          <div className="flex gap-6 flex-wrap">
            <DragDropProvider
              onDragEnd={handleDragEnd}
              onDragOver={(event) => {
                setItems2((items) => move(items, event));
              }}
            >
              {Object.entries(items2).map(([column, items], index) => (
                <TasksColumn
                  key={column}
                  id={column}
                  bgColor={siteConfig.taskStatus[index].bgColor}
                  borderColor={siteConfig.taskStatus[index].borderColor}
                  icon={TODOS_ICONS[index].icon}
                  title={siteConfig.taskStatus[index].title}
                >
                  {isLoading && (
                    <div className="self-center ">
                      <Spinner></Spinner>
                    </div>
                  )}
                  {!isLoading &&
                    items.map((id, index) => (
                      <Todo
                        onDelete={() => onDelete(id.id)}
                        key={id.id}
                        id={id.id}
                        index={index}
                        column={column}
                        desc={id.description}
                        image={id.image ? id.image : undefined}
                        title={id.title}
                      />
                    ))}
                </TasksColumn>
              ))}
            </DragDropProvider>
          </div>
        )}
      </div>
      {/* <TestWrap></TestWrap> */}
    </>
  );
}
