import { useCallback, useEffect, useState } from 'react';
import {
  getFiles,
  getThumbnails,
  deleteFile,
} from 'services/dropbox/dropboxService';
import Content from '../pages/ContentPage';
import { Notify, Confirm } from 'notiflix';
import { checkAuthorization } from 'services/dropbox/dbxAuth';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SharedLayout from './SharedLayout';
import NotFoundPage from 'pages/NotFound/';
import { AuthPage } from 'pages/AuthPage/AuthPage';

export const App = () => {
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location
  const encodedPath = pathname === '/' ? '' : pathname;
  const currentPath = decodeURIComponent(encodedPath.replace(/\+/g, ' '));
  const backLinkHref = location.state?.from ?? '/';

  const getPaths = files => {
    return files
      .filter(file => file['.tag'] === 'file')
      .map(file => ({
        path: file.path_lower,
        size: 'w32h32',
      }));
  };

   const onGoBack = () => {  navigate(backLinkHref)};

  const onMainBtnClick = () => {
    isAuthorised && navigate('')
  }

  const notifyDeleteMessage = type => {
    let message;
    switch (type) {
      case 'file':
        message = `Do you want to delete this file?`;
        break;

      case 'folder':
        message = `Do you want to delete this folder and whole file in it?`;
        break;
      default:
        break;
    }
    return message;
  };

  const updateStateFiles = async () => {
    const data = await getFiles(currentPath);
    const files = data.result.entries;
    if (files.length === 0) {
      setFiles(null);
      return;
    }
    setFiles(files);
    return files;
  };

  const handleDeleteBtnClick = async (name, type, path) => {
    const message = notifyDeleteMessage(type);
    Confirm.show(
      message,
      `${name}`,
      'Yes',
      'No',
      async () => {
        await deleteFile(path);
        const files = await updateStateFiles();
        await setThumbnails(files);
      },
      {}
    );
  };

      const setThumbnails = useCallback(async files => {
      const paths = getPaths(files);
      const res = await getThumbnails(paths);
      const thumbnailsArr = res.result.entries;

      if (thumbnailsArr.length === 0) {
        return;
      }

      const stateFiles = files;
      const newStateFiles = [...stateFiles];

      thumbnailsArr.forEach(file => {
        if (file['.tag'] === 'failure') {
          return
        }
        let indexToUpdate = stateFiles.findIndex(
          stateFile => file.metadata.path_lower === stateFile.path_lower
        );
        newStateFiles[indexToUpdate].thumbnail = file.thumbnail;
        setFiles(newStateFiles);
      });
      }, []) 
  
      const init = useCallback(async () => {
      setIsLoading(true);
      try {
        const data = await getFiles(currentPath);
        const files = data.result.entries;
        if (files.length === 0) {
          setFiles(null);
          setIsLoading(false);
          return;
        }
        setFiles(files);
        setThumbnails(files);
        setIsLoading(false);
      } catch (error) {
        Notify.failure(error.message);
        setIsLoading(false);
        navigate('notfound');
      }
    },[currentPath, navigate, setThumbnails]) 

  useEffect(() => {
    checkAuthorization().then(result => {
      setIsAuthorised(result);
      result ? init() : navigate('/auth')
    }
    );
  }, [currentPath, navigate, init]);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <SharedLayout
            onMainBtnClick={onMainBtnClick}
            onGoBack={onGoBack}
            currentPath={currentPath}
            end
          />
        }
      >
        <Route
          path='*'
          element={
            <Content
              currentPath={currentPath}
              files={files}
              handleDeleteBtnClick={handleDeleteBtnClick}
              isLoading={isLoading}
            />
          } 
        ></Route>
        <Route path='auth'  element={<AuthPage/>}></Route>
        <Route path='notfound' element={<NotFoundPage/>}></Route>
      </Route>
    </Routes>
  );
};
