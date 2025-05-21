import DeviceInfo from 'react-native-device-info';

export const getDeviceId = async () => {
  const id = await DeviceInfo.getUniqueId();
  console.log("id :",id)
  return id;
};
