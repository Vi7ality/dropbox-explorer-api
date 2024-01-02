import { FileList } from 'components/FileList/FileList';
import { Container } from 'reusableComponents/Container/Container.styled';
import Loader from 'reusableComponents/Loader/Loader.styled';
import {
  PathInfo,
  PathWrap,
} from './Content.styled';

export const Content = ({
  currentPath,
  files,
  handleFolderClick,
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
            handleFolderClick={handleFolderClick}
            handleDeleteBtnClick={handleDeleteBtnClick}
          ></FileList>
        )}
      </Container>
    </main>
  );
};
