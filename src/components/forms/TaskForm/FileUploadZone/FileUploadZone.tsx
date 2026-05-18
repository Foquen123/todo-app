

import Image from 'next/image';
import { ChangeEvent } from 'react';
import toast from 'react-hot-toast';

export default function FileUploadZone({
  setFile,
  previewUrl,
}: {
  setFile: (file: File | null) => void;
  previewUrl: string | null;
}) {
  const MAX_FILE_SIZE = 1024 * 1024;
  const dropZoneClasses =
    'w-80 max-[450px]:w-60 max-[350px]:w-50 border-2 p-8 border-dashed border-neutral-300 rounded-xl hover:border-primary-400 transition-all duration-200 bg-neutral-50 hover:bg-primary-50/30 cursor-pointer h-47.5';
  return (
    <>
      <input
        type="file"
        accept=".png, .jpg"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          if (files.length > 0) {
            const file = files[0];
            if (file.size >= MAX_FILE_SIZE) {
              toast.error('Файл слишком большой');
              e.target.value = '';
              return;
            } else {
              setFile(file);
            }
          }
        }}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor={'image-upload'} style={{ width: 'max-content' }}>
        {!previewUrl && (
          <div className={dropZoneClasses}>
            <div className="flex flex-col items-center justify-center text-center ">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-neutral-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>

              <p className="text-neutral-600 text-sm md:text-base mb-1">
                Нажмите или перетащите файл
              </p>
              <p className="text-neutral-400 text-xs md:text-sm">
                PNG, JPG до 1MB
              </p>
            </div>
          </div>
        )}
        {previewUrl && (
          <div
            style={{ width: 'max-content', height: 'max-content' }}
            className="group p-1 border-dashed border cursor-pointer relative"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
                // setPreviewUrl(null);
              }}
              type="button"
              className=" z-10 absolute top-2 right-2 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/10 hover:bg-red-500 hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/20 shadow-lg"
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
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="w-80 h-45 max-[450px]:w-60 max-[350px]:w-50 relative">
              <Image
                src={previewUrl}
                alt="photo"
                // width={320}
                // height={180}
                fill
                objectFit="cover"
              ></Image>
            </div>
          </div>
        )}
      </label>
    </>
  );
}
