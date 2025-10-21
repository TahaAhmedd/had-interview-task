import {FolderNode} from "@/lib/data";
import Link from "next/link";

function FolderItem({node}: {node: FolderNode}) {
  return (
    <li>
      <Link
        href={`/folder/${node.id}`}
        className='flex items-center gap-3 border p-4 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-300 transition-all'
      >
        <span className='text-3xl'>📁</span>
        <div className='flex-1 min-w-0'>
          <h4 className='font-medium truncate max-w-full'>{node.name}</h4>
          <p className='text-xs text-gray-500'>
            {node.children.length} item{node.children.length !== 1 ? "s" : ""}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default FolderItem;
