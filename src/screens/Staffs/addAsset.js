import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text, Image, TouchableOpacity, StyleSheet, PermissionsAndroid, } from 'react-native';
import { Button, Card, IconButton, TextInput, Modal, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BranchesDropdown from '../../components/branchDropdown';
import { voucherById } from '../../Redux/Actions/vouchersAction';
import { createAssert } from '../../Redux/Actions/assertAction';

const AddAsset = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { loading: voucherInfoLoading, voucherInfo, error: voucherInfoError } = useSelector(state => state.voucherDetails);

  const [companyCode] = useState('WAY4TRACK');
  const [unitCode] = useState('WAY4');
  const [assetPhoto, setAssetPhoto] = useState(null);
  const [assertImage, setAssertImage] = useState(null);
  const [assetType, setAssetType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [voucherId, setVoucherId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [branchName, setBranchName] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const roles = [
    { label: 'Office', value: 'office asset' },
    { label: 'Transport', value: 'transport asset' },
  ];

  const formatDate = date => date.toISOString().split('T')[0];

  const requestPermissions = async () => {
    try {
      const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const storagePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (
        cameraPermission !== PermissionsAndroid.RESULTS.GRANTED ||
        storagePermission !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert('Permissions Required', 'Camera and Storage permissions are required.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = async (fromCamera = false) => {
    try {
      const result = fromCamera
        ? await launchCamera({ mediaType: 'photo' })
        : await launchImageLibrary({ mediaType: 'photo' });

      if (!result.didCancel && result.assets) {
        const selectedImage = result.assets[0];
        setAssetPhoto(selectedImage.uri);

        const imageUpload = new FormData();
        imageUpload.append('assertPhoto', {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });

        setAssertImage(imageUpload);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
    setBottomSheetVisible(false);
  };

  const pickVoucherFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setVoucherId(result[0]?.name || '');
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.error('Error picking voucher file:', error);
      }
    }
  };

  const getVoucherData = () => {
    if (!voucherId) {
      Alert.alert('Error', 'Please enter a Voucher ID.');
      return;
    }
    const payload = { companyCode, unitCode, voucherId };
    dispatch(voucherById(payload));
  };

  const handleSave = () => {
    if (!voucherId || !assetType || !quantity || !branchId || !description || !purchaseDate) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const payload = {
      unitCode,
      companyCode,
      voucherId,
      assetType,
      quantity,
      branchId,
      description,
      purchaseDate,
      assertImage,
    };

    console.log('Payload:', payload);
    dispatch(createAssert(payload)); // Uncomment when the action is ready
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 6 }}>
        <Card style={styles.photoCard}>
          <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
            {assetPhoto ? (
              <Image source={{ uri: assetPhoto }} resizeMode='stretch' style={styles.imagePreview} />
            ) : (
              <>
                <IconButton icon="camera-plus" size={30} />
                <Button mode="text">Add Photo</Button>
              </>
            )}
          </TouchableOpacity>
        </Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignSelf: 'center' }}>

          <TextInput
            placeholder="Voucher Id"
            value={voucherId}
            onChangeText={setVoucherId}
            mode="outlined"
            outlineStyle={{ borderRadius: 5, borderColor: '#aaaaaa' }}
            style={[styles.input, { flex: 5 }]}
            left={
              <TextInput.Icon
                icon={"label-outline"}
                size={24}
                color={"#f3f3f3"}
                style={styles.inputIcon}
              />
            }
          />
          <Button mode="contained" onPress={getVoucherData} buttonColor='#4CAF50' textColor='#f3f3f3' labelStyle={{ fontSize: 15, fontWeight: '700' }} style={[styles.saveButton, { flex: 1, height: 45, marginHorizontal: 5 }]}>
            GET
          </Button>
        </View>
        {
          voucherInfo[0] &&
          <Card style={{ backgroundColor: '#ffffff', marginVertical: 10 }}>
            <Card.Content>
              <Text style={{ fontWeight: '700', fontSize: 15, marginVertical: 8 }}>Assert Name : {voucherInfo[0]?.name}</Text>
              <Text style={{ fontWeight: '700', fontSize: 15, marginVertical: 8 }}>Amount : {voucherInfo[0]?.amount}</Text>
            </Card.Content>
          </Card>
        }

        <DropDownPicker
          open={open}
          value={assetType}
          items={roles}
          setOpen={setOpen}
          setValue={setAssetType}
          placeholder="Select Asset Type"
          style={[styles.input, { alignSelf: 'center' }]}
        />

        <TextInput
          placeholder="Quantity"
          value={quantity}
          outlineStyle={{ borderRadius: 5, borderColor: '#aaaaaa' }}
          onChangeText={setQuantity}
          mode="outlined"
          style={styles.input}
          left={
            <TextInput.Icon
              icon={"numeric"}
              size={24}
              color={"#f3f3f3"}
              style={styles.inputIcon}
            />
          }
        />

        <TextInput
          placeholder="Purchase Date"
          value={purchaseDate}
          outlineStyle={{ borderRadius: 5, borderColor: '#aaaaaa' }}
          mode="outlined"
          style={styles.input}
          onPress={() => setDateOpen(true)}
          left={
            <TextInput.Icon
              icon={"calendar"}
              size={24}
              color={"#f3f3f3"}
              style={styles.inputIcon}
            />
          }
        />

        <DatePicker
          modal
          open={dateOpen}
          date={date}
          mode='date'
          onConfirm={(date) => {
            setDateOpen(false)
            setDate(date)
            const selectedData = formatDate(date)
            setPurchaseDate(selectedData)
          }}
          onCancel={() => {
            setDateOpen(false)
          }}
        />

        <BranchesDropdown dropdownStyles={styles} branchName={setBranchName} onBranchChange={setBranchId} />

        <TextInput
          style={{ marginBottom: 40, padding: 8 }}
          outlineStyle={{ borderRadius: 5, borderColor: '#aaaaaa' }}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}

        />
        <View style={styles.buttons}>
          <Button mode="contained" onPress={handleSave} buttonColor='#4CAF50' textColor='#f3f3f3' style={styles.saveButton}>
            Save
          </Button>
          <Button mode="outlined" onPress={() => { }} style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
      </ScrollView>
      <Portal>
        <Modal visible={isBottomSheetVisible} onDismiss={() => setBottomSheetVisible(false)} contentContainerStyle={styles.bottomSheet}>
          <Button icon="image" mode="text" onPress={() => pickImage(false)}>Gallery</Button>
          <Button icon="camera" mode="text" onPress={() => pickImage(true)}>Camera</Button>
        </Modal>
      </Portal>

    </View>
  )
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 6 },
  photoCard: { width: 100, height: 100, alignSelf: 'center', backgroundColor: "#f3f3f3", marginBottom: 16, alignItems: 'center' },
  input: {
    borderWidth: 1, height: 48,
    borderColor: "#ccc", padding: 0,
    marginBottom: 15, borderRadius: 8
  },
  inputIcon: { width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { flex: 1, marginRight: 8, },
  cancelButton: { flex: 1, marginLeft: 8 },
  bottomSheet: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', padding: 16 },
  imagePreview: { width: 100, height: 100, borderRadius: 8 },
});

export default AddAsset;
