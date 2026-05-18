import Header from '@/components/layout/Header/Header';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex overflow-hidden h-screen">
      <Toaster position="top-left" reverseOrder={false} />
      <Sidebar></Sidebar>
      <div className="grow flex flex-col">
        <Header></Header>
        <main className="overflow-auto flex flex-col h-full grow p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
