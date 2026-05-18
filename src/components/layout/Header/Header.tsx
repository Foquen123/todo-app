'use client';
import Image from 'next/image';
import styles from './Header.module.css';
import { useLayoutStore } from '@/store/layout.store';
import { useEffect, useRef, useState } from 'react';
import AuthModal from '@/components/modals/AuthModal';
import { authClient } from '@/lib/auth-client';
import { Search } from './Search/Search';

export default function Header() {
  const { setIsSidebarOpen } = useLayoutStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          refetch();
          window.location.reload();
        },
      },
    });
  }

  return (
    <>
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></AuthModal>
      <header className=" py-5.5 px-2.5 min-[1000px]:px-16 bg-white border-b border-neutral-200 flex justify-between items-center gap-2.5">
        <button
          className={`${styles['burger-btn']} hidden cursor-pointer`}
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Search></Search>
        <div className="flex gap-1 items-center relative">
          <div>
            {session && !isPending && (
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="rounded-full w-11 h-11 relative overflow-hidden shrink-0"
              >
                <Image
                  src={session.user.image ? session.user.image : '/avatar.jpg'}
                  alt="avatar"
                  fill
                  className="object-cover"
                ></Image>
              </div>
            )}
            <div
              ref={dropdownRef}
              className="absolute top-[105%] right-0 w-50  bg-white rounded-lg p-2.5 border border-primary-200"
              style={{
                display: isDropdownOpen && session ? 'inherit' : 'none',
              }}
            >
              {session && !isPending && (
                <button
                  onClick={handleSignOut}
                  className="w-full group flex items-center justify-center gap-3 px-4 py-3 
             text-red-500 bg-red-50 hover:bg-red-500 hover:text-white
             rounded-xl transition-all duration-300 ease-out
             border border-red-200 hover:border-red-500
             hover:shadow-lg hover:shadow-red-500/20 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-medium">Выйти</span>
                </button>
              )}
            </div>
          </div>
          {!session && !isPending && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Войти
            </button>
          )}
        </div>
      </header>
    </>
  );
}
