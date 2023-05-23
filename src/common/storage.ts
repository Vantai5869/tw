import AsyncStorage from "@react-native-async-storage/async-storage";

export type SaveTokenInput = {
  accessToken: string;
  refreshToken: string;
};
export type SaveLanguage = {
  language: string;
};

export const saveToken = async (data: SaveTokenInput) => {
  return Promise.all([
    AsyncStorage.setItem("accessToken", data.accessToken),
    AsyncStorage.setItem("refreshToken", data.refreshToken),
  ]);
};

export const removeToken = async () => {
  return Promise.all([
    AsyncStorage.removeItem("accessToken"),
    AsyncStorage.removeItem("refreshToken"),
  ]);
};

export const saveLanguage = async (data: SaveLanguage) => {
  return Promise.all([AsyncStorage.setItem("language", data.language)]);
};
export const persistedStorage = {
  getItem: async (key: any) => {
    const data = await AsyncStorage.getItem(key);
    return data;
  },
  setItem(key: any, value: any) {
    try {
      return AsyncStorage.getItem(key, value);
    } catch (err) {
      throw err;
    }
  },
  removeItem(key: any) {
    return AsyncStorage.removeItem(key);
  },
};
