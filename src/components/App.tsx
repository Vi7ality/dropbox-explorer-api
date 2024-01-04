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
import React from 'react';
import { FileType } from './App.types';



export const App: React.FC = () => {
  const [files, setFiles] = useState<FileType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const encodedPath = pathname === '/' ? '' : pathname;
  const currentPath:string = decodeURIComponent(encodedPath.replace(/\+/g, ' '));
  const backLinkHref = location.state?.from ?? '/';

  const getPaths = (files: FileType[]): { path: string, size: string }[] => {
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
        const files: FileType[] = await updateStateFiles();
        setThumbnails(files);
      },
      // {}
    );
  };

  const updateStateFiles = async () => {
    const data = await getFiles(currentPath);
    const files: any= data?.result.entries || '';
    if (files?.length === 0) {
      setFiles([]);
      return;
    }
    setFiles(files);
    return files;
  };

  const setThumbnails = useCallback(async (files: FileType[]) => {
    const paths = getPaths(files);
    const res = await getThumbnails(paths);
    const thumbnailsArr = res?.result.entries;

    if (thumbnailsArr?.length === 0) {
      return;
    }

    const stateFiles:FileType[] = files;
    const newStateFiles: FileType[] = [...stateFiles];

    thumbnailsArr?.forEach((thumb: any) => {
      if (thumb['.tag'] === 'failure') {
        return;
      }
      let indexToUpdate = stateFiles.findIndex(
        (stateFile:FileType) => thumb.metadata.path_lower === stateFile.path_lower
      );
      if (indexToUpdate !== -1) {
        newStateFiles[indexToUpdate].thumbnail = thumb.thumbnail;
      }
      
      setFiles(newStateFiles);
    });
  }, []);

  const init = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFiles(currentPath);
      const files:any = data?.result.entries;
      
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
    checkAuthorization().then((result: boolean | undefined) => {
      if (typeof result === 'boolean') {
        setIsAuthorised(result);
      };
      
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
