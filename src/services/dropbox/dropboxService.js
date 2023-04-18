import { Dropbox } from 'dropbox';
import { Notify } from 'notiflix';

const REDIRECT_URI = 'http://localhost:3000/dropbox-explorer-api';

const dbx = new Dropbox({ accessToken: localStorage.getItem('dropboxToken') });

export const finishAuth = async () => {
  try {
    const accessToken = await dbx.auth.getAccessTokenFromUrl(REDIRECT_URI);
    dbx.setAccessToken(accessToken);
    return true;
  } catch (err) {
    console.error('Error finishing Dropbox authentication:', err);
    return false;
  }
};

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
