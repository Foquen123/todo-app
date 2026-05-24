// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Decorative element */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="text-[180px] font-bold text-primary-200 select-none leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
            Страница не найдена
          </h1>
          
          <p className="text-lg text-neutral-600 max-w-md mx-auto">
            Извините, мы не можем найти страницу, которую вы ищете. Возможно, она была перемещена или удалена.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-600/30"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}