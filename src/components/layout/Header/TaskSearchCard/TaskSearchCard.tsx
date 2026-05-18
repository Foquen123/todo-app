'use client';

import { Task } from '@/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export default function TaskSearchCard({
  task,
  onClick,
}: {
  task: Task;
  onClick: () => void;
}) {
  return (
    <>
      {task && (
        <Link
          href={`/edit/${task.id}`}
          onClick={onClick}
          className="flex w-full justify-between p-2.5 rounded-2xl border border-neutral-500 items-center gap-2.5 h-20 hover:bg-neutral-100 transition-all"
        >
          <p className="shrink grow truncate">{task.title}</p>
          <div className="rounded-lg overflow-hidden shrink-0">
            {task.image && (
              <Image
                alt="preview"
                src={task.image}
                width={100}
                height={100}
              ></Image>
            )}
          </div>
        </Link>
      )}
    </>
  );
}
