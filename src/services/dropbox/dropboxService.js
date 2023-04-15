import { Dropbox } from 'dropbox';
import { Notify } from 'notiflix';

const DB_TOKEN =
  'sl.Bcg_9FhOAKKxoDL71vg0Ksz_CeRbnGjVp1YiWXPSp5vX8ZTEyUfidjxz_TujxqhI5WRR8mfqdRkwEflfmvixsNxB_Umag1EgNA9FEg5PnmIWufUt4RFN7faS-2nAPS-ruWl08XQ';

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
