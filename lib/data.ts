export type FileNode = {
  id: string;
  name: string;
  type: "file";
  parentId: string | null;
};

export type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  children: Array<FolderNode | FileNode>;
  parentId: string | null;
};

export const root: FolderNode = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    {
      id: "folder-1",
      name: "Folder 1",
      type: "folder",
      children: [],
      parentId: "root",
    },
    {id: "folder-2", name: "Folder 2", type: "folder", children: [], parentId: "root"},
  ],
  parentId: null,
};

export function findFolder(id: string, current = root): FolderNode | null {
  if (current.id === id) return current;
  for (const child of current.children) {
    if (child.type === "folder") {
      const result = findFolder(id, child);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export const getFileExtension = (name: string) => {
  if (!name) return "";
  return name.split(".").pop()?.toLocaleLowerCase() || "";
};

export const getFileType = (name: string) => {
  if (!name) return "";
  const ext = getFileExtension(name);

  if (["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp", "ico"].includes(ext)) return "image";

  if (["mp3", "wav", "ogg", "flac"].includes(ext)) return "audio";

  if (["mp4", "webm", "ogg", "flv", "mov"].includes(ext)) return "video";

  if (ext === "pdf") return "pdf";

  if (["doc", "docx", "txt", "rtf", "odt"].includes(ext)) return "document";

  if (["xls", "xlsx", "csv", "ods"].includes(ext)) return "spreadsheet";

  if (
    ["js", "ts", "jsx", "tsx", "py", "java", "cpp", "c", "html", "css", "json", "xml"].includes(ext)
  ) {
    return "code";
  }
  return "file";
};

export const getPaths = (folderId: string | null): {id: string; name: string}[] => {
  const paths: {id: string; name: string}[] = [];

  function buildPath(id: string | null) {
    const folder = findFolder(id as string);

    if (!folder) return;

    paths.unshift({id: folder.id, name: folder.name});
    if (folder.parentId) {
      buildPath(folder.parentId);
    }
  }

  buildPath(folderId);
  return paths;
};
