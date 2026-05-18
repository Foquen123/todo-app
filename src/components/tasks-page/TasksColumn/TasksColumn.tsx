'use client';

import { useDroppable } from '@dnd-kit/react';
import { useEffect, useMemo, useState } from 'react';
import { CollisionPriority } from '@dnd-kit/abstract';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  borderColor: string;
  bgColor: string;
  id: string;
}

export default function TasksColumn({
  children,
  icon,
  title,
  bgColor,
  borderColor,
  id,
}: IProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { isDropTarget, ref } = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  });

  // const hasChildren = React.Children.count(children) > 0;

  const validChildren = React.Children.toArray(children);

  const hasChildren = validChildren.length > 0;

  return (
    <div
      ref={isOpen ? ref : undefined}
      className="grow min-w-80 max-[400px]:min-w-50 flex flex-col border  rounded-xl  p-3 basis-1"
      style={{
        height: 'max-content',
        border: `1px solid ${borderColor}`,
        backgroundColor: `${bgColor}`,
      }}
    >
      <div
        className="flex gap-3 items-center justify-between select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex gap-3">
          {icon}
          {title}
        </div>
        <button
          className="transition-all"
          style={{ transform: isOpen ? 'rotateZ(0deg)' : 'rotateZ(90deg)' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        className="flex flex-col gap-3 overflow-hidden transition-all"
        style={{ height: isOpen ? 'auto' : '0px' }}
      >
        <div></div>
        {children}
        {!hasChildren && (
          <div className="text-center text-gray-400 py-8 border-2 border-dashed border-gray-300 rounded-lg">
            Перетащите задачи сюда
          </div>
        )}
      </div>
    </div>
  );
}
