import { Dropbox } from 'dropbox';
import { Notify } from 'notiflix';
import { getTokenFromURLParams } from './dbxAuth';

type AccessTokenType = {
  accessToken: any
}

const accessToken:AccessTokenType = {
  accessToken: localStorage.getItem('dropboxToken') || getTokenFromURLParams(),
}

const dbx = new Dropbox(accessToken);

export const getFiles = async (path = '') => {
  try {
    return await dbx.filesListFolder({
      path: path,
    });
  } catch (error:any) {
    if (error.status === 401) {
      localStorage.removeItem('dropboxToken');
      return;
    }
    Notify.failure(error.message);
  }
};

export const getThumbnails = async (paths:any) => {
  try {
    return await dbx.filesGetThumbnailBatch({
      entries: paths,
    });
  } catch (error:any) {
    Notify.failure(error.message);
  }
};

export const getFile = async (filePath: string) => {
  try {
    const response:any = await dbx.filesDownload({
      path: filePath,
    });
    const blob = response.result.fileBlob;
    return blob;
  } catch (error:any) {
    Notify.failure(error.message);
  }
};

export const deleteFile = async (filePath:string) => {
  try {
    const response = await dbx.filesDelete({
      path: filePath,
    });
    const fileName = response.result.name;
    Notify.success(`${fileName} is successfully deleted`);
  } catch (error:any) {
    Notify.failure(error.message);
  }
};
