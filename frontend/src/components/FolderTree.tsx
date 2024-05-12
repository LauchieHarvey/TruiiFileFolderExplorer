import { useState } from "react";
import { useGetFoldersQuery } from "../state/api";
import { ROOT_FOLDER_ID, folderActions } from "../state/folderSlice";
import { useDispatch } from "react-redux";
import { ClosedFolderIcon, OpenFolderIcon } from "./Icons";

const FolderTree = () => {
  return (
    <div>
      <h3 className="text-xl">Folder Tree</h3>
      <ul>
        <Folder path={[{name: 'root', id: ROOT_FOLDER_ID}]}/>
      </ul>
    </div>
  )
}

interface FolderProps {
  path: Array<{name: string, id: number}>
}

const Folder = ({path}: FolderProps) => {
  const id = path[path.length - 1].id;
  const name = path[path.length - 1].name;

  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {data, isError, isFetching} = useGetFoldersQuery(id);

  const handleFolderClick = () => {
    dispatch(folderActions.setCurrentFolder(path));
  }

  const showChildren = open && !isError && !isFetching && data != undefined;

  let nameDisplay = isError ? `${name} - failed to load!` : name;
  return (
    <li>
      <div className="flex flex-row align-middle gap-2 hover:cursor-pointer">
        {open ? <OpenFolderIcon onClick={() => setOpen(false)}/>
          : <ClosedFolderIcon onClick={() => setOpen(true)}/>}
        <p
          onClick={handleFolderClick}>
          {nameDisplay}
        </p>
      </div>

      {showChildren && (
        <ul className="ml-2">
          {data.filter((child) => child.type === 'folder').map((child) => (
              <Folder path={[...path, {name: child.name, id: child.id}]}/>
          ))}
        </ul>
      )}
    </li>
  );
}

export default FolderTree;