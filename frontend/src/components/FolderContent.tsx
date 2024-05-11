import { useSelector } from "react-redux";
import { useGetFoldersQuery } from "../state/api";
import { selectCurrentFolder } from "../state/folderSlice";

const FolderContent = () => {
  const currentFolder = useSelector(selectCurrentFolder);
  console.log(`Current folder content id: ${currentFolder}`);
  const {data, isFetching, isError} = useGetFoldersQuery(currentFolder);

  if (isError || data == undefined) {
    return <p>Failed to load folder content.</p>;
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Folder Content</h3>
      {data.map((child) => (
        <ListItem key={child.name} name={child.name} type={child.type}/>
      ))}
    </div>
  )
}

interface ListItemProps {
  name: string;
  type: 'folder' | 'file';
}

/**
 * Either a folder or a file.
 */
const ListItem = ({name, type}: ListItemProps) => {
  return (
    <li>{`${type.toUpperCase()}: ${name}`}</li>
  );
}

export default FolderContent;