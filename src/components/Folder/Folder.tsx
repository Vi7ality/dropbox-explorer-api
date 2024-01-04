import { AiFillFolder } from "react-icons/ai";
import {  StyledFolderLink } from "./Folder.styled";
import {  useLocation } from "react-router-dom";
import React from "react";

type Proops = {
  name: string,
  path: string
}

export const Folder: React.FC<Proops> = ({ name, path }) => {
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