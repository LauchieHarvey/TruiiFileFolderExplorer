import { useState } from "react";
import { selectCurrentFolder } from "../state/folderSlice";
import { useSelector } from "react-redux";
import { useAddFolderMutation } from "../state/api";
import { ClosedFolderIcon } from "./Icons";

const ActionHeader = () => {
  const currentFolder = useSelector(selectCurrentFolder);
  const [folderName, setFolderName] = useState("");
  const [addFolder] = useAddFolderMutation();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length !== 1)
      return;
    console.log("uploading file...", e.target.files[0]);
  }

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName == "")
      return;
    try {
      const a = await addFolder({parentId: currentFolder.id, name: folderName});
      if (a.error)
        console.error(a.error);
      else
        setFolderName("");
    } catch (error) {
      console.error("Failed when requesting to create folder", error);
    }
  }

  return (
    <div className="flex flex-row">
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".geojson, .csv">
      </input>
      <form onSubmit={handleCreateFolder} className="flex flex-row gap-2">
        <button
          type="submit"
          disabled={folderName == ""}
          className="p-1 bg-slate-300 hover:enabled:bg-slate-400 rounded-md disabled:opacity-70">
          <div className="flex flex-row align-middle gap-2"><ClosedFolderIcon/>Create Folder</div>
        </button>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="border-2 rounded-md"
          placeholder="Folder A">
        </input>
      </form>
    </div>
  )
}

export default ActionHeader;