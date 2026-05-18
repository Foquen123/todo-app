'use client';
import { useSortable } from '@dnd-kit/react/sortable';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  title: string;
  desc: string;
  image?: string;
  id: string;
  index: number;
  column: string;
  onDelete: () => void;
}

export default function Todo({
  desc,
  image,
  title,
  id,
  index,
  column,
  onDelete,
}: IProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: column,
  });
  return (
    <div
      className="flex flex-col p-3 border-primary-200 rounded-lg bg-white overflow-hidden h-45 @container"
      ref={ref}
      data-dragging={isDragging}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-[25px] font-medium">{title}</h4>
        <div className="flex gap-1">
          <Link href={`/edit/${id}`} className="cursor-pointer ">
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
                d="M15.1306 4.19396C15.5648 4.01413 16.0301 3.92157 16.5 3.92157C16.9699 3.92157 17.4353 4.01413 17.8694 4.19396C18.3036 4.37379 18.698 4.63738 19.0303 4.96967C19.3626 5.30195 19.6262 5.69644 19.806 6.13059C19.9859 6.56475 20.0784 7.03007 20.0784 7.5C20.0784 7.96992 19.9859 8.43524 19.806 8.8694C19.6262 9.30356 19.3626 9.69804 19.0303 10.0303L8.53033 20.5303C8.38968 20.671 8.19891 20.75 8 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V16C3.25 15.8011 3.32902 15.6103 3.46967 15.4697L13.9697 4.96967C14.302 4.63738 14.6964 4.37379 15.1306 4.19396ZM16.5 5.42157C16.2271 5.42157 15.9568 5.47533 15.7046 5.57978C15.4525 5.68423 15.2233 5.83733 15.0303 6.03033L4.75 16.3107V19.25H7.68934L17.9697 8.96967C18.1627 8.77667 18.3158 8.54754 18.4202 8.29538C18.5247 8.04321 18.5784 7.77294 18.5784 7.5C18.5784 7.22705 18.5247 6.95678 18.4202 6.70462C18.3158 6.45245 18.1627 6.22333 17.9697 6.03033C17.7767 5.83733 17.5475 5.68423 17.2954 5.57978C17.0432 5.47533 16.7729 5.42157 16.5 5.42157Z"
                fill="#3D3D3D"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9697 5.96967C13.2626 5.67678 13.7374 5.67678 14.0303 5.96967L18.0303 9.96967C18.3232 10.2626 18.3232 10.7374 18.0303 11.0303C17.7374 11.3232 17.2626 11.3232 16.9697 11.0303L12.9697 7.03033C12.6768 6.73744 12.6768 6.26256 12.9697 5.96967Z"
                fill="#3D3D3D"
              />
            </svg>
          </Link>
          <button onClick={onDelete} className="cursor-pointer">
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
                d="M3.25 7C3.25 6.58579 3.58579 6.25 4 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H4C3.58579 7.75 3.25 7.41421 3.25 7Z"
                fill="#3D3D3D"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V11C9.25 10.5858 9.58579 10.25 10 10.25Z"
                fill="#3D3D3D"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 10.25C14.4142 10.25 14.75 10.5858 14.75 11V17C14.75 17.4142 14.4142 17.75 14 17.75C13.5858 17.75 13.25 17.4142 13.25 17V11C13.25 10.5858 13.5858 10.25 14 10.25Z"
                fill="#3D3D3D"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.9377 6.25259C5.35048 6.21819 5.71299 6.52493 5.74739 6.93771L6.74739 18.9377C6.74912 18.9584 6.74998 18.9792 6.74998 19C6.74998 19.3315 6.88168 19.6495 7.1161 19.8839C7.35052 20.1183 7.66846 20.25 7.99998 20.25H16C16.3315 20.25 16.6494 20.1183 16.8839 19.8839C17.1183 19.6495 17.25 19.3315 17.25 19C17.25 18.9792 17.2508 18.9584 17.2526 18.9377L18.2526 6.93771C18.287 6.52493 18.6495 6.21819 19.0623 6.25259C19.475 6.28699 19.7818 6.6495 19.7474 7.06228L18.7498 19.0337C18.741 19.7508 18.4523 20.4368 17.9445 20.9445C17.4288 21.4603 16.7293 21.75 16 21.75H7.99998C7.27063 21.75 6.57116 21.4603 6.05544 20.9445C5.54765 20.4368 5.25896 19.7508 5.25019 19.0337L4.25257 7.06228C4.21817 6.6495 4.52491 6.28699 4.9377 6.25259Z"
                fill="#3D3D3D"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 3.75C9.9337 3.75 9.87011 3.77634 9.82322 3.82322C9.77634 3.87011 9.75 3.9337 9.75 4V7C9.75 7.41421 9.41421 7.75 9 7.75C8.58579 7.75 8.25 7.41421 8.25 7V4C8.25 3.53587 8.43437 3.09075 8.76256 2.76256C9.09075 2.43437 9.53587 2.25 10 2.25H14C14.4641 2.25 14.9092 2.43437 15.2374 2.76256C15.5656 3.09075 15.75 3.53587 15.75 4V7C15.75 7.41421 15.4142 7.75 15 7.75C14.5858 7.75 14.25 7.41421 14.25 7V4C14.25 3.9337 14.2237 3.87011 14.1768 3.82322C14.1299 3.77634 14.0663 3.75 14 3.75H10Z"
                fill="#3D3D3D"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-between overflow-hidden">
        <p className="w-2/3 line-clamp-4 overflow-hidden text-wrap wrap-break-word">{desc}</p>
        <div className="relative shrink-0 rounded-2xl overflow-hidden aspect-square @min-[300px]:w-25 @min-[300px]:h-25 w-15 h-15">
          {image && (
            <Image
              src={image}
              alt="preview"
              fill
              objectFit="cover"
            ></Image>
          )}
        </div>
      </div>
    </div>
  );
}
