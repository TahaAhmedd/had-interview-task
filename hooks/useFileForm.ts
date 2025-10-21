import {useRouter} from "next/navigation";
import React, {useState} from "react";

interface IFileForm {
  name: string;
  file: File | null;
}

function useFileForm(parentId: string) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formState, setFormState] = useState<IFormState>({
    isLoading: false,
    error: null,
  });
  const [formValues, setFormValues] = useState<IFileForm>({
    name: "",
    file: null,
  });
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.file) return;

    setFormState({isLoading: true, error: null});
    try {
      const fd = new FormData();
      if (!formValues.name) {
        fd.append("name", formValues.name || formValues.file.name);
      }
      fd.append("file", formValues.file);

      const res = await fetch(`/api/files/${parentId}`, {
        method: "POST",
        body: fd,
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error((await res.json()).error || "Failed to create file");
      }
      setFormState({isLoading: false, error: null});

      router.refresh();
      setIsDialogOpen(false);
      setFormValues({
        name: "",
        file: null,
      });
    } catch (error: Error | any) {
      setFormState({isLoading: false, error: (error.message as string) || "Unknown error"});
    }
  };
  return {formValues, setFormValues, onSubmit, formState, isDialogOpen, setIsDialogOpen};
}

export default useFileForm;
