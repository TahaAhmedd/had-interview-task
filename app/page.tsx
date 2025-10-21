import { findFolder } from '@/lib/data';
import { CreateFolderButton } from '@/components/CreateFolderButton';
import { FolderList } from '@/components/FolderList';
import { CreateFileButton } from '@/components/CreateFileButton';

export default function Home() {
  const folder = findFolder('root');
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{folder?.name}</h1>
        <div className='flex gap-2'>
          <CreateFolderButton parentId='root' />
          <CreateFileButton parentId='root' />
        </div>
      </div>
      {folder && <FolderList nodes={folder.children} />}
    </div>
  );
}
