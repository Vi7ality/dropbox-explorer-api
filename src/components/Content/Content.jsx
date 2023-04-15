import { AiFillFile, AiFillFolder } from 'react-icons/ai';
import { Container } from 'reusableComponents/Container/Container.styled';
import Loader from 'reusableComponents/Loader/Loader.styled';
import { getFile } from 'services/dropbox/dropboxService';

export const Content = ({
  currentPath,
  files,
  handleFolderClick,
  isLoading,
}) => {
      const handleFileClick = async (path) => {
          const fileContent = await getFile(path);
          console.log(fileContent)
    const fileUrl = URL.createObjectURL(fileContent);
    window.open(fileUrl, '_blank');
  };
  return (
    <main>
      <Container>
        <h2>File Explorer</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <span>{currentPath}</span>
            </div>
            <ul>
              {!files ? (
                <p>This folder is empty</p>
              ) : (
                files.map(file => {
                  const type = file['.tag'];
                  return (
                    <li
                      key={file.id}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {type === 'file' && file.thumbnail && (
                              <button onClick={()=>handleFileClick(file.path_lower)}>
                              <img
                          alt="file.name"
                          src={`data:image/jpeg;base64, ${file.thumbnail}`}
                        ></img><p>{file.name}</p></button>
                      )}
                      {type === 'file' && !file.thumbnail && <button onClick={()=>handleFileClick(file.path_lower)}><AiFillFile /><p>{file.name}</p></button>}
                      {type === 'folder' && (      
                          <button
                            onClick={() => {
                              handleFolderClick(file);
                            }}
                                  >
                                      <AiFillFolder />
                            <p>{file.name}</p>
                          </button>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </>
        )}
      </Container>
    </main>
  );
};
