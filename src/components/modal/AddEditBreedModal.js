import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../constants';
import {useFormik} from 'formik';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {createBreed} from '../../redux/features/breedSlice';
import {TextInput, useTheme} from 'react-native-paper';

const AddEditBreedModal = props => {
  const {modalVisible, setModalVisible, updateBreedData} = props;

  const dispatch = useDispatch();
  const theme = useTheme();
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
      <View
        style={{
          backgroundColor: '#232f34',
          opacity: 0.4,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
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
              {updateBreedData
                ? `${LABELS.setLabel('UpdateBreed')}: ${updateBreedData.name}`
                : LABELS.setLabel('NewBreed')}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor: COLORS.backGround,
              paddingBottom: 15,
              marginBottom: 15,
            }}>
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.onPrimary}
              activeOutlineColor={theme.colors.primary}
              style={[styles.inputField, styles.zindexStyle]}
              label={LABELS.setLabel('Name')}
              placeholder={LABELS.setLabel('Name')}
              placeholderTextColor={COLORS.placeHolder}
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              autoCapitalize="none"
            />

            {formik.touched.name && formik.errors.name ? (
              <Text style={styles.txtError}>{formik.errors.name}</Text>
            ) : null}
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
                {LABELS.setLabel('Save')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddEditBreedModal;

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

    backgroundColor: COLORS.white,
    borderColor: COLORS.onPrimaryColor,
    marginBottom: 15,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.inputFieldText,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
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
});
