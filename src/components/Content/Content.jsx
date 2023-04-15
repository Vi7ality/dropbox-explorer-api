import { File } from 'components/File/File';
import { Folder } from 'components/Folder/Folder';
import { Container } from 'reusableComponents/Container/Container.styled';
import Loader from 'reusableComponents/Loader/Loader.styled';
import { getFile } from 'services/dropbox/dropboxService';
import { ContentItem, ContentList, PathWrap, Title } from './Content.styled';

export const Content = ({
  currentPath,
  files,
  handleFolderClick,
  isLoading,
}) => {
  const handleFileClick = async path => {
    const fileContent = await getFile(path);
    console.log(fileContent);
    const fileUrl = URL.createObjectURL(fileContent);
    window.open(fileUrl, '_blank');
  };
  return (
    <main>
      <Container>
        <Title>File Explorer</Title>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <PathWrap>
              <span>Path: {currentPath ? currentPath : '/'}</span>
            </PathWrap>
            <ContentList>
              {!files ? (
                <p>This folder is empty</p>
              ) : (
                files.map(file => {
                  const type = file['.tag'];
                  return (
                    <ContentItem
                      key={file.id}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {type === 'file' && (
                        <File
                          name={file.name}
                          thumbnail={file.thumbnail}
                          path={file.path_lower}
                          handleFileClick={handleFileClick}
                        ></File>
                      )}
                      {type === 'folder' && (
                        <Folder
                          handleFolderClick={handleFolderClick}
                          name={file.name}
                          path={file.path_lower}
                        ></Folder>
                      )}
                    </ContentItem>
                  );
                })
              )}
            </ContentList>
          </>
        )}
      </Container>
    </main>
  );
};
