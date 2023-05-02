import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../../constants';
import {useFormik} from 'formik';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Divider} from 'react-native-paper';

const AdvancedSearch = props => {
  const {modalVisible, setModalVisible} = props;

  const dispatch = useDispatch();

  const toast = useToast();
  // useEffect(() => {
  //   if (updateBreedData) {
  //     formik.setValues(updateBreedData);
  //   }
  // }, [updateBreedData]);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(MESSAGES.setMessage('BreedRequired')),
    }),
    onSubmit: async formValue => {
      if (updateBreedData) {
      } else {
        dispatch(createBreed({formValue, toast}));
        //BREEDQUERY.newBreed(formValue.name, setBreedsData, toast);
      }
      setModalVisible(false);
      formik.resetForm();
    },
  });
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.backGround,
              marginBottom: 20,

              width: '100%',
            }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);

                formik.resetForm();
              }}>
              <AntDesign name="close" size={18} color="white" />
            </Pressable>
            <Text style={styles.modalText}>
              {LABELS.setLabel('AdvancedSearch')}
            </Text>
          </View>
          <View style={styles.bodyStyle}>
            <ScrollView>
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('Breed')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('Groups')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('ObtainedCattle')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('Sex')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
              <Text style={{fontFamily: FONTS.IRAN_BOLD, marginTop: 5}}>
                {LABELS.setLabel('BDate')}
              </Text>
              <Divider style={styles.divider} />
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('َAsDate')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('َToDate')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
              <Text style={{fontFamily: FONTS.IRAN_BOLD, marginTop: 5}}>
                {LABELS.setLabel('EntryDate')}
              </Text>
              <Divider style={styles.divider} />
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('َAsDate')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  style={[styles.input]}
                  placeholder={LABELS.setLabel('َToDate')}
                  placeholderTextColor={COLORS.gray}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  autoCapitalize="none"
                />
              </View>
            </ScrollView>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);

                formik.resetForm();
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? COLORS.btnBack
                    : COLORS.btnBackPress,
                },

                styles.loginBtn,
              ]}>
              <Text
                style={{
                  color: COLORS.txt,
                  fontSize: 15,
                  fontFamily: FONTS.IRAN_BOLD,
                }}>
                {LABELS.setLabel('Cancel')}
              </Text>
            </Pressable>
            <Pressable
              disabled={false}
              onPress={formik.handleSubmit}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? COLORS.btnConfirmPress
                    : COLORS.btnConfirm,
                },

                styles.loginBtn,
              ]}>
              <Text
                style={{
                  color: COLORS.txt,
                  fontSize: 15,
                  fontFamily: FONTS.IRAN_BOLD,
                }}>
                {LABELS.setLabel('Search')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AdvancedSearch;

const styles = StyleSheet.create({
  loginBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  txtError: {
    color: COLORS.red,
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 17,
  },
  inputField: {
    borderRadius: 7,
    padding: 17,
    backgroundColor: COLORS.white,
    borderColor: COLORS.inputFieldBackGround,
    borderWidth: 1,
    marginBottom: 5,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.gray,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    maxWidth: 350,
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingTop: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 24,
  },
  button: {
    borderRadius: 30,
    padding: 5,
    elevation: 2,
    position: 'absolute',
    right: -20,
    top: -20,
  },

  buttonClose: {
    backgroundColor: COLORS.red,
  },
  textStyle: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 15,
    textAlign: 'center',
  },
  divider: {
    marginBottom: 10,
    marginTop: 10,
  },
  bodyStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.backGround,
    paddingBottom: 15,
    marginBottom: 15,
    maxHeight: 400,
  },
});
