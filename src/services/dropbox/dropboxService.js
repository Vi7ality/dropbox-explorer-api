import { Dropbox } from 'dropbox';
import { Notify } from 'notiflix';

const DB_TOKEN =
  'sl.Bcm-EPzlYXdBhRywUUAaplL0JIT_u_4u7cSGMerJOZ6QJEUcaiGxHf8pqiwPaNN8ZSZcJDlQiTDJswqMmWtzNlf6R-sTSN2UQ0AcPoSyPI1rYmW2-pUjgFSVHoNXjNn9-7NpnayK';

const dbx = new Dropbox({
  accessToken: DB_TOKEN,
});

export const auth = async () => {
  try {
    await dbx.usersGetCurrentAccount();
    return true;
  } catch (err) {
    if (err.status === 401) {
      try {
        const authUrl = await dbx.getAuthenticationUrl(
          'http://localhost:3000/dropbox-browser_test-task'
        );
        window.location.href = authUrl;
      } catch (err) {
        console.error('Error authenticating with Dropbox:', err);
      }
    } else {
      console.error('Error getting Dropbox account information:', err);
    }
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
