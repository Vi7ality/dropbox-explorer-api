import { AiFillFile } from 'react-icons/ai';
import {  StyledFileLink } from './File.styled';
import { useEffect, useState } from 'react';
import { getFile } from 'services/dropbox/dropboxService';

export const File = ({ name, thumbnail, path, handleFileClick }) => {
    const [link, setLink] = useState('')
    useEffect(() => {
        const init = async () => {
        const fileContent = await getFile(path);
        const blobLink = URL.createObjectURL(fileContent);
        setLink(blobLink);
        }
        init();
    }, [handleFileClick, path])
  return (
    <StyledFileLink
      href={link}
    download={name}
    >
      {thumbnail ? (
        <img alt="file.name" src={`data:image/jpeg;base64, ${thumbnail}`}></img>
      ) : (
        <AiFillFile />
      )}
      <p>{name}</p>
    </StyledFileLink>
  );
};
