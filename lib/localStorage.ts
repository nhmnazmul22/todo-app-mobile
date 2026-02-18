import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (keyName: string) => {
  const value = await AsyncStorage.getItem(keyName);
  if (!value) {
    return null;
  }
  return value;
};

export const storeData = async (keyName: string, value: string) => {
  try {
    await AsyncStorage.setItem(keyName, value);
    return true;
  } catch {
    return false;
  }
};
