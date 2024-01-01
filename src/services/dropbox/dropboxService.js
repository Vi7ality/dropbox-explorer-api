import { Dropbox } from 'dropbox';
import { Notify } from 'notiflix';
import { getTokenFromURLParams } from './dbxAuth';

const dbx = new Dropbox({
  accessToken: localStorage.getItem('dropboxToken') || getTokenFromURLParams(),
});

export const getFiles = async (path = '') => {
  try {
    return await dbx.filesListFolder({
      path: path,
    });
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem('dropboxToken');
    }
    Notify.failure(error.message);
  }
};

export const getThumbnails = async paths => {
  try {
    return await dbx.filesGetThumbnailBatch({
      entries: paths,
    });
  } catch (error) {
    Notify.failure(error.message);
  }
};

export const getFile = async filePath => {
  try {
    const response = await dbx.filesDownload({
      path: filePath,
    });
    const blob = response.result.fileBlob;
    return blob;
  } catch (error) {
    Notify.failure(error.message);
  }
};

export const deleteFile = async filePath => {
  try {
    const response = await dbx.filesDelete({
      path: filePath,
    });
    const fileName = response.result.name;
    Notify.success(`${fileName} is successfully deleted`);
  } catch (error) {
    Notify.failure(error.message);
  }
};
