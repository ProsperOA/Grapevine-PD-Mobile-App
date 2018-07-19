import { AsyncStorage } from 'react-native';

const AUTH_TOKEN_NAME = 'grapevinepd_auth_token';

const authTokenService = {
  store: async (token: string): Promise<any> => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_NAME, token);
    }
    catch (error) {
      console.warn(error);
    }
  },
  retrieve: (callback: (token?: string) => void): void => {
    AsyncStorage.getItem(AUTH_TOKEN_NAME, (error, authToken) => {
      if (error) console.warn(error);
      callback(authToken || '');
    });
  },
  remove: (): void => {
    AsyncStorage.removeItem(AUTH_TOKEN_NAME, error => {
      if (error) console.warn(error);
    });
  }
};

export default authTokenService;