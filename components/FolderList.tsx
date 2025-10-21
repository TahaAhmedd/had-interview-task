import type {FolderNode, FileNode} from "@/lib/data";
import FolderItem from "./FolderItem";
import {FileItem} from "./FileItem";

export function FolderList({nodes}: {nodes: Array<FolderNode | FileNode>}) {
  if (!nodes.length) {
    return (
      <div className='text-center py-12 text-gray-500'>
        <span className='text-6xl mb-4'>📁</span>
        <p>This folder is empty</p>
        <p className='text-sm'>Create a new folder or upload a file to get started</p>
      </div>
    );
  }

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-4'>
      {nodes.map((node) => {
        if (node.type === "folder") {
          return <FolderItem node={node} key={node.id} />;
        }
        return <FileItem file={node} key={node.id} />;
      })}
    </ul>
  );
}
