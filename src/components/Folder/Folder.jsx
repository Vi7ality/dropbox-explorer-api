import { AiFillFolder } from "react-icons/ai";
import {  StyledFolderLink } from "./Folder.styled";
import {  useLocation } from "react-router-dom";

export const Folder = ({ name, path }) => {
  const location = useLocation();
  return (
    <StyledFolderLink
   to={path} state={{from:location}}
    >
      <AiFillFolder />
      <p>{name}</p>
    </StyledFolderLink>
  );
};