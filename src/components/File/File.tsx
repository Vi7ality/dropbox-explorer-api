import { AiFillFile } from 'react-icons/ai';
import {  StyledFileLink } from './File.styled';
import React, { useEffect, useState } from 'react';
import { getFile } from 'services/dropbox/dropboxService';

type Proops = {
  name: string, 
  thumbnail?: string,
  path: string
}

export const File: React.FC<Proops> = ({ name, thumbnail, path }) => {
    const [link, setLink] = useState('')
    useEffect(() => {
        const init = async () => {
        const fileContent = await getFile(path);
        const blobLink = URL.createObjectURL(fileContent);
        setLink(blobLink);
        }
        init();
    }, [path])
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
