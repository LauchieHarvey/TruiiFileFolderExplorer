import { useState } from "react";

const FolderTree = () => {
  return (
    <div>
      <p>FOLDER TREE</p>
      <ul>
        <Folder name="root" id={1}/>
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

  const children = id === 1 ? [{id: 5, name: 'folder child', type: 'folder'}, {id: 3, name: 'file child :)', type: 'file'}] : [];// useGetChildrenQuery(id);

  const toggleVisibility = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(!open);
  }

  return (
    <li>
      <p onClick={toggleVisibility}>{name}</p>
      {open && (
        <ul>
          {children.map((child) => {
            if (child.type === 'folder')
              return <Folder name={child.name} id={child.id}/>;
            else return <li>{child.name}</li>
          })}
        </ul>
      )}
    </li>

  );
}

export default FolderTree;