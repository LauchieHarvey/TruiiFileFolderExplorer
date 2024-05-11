import { useState } from "react";
import { selectCurrentFolder } from "../state/folderSlice";
import { useSelector } from "react-redux";
import { useAddFolderMutation } from "../state/api";

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
      const a = await addFolder({parentId: currentFolder, name: folderName});
      if (a.error)
        console.error(a.error);
    } catch (error) {
      console.error("Failed when requesting to create folder", error);
    }
  }

  return (
    <div>
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".geojson, .csv">
      </input>
      <form onSubmit={handleCreateFolder}>
        <button type="submit" disabled={folderName == ""}>Create Folder</button>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}>
        </input>
      </form>
    </div>
  )
}

export default ActionHeader;