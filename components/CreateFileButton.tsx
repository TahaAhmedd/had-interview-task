"use client";
import useFileForm from "@/hooks/useFileForm";

export function CreateFileButton({parentId}: {parentId: string}) {
  const {formValues, setFormValues, onSubmit, isDialogOpen, setIsDialogOpen, formState} =
    useFileForm(parentId);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className='border px-2 py-1 rounded bg-main text-white font-semibold'
      >
        + File
      </button>

      {isDialogOpen && (
        <div
          id={"create-file"}
          className='fixed inset-0 bg-black/80 z-50 w-full h-full flex items-center justify-center p-4 rounded-xl '
        >
          <div className='flex flex-col  overflow-hidden rounded-xl gap-4 bg-white max-w-md w-full'>
            <h2 className='text-lg font-bold bg-gray-300 p-4'>Create File</h2>
            <form onSubmit={onSubmit} className='space-y-2 px-4 pb-4'>
              <label className='block text-sm font-medium'>Select File</label>
              <input
                type='file'
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFormValues((prev) => ({
                    ...prev,
                    file: selectedFile,
                  }));
                }}
                className='border p-2 w-full rounded'
                required
              />

              <label htmlFor='file-name' className='block'>
                File Name (optional)
              </label>
              <input
                autoFocus
                name='name'
                className='border p-1 w-full rounded px-2 border-gray-600 '
                value={formValues.name || ""}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                id='file-name'
                inputMode='text'
                placeholder='Enter File name'
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
                  onClick={() => setIsDialogOpen(false)}
                  className='border px-2 py-1 rounded bg-red-500 text-white'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
