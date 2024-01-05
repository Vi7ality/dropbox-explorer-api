import { FileList } from 'components/FileList/FileList';
import { Container } from 'reusableComponents/Container/Container.styled';
import Loader from 'reusableComponents/Loader';
import {
  PathInfo,
  PathWrap,
} from './Content.styled';
import React from 'react';
import { FileType } from 'components/App.types';

type Proops = {
  currentPath: String,
  files: FileType[],
  handleDeleteBtnClick: (name: string, type: string, path: string) => void,
  isLoading: boolean
  
}

export const Content:React.FC<Proops> = ({
  currentPath,
  files,
  handleDeleteBtnClick,
  isLoading,
}) => {

  return (
    <main>
      <Container>
        <PathWrap>
          <PathInfo>Path: {currentPath ? currentPath : '/'}</PathInfo>
        </PathWrap>
        {isLoading ? (
          <Loader />
        ) : (
          <FileList
            files={files}
            handleDeleteBtnClick={handleDeleteBtnClick}
          ></FileList>
        )}
      </Container>
    </main>
  );
};
