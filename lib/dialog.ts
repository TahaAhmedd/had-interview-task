export const closeDialog = (id: string) => {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  dialog?.close();
};

export const openDialog = (id: string) => {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  dialog?.showModal();
};

export const isDialogOpen = (id: string) => {
  const dialog = document.getElementById(id) as HTMLDialogElement;
  return dialog?.open || false;
};
