import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeData from 'con-con/types/recipe-data';

type StorageData = {
  'wizard-data': unknown;
  'favorite-recipes': RecipeData[];
};

const getItem = async <T extends keyof StorageData>(
  key: T
): Promise<StorageData[T] | undefined> => {
  const jsonItem = await AsyncStorage.getItem(key);

  if (!jsonItem) return undefined;

  try {
    return JSON.parse(jsonItem) as StorageData[T];
  } catch {
    return undefined;
  }
};

const setItem = async <T extends keyof StorageData>(
  key: T,
  item: StorageData[T]
): Promise<void> => {
  const jsonItem = JSON.stringify(item);
  await AsyncStorage.setItem(key, jsonItem);
};

const removeItem = async (key: keyof StorageData): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

export default {
  getItem,
  setItem,
  removeItem,
};
