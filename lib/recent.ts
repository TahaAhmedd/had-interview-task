import {FolderNode} from "./data";

export const recentFiles: FolderNode["children"] = [];

export function addToRecentFiles(file: FolderNode["children"][0]) {
  const index = recentFiles.findIndex((f) => f.id === file.id);

  if (index !== -1) recentFiles.unshift(file);

  if (recentFiles.length > 10) {
    recentFiles.pop();
  }

  recentFiles.push(file);
}
