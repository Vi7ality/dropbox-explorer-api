import { FileList } from 'components/FileList/FileList';
import { Container } from 'reusableComponents/Container/Container.styled';
import Loader from 'reusableComponents/Loader/Loader.styled';
import { AuthMessage, AuthMsgWrap, PathWrap, Title } from './Content.styled';
import { StyledButton } from 'reusableComponents/Button/Button.styled';
import { makeAuth } from 'services/dropbox/dbxAuth';

export const Content = ({
  currentPath,
  files,
  handleFolderClick,
  handleDeleteBtnClick,
  isLoading,
  isAuthorized,
}) => {
  const handleAuthBtnClick = async () => {
    makeAuth();
  };

  return (
    <main>
      <Container>
        <Title>File Explorer</Title>
        {!isAuthorized ? (
          <AuthMsgWrap>
            <AuthMessage>
              Please, provide access to your Dropbox account:
            </AuthMessage>
            <StyledButton
              onClick={() => {
                handleAuthBtnClick();
              }}
            >
              Authorize
            </StyledButton>
          </AuthMsgWrap>
        ) : (
          <>
            <PathWrap>
              <span>Path: {currentPath ? currentPath : '/'}</span>
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
          </>
        )}
      </Container>
    </main>
  );
};
