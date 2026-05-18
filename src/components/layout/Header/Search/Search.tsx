'use client';
import { getTasks } from '@/actions/task';
import { Task } from '@/generated/prisma/client';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import TaskSearchCardSkeleton from '../TaskSearchCardSkeleton/TaskSearchCardSkeleton';
import TaskSearchCard from '../TaskSearchCard/TaskSearchCard';

export function Search() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [findedTasks, setFindedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  async function find() {
    if (searchTerm.trim().length === 0) return;
    setIsLoading(true);

    const res = await getTasks(searchTerm.trim());
    if (res.data) setFindedTasks(res.data);
    setIsLoading(false);
  }

  useEffect(() => {
    async function search() {
      await find();
    }
    if (debouncedSearchTerm.trim().length >= 1) search();
  }, [debouncedSearchTerm]);

  return (
    <>
      <div
        className="relative inline-block max-w-215 w-full"
        style={{ zIndex: isSearchFocused ? '50' : 'inherit' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            find();
          }}
        >
          <input
            // onBlur={() => {
            //   setTimeout(() => setIsSearchFocused(false), 200);
            // }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            type="text"
            placeholder="Поиск"
            className="w-full placeholder:text-[16px] placeholder:text-neutral-400 py-3 pl-6 pr-12 border border-neutral-200 focus:outline-neutral-200 rounded-l"
            style={{ background: isSearchFocused ? 'white' : 'transparent' }}
          />
          <button
            className="absolute right-6 top-3 disabled:opacity-30"
            type="submit"
            disabled={isLoading}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_27_250)">
                <path
                  d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
                  stroke="#3D3D3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21L15 15"
                  stroke="#3D3D3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_27_250">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>

        {isSearchFocused && (
          <div className="absolute w-full  top-[110%] rounded-lg bg-white border-4 border-neutral-200 p-2.5  max-h-[50vh] overflow-hidden flex flex-col">
            <div className='flex flex-col items-center gap-2.5 h-full grow overflow-y-auto'>
              {findedTasks.length === 0 && !isLoading && (
                <p className="my-8 text-neutral-500">Найдите что-нибудь...</p>
              )}
              {isLoading && (
                <>
                  <TaskSearchCardSkeleton></TaskSearchCardSkeleton>
                </>
              )}
              {!isLoading &&
                findedTasks.map((t) => (
                  <TaskSearchCard
                    onClick={() => setIsSearchFocused(false)}
                    key={t.id}
                    task={t}
                  ></TaskSearchCard>
                ))}
            </div>
          </div>
        )}
      </div>
      {isSearchFocused && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-40"
          onClick={() => setIsSearchFocused(false)}
        ></div>
      )}
    </>
  );
}
