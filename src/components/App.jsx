import { useEffect, useState } from 'react';
import { getFiles, getThumbnails } from 'services/dropbox/dropboxService';
import Toolbar from './Toolbar';
import Content from './Content';
import { Notify } from 'notiflix';
import { checkAuthorization} from 'services/dropbox/dbxAuth';

export const App = () => {
  const [files, setFiles] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
    checkAuthorization().then((result) => setIsAuthorized(result));
  }, []);


  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const data = await getFiles(currentPath);
        const files = data.result.entries;
    
        if (files.length === 0) {
          setFiles(null)
          setIsLoading(false);
          return;
        }

        setFiles(files);
        setThumbnails(files);
        setIsLoading(false);
      } catch (error) {
            if (error.status === 401) {
      console.log('401');
    }
        Notify.failure(error.message);
        setIsLoading(false);
      }
    };

    const setThumbnails = async files => {
      const paths = getPaths(files);
      const res = await getThumbnails(paths);
      const thumbnailsArr = res.result.entries;

      if (thumbnailsArr.length === 0) {
        return;
      }

      const stateFiles = files;
      const newStateFiles = [...stateFiles];

      thumbnailsArr.forEach(file => {
        let indexToUpdate = stateFiles.findIndex(
          stateFile => file.metadata.path_lower === stateFile.path_lower
        );
        newStateFiles[indexToUpdate].thumbnail = file.thumbnail;
        setFiles(newStateFiles);
      });
    };
    
    isAuthorized && init();
    
  }, [currentPath, isAuthorized]);

  return (
    <>
      <Toolbar
        setCurrentPath={setCurrentPath}
        currentPath={currentPath}
      ></Toolbar>
      <Content
        isAuthorized={isAuthorized}
        currentPath={currentPath}
        files={files}
        handleFolderClick={handleFolderClick}
        isLoading={isLoading}
      ></Content>
    </>
  );
};
