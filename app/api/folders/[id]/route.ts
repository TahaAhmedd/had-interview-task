import {NextResponse} from "next/server";
import {findFolder, FolderNode} from "@/lib/data";
import {revalidatePath} from "next/cache";
import {addToRecentFiles} from "@/lib/recent";

export async function GET(_req: Request, {params}: {params: {id: string}}) {
  const folder = findFolder(params.id);
  if (!folder) {
    return NextResponse.json({error: "Folder not found"}, {status: 404});
  }
  return NextResponse.json(folder);
}

export async function POST(req: Request, {params}: {params: {id: string}}) {
  const {name} = await req.json();
  const parent = findFolder(params.id);
  if (!parent || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({error: "Invalid request"}, {status: 400});
  }

  const newFolder = {
    id: Date.now().toString(),
    name: name.trim(),
    type: "folder",
    children: [],
    parentId: parent.id,
  };

  parent.children.push(newFolder as FolderNode);

  addToRecentFiles(newFolder as FolderNode);

  revalidatePath("/");
  revalidatePath(`/folder/${params.id}`);
  revalidatePath(`/recent`);

  return NextResponse.json({success: true});
}
