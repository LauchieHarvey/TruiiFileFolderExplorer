import { useDispatch, useSelector } from "react-redux";
import { useGetFoldersQuery } from "../state/api";
import { folderActions, selectCurrentFolder, selectCurrentFolderPath } from "../state/folderSlice";
import { ClosedFolderIcon, FileIcon } from "./Icons";

const FolderContent = () => {
  const currentFolder = useSelector(selectCurrentFolder);
  const {data, isFetching, isError} = useGetFoldersQuery(currentFolder.id);

  if (isError || data == undefined) {
    return <p>Failed to load folder content.</p>;
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-between">
      <div>
        <h3 className="text-xl">Folder Content</h3>
        <BreadCrumb/>
        <ul>
          {data.map((child) => (
            <ListItem
              key={child.name}
              id={child.id}
              name={child.name}
              type={child.type}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

const BreadCrumb = () => {
  const folderPath = useSelector(selectCurrentFolderPath);
  const dispatch = useDispatch();

  // Handle navigating back to a parent folder.
  const handleClickFolder = (index: number) => {
    dispatch(folderActions.setCurrentFolder(folderPath.slice(0, index + 1)));
  }

  return (
    <div className="flex flex-row">
      {folderPath.map((folder, i) => (
        <p className="text-lg">
          /
          <span
            className="underline hover:cursor-pointer"
            onClick={() => handleClickFolder(i)}>
            {folder.name}
          </span>
        </p>
      ))}
    </div>
  );
}

interface ListItemProps {
  id: number;
  name: string;
  type: 'folder' | 'file';
}

/**
 * Either a folder or a file.
 */
const ListItem = ({id, name, type}: ListItemProps) => {
  const dispatch = useDispatch();
  const currentFolderPath = useSelector(selectCurrentFolderPath);

  const handleFolderClick = () => {
    // Since ListItem is only open when its immediate parent is the selected folder,
    // we can simply append this folder to the path.
    dispatch(folderActions.setCurrentFolder([...currentFolderPath, {id, name}]));
  }

  const handleFileClick = () => {
    dispatch(folderActions.setCurrentFile(id));
  }

  const Icon = type === 'file' ? FileIcon : ClosedFolderIcon;
  const handleClick = type === 'folder' ? handleFolderClick : handleFileClick;

  return (
    <li>
      <div
        className="flex flex-row gap-2 hover:cursor-pointer"
        onClick={handleClick}>
        <Icon/>
        <p>{name}</p>
      </div>
    </li>
  );
}

export default FolderContent;