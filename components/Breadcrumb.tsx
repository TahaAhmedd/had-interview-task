"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";

interface BreadcrumbProps {
  paths: {id: string; name: string}[];
}

function Breadcrumb({paths}: BreadcrumbProps) {
  const router = useRouter();

  const goBack = () => {
    if (paths.length < 2) {
      router.replace("/");
      return;
    }
    router.replace(`/folder/${paths[paths.length - 2].id}`);
  };

  return (
    <div className='flex items-center gap-4 mb-2'>
      <button
        onClick={goBack}
        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
        title='Go back'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <nav className='flex items-center gap-2 overflow-x-auto'>
        {paths.map((folder, index) => (
          <div key={folder.id} className='flex items-center gap-2'>
            {index > 0 && <span className='text-gray-400'>/</span>}
            {index === paths.length - 1 ? (
              <span className='font-semibold text-gray-900'>{folder.name}</span>
            ) : (
              <Link
                href={folder.id === "root" ? "/" : `/folder/${folder.id}`}
                className='text-blue-600 hover:text-blue-800 hover:underline'
              >
                {folder.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Breadcrumb;
