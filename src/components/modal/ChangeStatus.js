import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../constants';
import {useFormik} from 'formik';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import CustomDropDown from '../CustomDropDown';
import * as GetData from '../../constants/data';
import {changeCattleStatus} from '../../redux/features/cattleSlice';
import {useNavigation} from '@react-navigation/native';
const ChangeStatus = props => {
  const {modalVisible, setModalVisible, id} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  // useEffect(() => {
  //   if (updateBreedData) {
  //     formik.setValues(updateBreedData);
  //   }
  // }, [updateBreedData]);
  const formik = useFormik({
    initialValues: {
      newStatus: '',
    },
    validationSchema: Yup.object({
      newStatus: Yup.string().required(
        MESSAGES.setMessage('CattleStatusRequired'),
      ),
    }),
    onSubmit: async formValue => {
      dispatch(
        changeCattleStatus({
          id,
          newStatus: formValue.newStatus,
          toast,
          navigation,
        }),
      );
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
              {LABELS.setLabel('ChangeStatus')}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor: COLORS.backGround,
              paddingBottom: 15,
              marginBottom: 15,
              zIndex: 10000,
            }}>
            <CustomDropDown
              placeholder={LABELS.setLabel('Status')}
              onChangeValue={value => formik.setFieldValue('newStatus', value)}
              searchable={true}
              setZIndex={2000}
              data={GetData.statusData}
              labelStyle={styles.input}
              setStyle={[styles.inputField, {borderWidth: 0}]}
            />

            {formik.touched.newStatus && formik.errors.newStatus ? (
              <Text style={styles.txtError}>{formik.errors.newStatus}</Text>
            ) : null}
          </View>
          <View style={{flexDirection: 'row', zIndex: 1}}>
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

export default ChangeStatus;

const styles = StyleSheet.create({
  loginBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
    zIndex: -100,
  },
  txtError: {
    color: COLORS.red,
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 17,
  },
  inputField: {
    borderRadius: 7,
    padding: 17,
    backgroundColor: COLORS.inputFieldBackGround,
    marginBottom: 5,
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
