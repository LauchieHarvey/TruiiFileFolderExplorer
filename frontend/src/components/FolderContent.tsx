import { useGetFoldersQuery } from "../state/api";

const FolderContent = () => {
  const {data, isFetching, isError} = useGetFoldersQuery(1);
  if (isError || data == undefined) {
    return <p>Failed to load folder content.</p>;
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Folder Content</p>
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