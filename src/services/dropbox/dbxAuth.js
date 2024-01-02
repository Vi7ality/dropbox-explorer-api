import { Dropbox } from 'dropbox';
import { Notify } from 'notiflix';
const APP_KEY = 'vq4cbzcxcd6v3uz';

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
    const currentUrl = `${window.location.origin}/dropbox-explorer-api/`;
    const authUrl = await dbx.auth.getAuthenticationUrl(currentUrl);
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
