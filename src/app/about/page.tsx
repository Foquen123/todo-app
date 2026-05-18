import { getTasks } from '@/actions/task';
import { AppError } from '@/lib/errors';

export default function AboutPage() {
  const getMany = async (searchTerm: string = '') => {
    const res = await getTasks(searchTerm);
    if (res.code === AppError.unauthorized().code) {
      const { getAllNotes } = await import('@/lib/indexedDB/task');
      const localGetRes = await getAllNotes(searchTerm);
      return localGetRes;
    } else {
      return res;
    }
  };


  return (
    <div>
      <button>test</button>
    </div>
  );
}
