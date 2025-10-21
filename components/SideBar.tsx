"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

function SideBar() {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path;
  };

  return (
    <aside className='w-full space-y-8 md:w-64  bg-main text-white p-4 md:p-6 shadow-lg'>
      <h1 className='text-2xl font-bold flex items-center gap-2'>
        <span>📂</span>
        <span>File Explorer</span>
      </h1>
      <nav className='flex md:flex-col gap-2'>
        <Link
          href='/'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
            isActive("/") ? "bg-white/10" : ""
          }`}
        >
          <span className='text-xl'>📁</span>
          <span className='font-medium'>My Files</span>
        </Link>
        <Link
          href='/recent'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
            isActive("/recent") ? "bg-white/10" : ""
          }`}
        >
          <span className='text-xl'>🕒</span>
          <span className='font-medium'>Recent</span>
        </Link>
      </nav>
    </aside>
  );
}

export default SideBar;
