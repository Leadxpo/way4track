import AsyncStorage from "@react-native-async-storage/async-storage";

export const getPermissions = async (roleName) => {
    const permissions = JSON.parse(
      await AsyncStorage('userPermissions') || '[]'
    );
  
    const rolePermissions = permissions?.find((perm) => perm.name === roleName);
  
    if (rolePermissions) {
      return {
        add: rolePermissions.add || false,
        edit: rolePermissions.edit || false,
        view: rolePermissions.view || false,
        delete: rolePermissions.delete || false,
      };
    }
  
    return { add: false, edit: false, view: false, delete: false }; // Default if role not found
  };
  