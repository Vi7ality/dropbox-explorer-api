import { useCallback, useEffect, useState } from 'react';
import {
  getFiles,
  getThumbnails,
  deleteFile,
} from 'services/dropbox/dropboxService';
import { notifyDeleteMessage } from 'services/notiflix/notifyMsg';
import Content from '../pages/ContentPage';
import { Notify, Confirm } from 'notiflix';
import { checkAuthorization } from 'services/dropbox/dbxAuth';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SharedLayout from './SharedLayout';
import NotFoundPage from 'pages/NotFound/';
import { AuthPage } from 'pages/AuthPage/AuthPage';

interface File  {
  ['.tag']: string,
  id: string,
  name: string,
  path_display: string, 
  path_lower: string
}




export const App = () => {
  const [files, setFiles] = useState<File | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const encodedPath = pathname === '/' ? '' : pathname;
  const currentPath:string = decodeURIComponent(encodedPath.replace(/\+/g, ' '));
  const backLinkHref = location.state?.from ?? '/';

  const getPaths = (files: File[]): { path: string, size: string }[] => {
    return files
      .filter(file => file['.tag'] === 'file')
      .map(file => ({
        path: file['path_lower'],
        size: 'w32h32',
      }));
  };

  const onGoBack = () => {
    navigate(backLinkHref);
  };

  const onMainBtnClick = () => {
    isAuthorised && navigate('');
  };

  const handleDeleteBtnClick = async (name: string, type: string, path: string) => {
    const message = notifyDeleteMessage(type);
    Confirm.show(
      message as string,
      `${name}`,
      'Yes',
      'No',
      async () => {
        await deleteFile(path);
        const files:File[] = await updateStateFiles();
        setThumbnails(files);
      },
      // {}
    );
  };

  const updateStateFiles = async () => {
    const data = await getFiles(currentPath);
    const files:any = data?.result.entries || '';
    if (files?.length === 0) {
      setFiles([]);
      return;
    }
    setFiles(files);
    return files;
  };

  const setThumbnails = useCallback(async (files: any) => {
    const paths = getPaths(files);
    const res = await getThumbnails(paths);
    const thumbnailsArr = res?.result.entries;

    if (thumbnailsArr?.length === 0) {
      return;
    }

    const stateFiles:[] = files;
    const newStateFiles:any = [...stateFiles];

    thumbnailsArr?.forEach((file: any) => {
      if (file['.tag'] === 'failure') {
        return;
      }
      let indexToUpdate = stateFiles.findIndex(
        (stateFile:File) => file.metadata.path_lower === stateFile.path_lower
      );
      if (indexToUpdate !== -1) {
        newStateFiles[indexToUpdate].thumbnail = file.thumbnail;
      }
      
      setFiles(newStateFiles);
    });
  }, []);

  const init = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFiles(currentPath);
      const files: any = data?.result.entries;
      console.log(files);
      if (files?.length === 0) {
        setFiles([]);
        setIsLoading(false);
        return;
      }
      
      setFiles(files);
      setThumbnails(files);
      setIsLoading(false);
    } catch (error:any) {
      Notify.failure(error.message);
      setIsLoading(false);
      navigate('notfound');
    }
  }, [currentPath, navigate, setThumbnails]);

  useEffect(() => {
    checkAuthorization().then((result:any) => {
      setIsAuthorised(result);
      result ? init() : navigate('/auth');
    });
  }, [currentPath, navigate, init]);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <SharedLayout
            onMainBtnClick={onMainBtnClick}
            onGoBack={onGoBack}
          />
        }
      >
        <Route
          path="*"
          element={
            <Content
              currentPath={currentPath}
              files={files}
              handleDeleteBtnClick={handleDeleteBtnClick}
              isLoading={isLoading}
            />
          }
        ></Route>
        <Route path="auth" element={<AuthPage />}></Route>
        <Route path="notfound" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};
