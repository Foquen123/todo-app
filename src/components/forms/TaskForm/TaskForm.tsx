'use client';

import Spinner from '@/components/common/Spinner/Spinner';
import { siteConfig } from '@/config/site.config';
import { ITaskRequest } from '@/interfaces/task.interface';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './TaskForm.module.css';
import toast from 'react-hot-toast';
import { Task } from '@/generated/prisma/client';
import { useTask } from '@/hooks/useTask';
import { authClient } from '@/lib/auth-client';
import FileUploadZone from './FileUploadZone/FileUploadZone';
import TaskStatusCard from './TaskStatusCard/TaskStatusCard';

const showUnregisteredToast = () => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Внимание!</p>
              <p className="mt-1 text-sm text-gray-500">
                Вы не вошли в аккаунт. Все данные сохраняются локально
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Закрыть
          </button>
        </div>
      </div>
    ),
    { duration: Infinity },
  );
};

interface IProps {
  taskId?: string;
  initialData?: Task;
  isLocal?: boolean;
}

export default function TaskForm({
  taskId,
  initialData,
  isLocal = false,
}: IProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image || null,
  );
  const [form, setForm] = useState<ITaskRequest>({
    description: initialData?.description || '',
    status: initialData?.status || 'TO_DO',
    title: initialData?.title || '',
    image: undefined,
  });
  const [isPending, setIsPending] = useState(false);
  const [formError, setFormError] = useState<{
    descriptionError: string | null;
    titleError: string | null;
  }>({
    descriptionError: null,
    titleError: null,
  });

  const { data: session } = authClient.useSession();

  useEffect(() => {
    function x() {
      setFormError({ descriptionError: null, titleError: null });
    }
    x();
  }, [form]);

  const { create, getOne, update } = useTask();

  // local initialize
  useEffect(() => {
    const init = async () => {
      if (isLocal && taskId) {
        const res = await getOne(taskId);
        if (res.data) {
          const task = res.data;
          setForm({
            image: undefined,
            description: task.description,
            status: task.status,
            title: task.title,
          });
          setPreviewImage(task.image);
        }
      }
    };
    init();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let hasError = false;
    if (!form.description) {
      hasError = true;
      setFormError((prev) => ({
        ...prev,
        descriptionError: 'Описание обязательно',
      }));
    }
    if (!form.title) {
      hasError = true;
      setFormError((prev) => ({
        ...prev,
        titleError: 'Название обязательно',
      }));
    }
    if (hasError) {
      toast.error('Ошибка при заполнении формы');
      return;
    }

    if (!session) {
      showUnregisteredToast();
    }

    if (taskId) {
      toast.promise(
        async () => {
          setIsPending(true);
          // const result = await updateTask(taskId, form);
          const result = await update(taskId, form);
          if (result.error) throw result.error;
        },
        {
          loading: 'Обновление...',
          success: () => {
            setIsPending(false);
            return <p>Задача обновлена!</p>;
          },
          error: (error) => {
            setIsPending(false);
            return <p>{error.message ? error.message : error}</p>;
          },
          // error: (error) => <p>оывафыафыв</p>,
        },
      );
    } else {
      toast.promise(
        async () => {
          setIsPending(true);
          // const result = await createTask(form);
          const result = await create(form);
          if (result.error) throw result.error;
        },
        {
          loading: 'Выполнение...',
          success: () => {
            setIsPending(false);
            return <p>Задача создана!</p>;
          },
          error: (error) => <p>{error}</p>,
        },
      );
    }
    redirect('/');
  }

  return (
    <>
      {/* {isFormLoading && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Spinner></Spinner>
        </div>
      )} */}
      {
        <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
          <div className="flex gap-10 max-[870px]:flex-col">
            <div className="flex flex-col grow gap-4">
              <input
                style={{
                  border: formError.titleError
                    ? '1px solid var(--error-500)'
                    : '',
                }}
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                name="title"
                id="title_id"
                type="text"
                data-is-error={!!formError.titleError}
                className={`${styles['input']} p-3 border border-neutral-300 rounded-xl focus:outline-0 focus:border-neutral-500 text-[14px] transition-colors`}
                placeholder="Название"
              />

              <div className="flex gap-4 flex-wrap">
                {siteConfig.taskStatus.map((s) => (
                  <TaskStatusCard
                    key={s.title}
                    bgColor={s.bgColor}
                    borderColor={s.borderColor}
                    title={s.title}
                    isSelect={form.status === s.id}
                    onClick={() => {
                      setForm((prev) => ({ ...prev, status: s.id }));
                    }}
                  ></TaskStatusCard>
                ))}
              </div>
            </div>
            <FileUploadZone
              previewUrl={previewImage}
              setFile={(file) => {
                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                } else {
                  setPreviewImage(null);
                }
                setForm((prev) => ({
                  ...prev,
                  image: file ? file : undefined,
                }));
              }}
            ></FileUploadZone>
          </div>

          <textarea
            style={{
              border: formError.descriptionError
                ? '1px solid var(--error-500)'
                : '',
            }}
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Описание"
            name="desc"
            id="desc_id"
            data-is-error={!!formError.descriptionError}
            className={`${styles['textarea']} resize-none h-100 p-3 border border-neutral-300 rounded-xl focus:outline-0 focus:border-neutral-500 text-[14px] `}
          ></textarea>
          <button
            disabled={isPending}
            type="submit"
            className="p-2.5 rounded-lg bg-primary-500 text-white cursor-pointer flex justify-center gap-2"
          >
            {taskId ? 'Обновить' : 'Сохранить'}
            {isPending && <Spinner size="sm"></Spinner>}
          </button>
        </form>
      }
    </>
  );
}
