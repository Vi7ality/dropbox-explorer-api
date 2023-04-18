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
        makeAuth();
        return;
      } else {
        setAndSaveToken(accessToken);
      }
    }
    await dbx.auth.setAccessToken(localToken);
  } catch (err) {
    Notify.failure(err.message);
  }
};

const getTokenFromURLParams = () => {
  const params = new URLSearchParams(window.location.hash.substr(1));
  return params.get('access_token');
};

const makeAuth = async () => {
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

// const isAuthorized = async () => {
//   try {
//     const accountInfo = await dbx.usersGetCurrentAccount();
//     return !!accountInfo;
//   } catch (err) {
//     if (err.status === 401) {
//       const authUrl = dbx.auth.getAuthenticationUrl(REDIRECT_URI);
//       window.location.href = authUrl;
//     } else {
//       console.error('Error checking Dropbox authorization:', err);
//     }
//     return false;
//   }
// };

// export const checkAuthorization = async () => {
//   const authorized = await isAuthorized();
//   if (!authorized) {
//     const authUrl = await dbx.auth.getAuthenticationUrl(REDIRECT_URI);
//     window.location.href = authUrl;
//   }
//   const token = await dbx.auth.getAccessTokenFromCode(REDIRECT_URI);
//   console.log(`token:`, token);
// };

// export const checkAuthorization = async () => {
//   const authorized = await isAuthorized();
//   if (!authorized) {
//     const accessToken = await dbx.auth.getAccessTokenFromUrl(REDIRECT_URI);
//     if (accessToken) {
//       localStorage.setItem('dropboxAccessToken', accessToken);
//       dbx.setAccessToken(accessToken);
//       return true;
//     } else {
//       const authUrl = dbx.auth.getAuthenticationUrl(REDIRECT_URI);
//       window.location.href = authUrl;
//     }
//   } else {
//     return true;
//   }
// };

// export const checkAuthorization = async () => {
//   const token = dbx.auth.getAccessToken();
//   console.log(token);
//   if (!token) {
//     const authUrl = await dbx.auth.getAuthenticationUrl(REDIRECT_URI);
//     window.location.href = authUrl;
//     dbx.auth.setAccessToken(await dbx.auth.getAccessToken());
//   } else {
//   }
// };
