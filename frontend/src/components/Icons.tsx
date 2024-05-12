import ClosedFolder from '../assets/closed_folder.svg';
import OpenFolder from '../assets/open_folder.svg';
import File from '../assets/file.svg';


export const ClosedFolderIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img src={ClosedFolder} {...props}/>;
}

export const OpenFolderIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img src={OpenFolder} {...props}/>;
}

export const FileIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img src={File} {...props}/>;
}
