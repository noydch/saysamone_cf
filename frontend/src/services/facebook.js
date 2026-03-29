const FACEBOOK_APP_ID = import.meta.env.VITE_FB_APP_ID || '';

export const initFacebookSdk = () => {
  return new Promise((resolve) => {
    // Wait for the SDK to load
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
      console.log('FB SDK Initialized');
      resolve();
    };

    // Load the SDK script
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
};

export const getLoginStatus = () => {
  return new Promise((resolve) => {
    window.FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};

export const loginFacebook = (scopes = 'public_profile,email,pages_show_list,pages_read_engagement,pages_manage_metadata,pages_messaging') => {
  return new Promise((resolve, reject) => {
    window.FB.login((response) => {
      if (response.authResponse) {
        resolve(response.authResponse);
      } else {
        reject('User cancelled login or did not fully authorize.');
      }
    }, { scope: scopes });
  });
};

export const getPages = () => {
  return new Promise((resolve, reject) => {
    window.FB.api('/me/accounts', (response) => {
      if (response && !response.error) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const logoutFacebook = () => {
  return new Promise((resolve) => {
    window.FB.logout(() => {
        resolve();
    });
  });
}
