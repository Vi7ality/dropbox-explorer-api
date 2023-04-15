import { useEffect, useState } from 'react';
import { auth, getFiles, getThumbnails } from 'services/dropbox/dropboxService';
import Toolbar from './Toolbar';
import Content from './Content';
import { Notify } from 'notiflix';

export const App = () => {
  const [files, setFiles] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getPaths = files => {
    return files
      .filter(file => file['.tag'] === 'file')
      .map(file => ({
        path: file.path_lower,
        size: 'w32h32',
      }));
  };

  const handleFolderClick = path => {
    setCurrentPath(path);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        await auth();
        const data = await getFiles(currentPath);
        const files = data.result.entries;
        console.log(files);

        if (files.length === 0) {
          setFiles(null);
          setIsLoading(false);
          return;
        }

        updateFiles(files);
        setIsLoading(false);
      } catch (error) {
        Notify.failure(error.message);
        setIsLoading(false);
      }
    };

    const updateFiles = async files => {
      const paths = getPaths(files);
      const res = await getThumbnails(paths);
      const stateFiles = files;
      const newStateFiles = [...stateFiles];

      res.result.entries.forEach(file => {
        let indexToUpdate = stateFiles.findIndex(
          stateFile => file.metadata.path_lower === stateFile.path_lower
        );
        newStateFiles[indexToUpdate].thumbnail = file.thumbnail;
        setFiles(newStateFiles);
      });
    };

    init();
  }, [currentPath]);

  return (
    <div>
      <Toolbar
        setCurrentPath={setCurrentPath}
        currentPath={currentPath}
      ></Toolbar>
      <Content
        currentPath={currentPath}
        files={files}
        handleFolderClick={handleFolderClick}
        isLoading={isLoading}
      ></Content>
    </div>
  );
};
