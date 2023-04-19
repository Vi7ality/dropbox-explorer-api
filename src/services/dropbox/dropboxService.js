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
    return response.result.fileBlob;
  } catch (error) {
    Notify.failure(error.message);
  }
};
