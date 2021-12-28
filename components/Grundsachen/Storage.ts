import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const getItem = async (key: string): Promise<any> => {
  return await AsyncStorage.getItem(key);
};

export { setItem, getItem };
