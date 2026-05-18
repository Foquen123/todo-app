'use client';
import Spinner from '@/components/common/Spinner/Spinner';

export default function LoadingPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Spinner></Spinner>
    </div>
  );
}
