import {FolderList} from "@/components/FolderList";
import {recentFiles} from "@/lib/recent";

export default function RecentPage() {
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Recent Files</h2>
      <FolderList nodes={recentFiles} />
    </div>
  );
}
