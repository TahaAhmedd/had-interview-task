"use client";
import useFolderForm from "@/hooks/useFolderForm";
import {closeDialog, openDialog} from "@/lib/dialog";

export function CreateFolderButton({parentId}: {parentId: string}) {
  const {name, setName, onSubmit, dialogId, formState} = useFolderForm(parentId);

  return (
    <>
      <button
        onClick={() => openDialog(dialogId)}
        className='border px-2 py-1 rounded bg-green-500 text-white font-semibold'
      >
        + Folder
      </button>

      <dialog id={dialogId} className='rounded-xl space-y-4 max-w-md w-full'>
        <h2 className='text-lg font-bold bg-gray-300 p-4'>Create Folder</h2>
        <form onSubmit={onSubmit} className='space-y-2 px-4 pb-4'>
          <label htmlFor='folder-name' className='block'>
            Folder Name
          </label>
          <input
            autoFocus
            name='name'
            className='border p-1 w-full rounded px-2 border-gray-600 '
            value={name}
            onChange={(e) => setName(e.target.value)}
            id='folder-name'
            inputMode='text'
            placeholder='Enter Folder name'
          />

          {formState.error && <p className='text-red-500'>{formState.error}</p>}

          <div className='flex gap-2 justify-end mt-4'>
            <button
              type='submit'
              disabled={formState.isLoading}
              className='border px-2 py-1 rounded bg-green-500 text-white disabled:opacity-50'
            >
              Create
              {formState.isLoading && <span className='loader'></span>}
            </button>
            <button
              type='button'
              onClick={() => closeDialog(dialogId)}
              className='border px-2 py-1 rounded bg-red-500 text-white'
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
