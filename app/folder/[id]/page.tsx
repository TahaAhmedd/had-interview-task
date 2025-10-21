import {findFolder, getPaths} from "@/lib/data";
import {CreateFolderButton} from "@/components/CreateFolderButton";
import {FolderList} from "@/components/FolderList";
import {CreateFileButton} from "@/components/CreateFileButton";
import Breadcrumb from "@/components/Breadcrumb";

interface Props {
  params: {id: string};
}

export default function FolderPage({params}: Props) {
  const folder = findFolder(params.id);
  if (!folder) {
    return <p>Folder not found</p>;
  }

  const paths = getPaths((params.id as string) || null);

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>{folder.name}</h2>

        <div className='flex gap-2'>
          <CreateFolderButton parentId={folder.id} />

          <CreateFileButton parentId={folder.id} />
        </div>
      </div>
      <Breadcrumb paths={paths} />
      <FolderList nodes={folder.children} />
    </div>
  );
}
