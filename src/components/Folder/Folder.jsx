import { AiFillFolder } from "react-icons/ai";
import { StyledFolderBtn } from "./Folder.styled";

export const Folder = ({name, path, handleFolderClick}) => {
  return (
    <StyledFolderBtn
      onClick={() => {
        handleFolderClick(path);
      }}
    >
      <AiFillFolder />
      <p>{name}</p>
    </StyledFolderBtn>
  );
};
