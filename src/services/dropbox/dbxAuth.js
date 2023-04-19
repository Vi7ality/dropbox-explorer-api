import { Dropbox } from 'dropbox';
import { Notify } from 'notiflix';
const APP_KEY = 'vq4cbzcxcd6v3uz';
const REDIRECT_URI = 'http://localhost:3000/dropbox-explorer-api';

const dbx = new Dropbox({ clientId: APP_KEY });

export const checkAuthorization = async () => {
  try {
    const localToken = localStorage.getItem('dropboxToken');
    if (!localToken) {
      const accessToken = getTokenFromURLParams();
      if (!accessToken) {
        return false;
      } else {
        setAndSaveToken(accessToken);
        return true;
      }
    }
    await dbx.auth.checkAndRefreshAccessToken(localToken);
    return true;
  } catch (err) {
    Notify.failure(err.message);
  }
};

export const getTokenFromURLParams = () => {
  const params = new URLSearchParams(window.location.hash.substr(1));
  return params.get('access_token');
};

export const makeAuth = async () => {
  try {
    const authUrl = await dbx.auth.getAuthenticationUrl(REDIRECT_URI);
    window.location.href = authUrl;
  } catch (err) {
    Notify.failure(err.message);
  }
};

const setAndSaveToken = async token => {
  try {
    await dbx.auth.setAccessToken(token);
    localStorage.setItem('dropboxToken', token);
  } catch (err) {
    Notify.failure(err.message);
  }
};

export const checkCode = async () => {
  const params = new URLSearchParams(window.location.hash.substr(1));
  const accessToken = params.get('access_token');
  console.log('token:', accessToken);

  if (accessToken) {
    await dbx.auth.setAccessToken(accessToken);
    localStorage.setItem('dropboxToken', accessToken);
  } else {
    console.error('Error getting access token:');
  }
};
