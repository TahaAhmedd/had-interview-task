"use client";
import {FileNode, getFileType} from "@/lib/data";

interface FileViewerProps {
  file: FileNode;
  onClose: () => void;
}

export default function FileViewer({file, onClose}: FileViewerProps) {
  const fileType = getFileType(file.name);
  const fileUrl = `/${file.name}`;

  return (
    <div
      className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-auto'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='sticky top-0 bg-white border-b p-4 flex justify-between items-center'>
          <h2 className='text-xl font-bold truncate'>{file.name}</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl leading-none'
          >
            ×
          </button>
        </div>

        <div className='p-4'>
          {fileType === "image" && (
            <img src={fileUrl} alt={file.name} className='max-w-full h-auto mx-auto' />
          )}

          {fileType === "video" && (
            <video controls className='max-w-full h-auto mx-auto' src={fileUrl}>
              Your browser does not support the video tag.
            </video>
          )}

          {fileType === "audio" && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl'>🎵</div>
              <audio controls className='w-full max-w-md'>
                <source src={fileUrl} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {fileType === "pdf" && (
            <iframe src={fileUrl} className='w-full h-[70vh] border' title={file.name} />
          )}

          {!["image", "video", "audio", "pdf"].includes(fileType) && (
            <div className='text-center py-8'>
              <div className='text-6xl mb-4'>📄</div>
              <p className='text-gray-600 mb-4'>Preview not available for this file type</p>
              <a
                href={fileUrl}
                download={file.name}
                className='inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
