import {closeDialog} from "@/lib/dialog";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

function useFolderForm(parentId: string) {
  const [name, setName] = useState("");
  const router = useRouter();
  const [formState, setFormState] = useState<IFormState>({
    isLoading: false,
    error: null,
  });
  const dialogId = "create-folder-dialog";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      setFormState({isLoading: true, error: null});
      const res = await fetch(`/api/folders/${parentId}`, {
        method: "POST",
        cache: "no-store",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: trimmed}),
      });

      if (!res.ok) {
        throw new Error("Failed to create folder");
      }
      setFormState({isLoading: false, error: null});
      router.refresh();
      closeDialog(dialogId);
      setName("");
    } catch (error) {
      setFormState({isLoading: false, error: (error as string) || "Unknown error"});
    }
  };
  return {name, setName, onSubmit, dialogId, formState};
}

export default useFolderForm;
