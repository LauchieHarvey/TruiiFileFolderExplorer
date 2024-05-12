import { useState } from "react";
import { useGetFoldersQuery } from "../state/api";
import { ROOT_FOLDER_ID, folderActions } from "../state/folderSlice";
import { useDispatch } from "react-redux";

const FolderTree = () => {
  return (
    <div>
      <h3>Folder Tree</h3>
      <ul>
        <Folder name="root" id={ROOT_FOLDER_ID}/>
      </ul>
    </div>
  )
}


interface FolderProps {
  id: number;
  name: string;
}

const Folder = ({name, id}: FolderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {data, isError, isFetching} = useGetFoldersQuery(id);

  const handleFolderClick = () => {
    setOpen(!open);
    dispatch(folderActions.setCurrentFolder(id));
  }

  const showChildren = open && !isError && !isFetching && data != undefined;
  const canToggleOpen = data !== undefined && data.length > 0;

  let nameDisplay = isError ? `${name} - failed to load!` : name;
  return (
    <li>
      <p
        onClick={handleFolderClick}
        className={`hover:${canToggleOpen ? 'cursor-pointer' : undefined}`}>{nameDisplay}</p>
      {showChildren && (
        <ul className="ml-2">
          {data.filter((child) => child.type === 'folder').map((child) => (
              <Folder name={child.name} id={child.id}/>
          ))}
        </ul>
      )}
    </li>
  );
}

export default FolderTree;