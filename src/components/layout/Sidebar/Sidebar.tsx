'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import { useLayoutStore } from '@/store/layout.store';

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useLayoutStore();

  const navItems: { path: string; name: string; icon: React.ReactNode }[] = [
    {
      name: 'Задачи',
      path: '/',
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
            d="M8.03033 3.96967C8.32322 4.26256 8.32322 4.73744 8.03033 5.03033L5.53033 7.53033C5.23744 7.82322 4.76256 7.82322 4.46967 7.53033L2.96967 6.03033C2.67678 5.73744 2.67678 5.26256 2.96967 4.96967C3.26256 4.67678 3.73744 4.67678 4.03033 4.96967L5 5.93934L6.96967 3.96967C7.26256 3.67678 7.73744 3.67678 8.03033 3.96967Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.03033 9.96967C8.32322 10.2626 8.32322 10.7374 8.03033 11.0303L5.53033 13.5303C5.23744 13.8232 4.76256 13.8232 4.46967 13.5303L2.96967 12.0303C2.67678 11.7374 2.67678 11.2626 2.96967 10.9697C3.26256 10.6768 3.73744 10.6768 4.03033 10.9697L5 11.9393L6.96967 9.96967C7.26256 9.67678 7.73744 9.67678 8.03033 9.96967Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.03033 15.9697C8.32322 16.2626 8.32322 16.7374 8.03033 17.0303L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303L2.96967 18.0303C2.67678 17.7374 2.67678 17.2626 2.96967 16.9697C3.26256 16.6768 3.73744 16.6768 4.03033 16.9697L5 17.9393L6.96967 15.9697C7.26256 15.6768 7.73744 15.6768 8.03033 15.9697Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.25 6C10.25 5.58579 10.5858 5.25 11 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H11C10.5858 6.75 10.25 6.41421 10.25 6Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.25 12C10.25 11.5858 10.5858 11.25 11 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H11C10.5858 12.75 10.25 12.4142 10.25 12Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.25 18C10.25 17.5858 10.5858 17.25 11 17.25H20C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75H11C10.5858 18.75 10.25 18.4142 10.25 18Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: 'Добавить задачу',
      path: '/add',
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
            d="M12 4.25C12.4142 4.25 12.75 4.58579 12.75 5V19C12.75 19.4142 12.4142 19.75 12 19.75C11.5858 19.75 11.25 19.4142 11.25 19V5C11.25 4.58579 11.5858 4.25 12 4.25Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <aside
        className={`${isSidebarOpen && styles['is-open']} ${styles['sidebar']} relative `}
      >
        <h2 className="flex gap-2 items-center font-medium text-[25px] text-neutral-700">
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.7487 14.1421L14.1421 3.53553L3.53552 14.1421L14.1421 24.7487L24.7487 14.1421ZM14.1421 0L-1.50204e-05 14.1421L14.1421 28.2843L28.2843 14.1421L14.1421 0Z"
              fill="#2563DC"
            />
          </svg>
          Todo app
        </h2>

        <button
          className="min-[1000px]:hidden block  absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* <div className=' overflow-hidden h-100'> */}
            <nav className="flex flex-col gap-2.5 grow h-full overflow-y-auto">
              {navItems.map((i) => (
                <Link
                  key={i.path}
                  className={`${styles['nav-item']} ${pathname === i.path && styles['active']}`}
                  href={i.path}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {i.icon}
                  {i.name}
                </Link>
              ))}
            </nav>
          {/* </div> */}
      </aside>
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-blue-950 opacity-30 z-10"
        ></div>
      )}
    </>
  );
}
