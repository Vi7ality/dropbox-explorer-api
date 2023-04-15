import { AiFillFile } from "react-icons/ai"
import { StyledFileBtn } from "./File.styled"

export const File = ({name, thumbnail, path, handleFileClick}) => {
    return (
        <StyledFileBtn onClick={()=>handleFileClick(path)}>
            {thumbnail ? <img
                          alt="file.name"
                          src={`data:image/jpeg;base64, ${thumbnail}`}
            ></img> : <AiFillFile />}
            <p>{name}</p>
        </StyledFileBtn>
    )
}