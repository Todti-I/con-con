import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async <T>(key: string): Promise<T | undefined> => {
  const jsonItem = await AsyncStorage.getItem(key);

  if (!jsonItem) return undefined;

  try {
    return JSON.parse(jsonItem) as T;
  } catch {
    return undefined;
  }
};

const setItem = async <T>(key: string, item: T): Promise<void> => {
  const jsonItem = JSON.stringify(item);
  await AsyncStorage.setItem(key, jsonItem);
};

export default {
  getItem,
  setItem,
};
