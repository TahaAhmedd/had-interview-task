"use client";
import {FileNode, getFileType} from "@/lib/data";
import FileViewer from "./FileViewer";
import {closeDialog, openDialog} from "@/lib/dialog";

interface FileItemProps {
  file: FileNode;
}

export const FileViewerDialogId = "file-viewer-dialog";

export function FileItem({file}: FileItemProps) {
  const fileType = getFileType(file.name);

  const getIcon = () => {
    switch (fileType) {
      case "image":
        return "🖼️";
      case "video":
        return "🎬";
      case "audio":
        return "🎵";
      case "pdf":
        return "📕";
      case "document":
        return "📄";
      case "spreadsheet":
        return "📊";
      case "code":
        return "💻";
      default:
        return "📄";
    }
  };

  return (
    <>
      <li className=''>
        <button
          onClick={() => openDialog(FileViewerDialogId)}
          className='w-full h-full text-left border p-4 rounded bg-white hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center gap-3'
        >
          <span className='text-2xl'>{getIcon()}</span>
          <div className='flex-1 min-w-0'>
            <h4 className='font-medium truncate'>{file.name}</h4>
          </div>
        </button>
      </li>

      <dialog id={FileViewerDialogId}>
        <FileViewer file={file} onClose={() => closeDialog(FileViewerDialogId)} />
      </dialog>
    </>
  );
}
