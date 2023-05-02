import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {COLORS, FONTS, ICONS, LABELS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
const RequestPAccountModal = props => {
  const {modalVisible, setModalVisible, inputValue} = props;
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.bgModal} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={ICONS.vip} style={styles.vipLogo} />
              <Text style={styles.modalText}>
                {LABELS.setLabel('PremiumRequest')}
              </Text>
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.txtBody}>
              متاسفانه تبلیغی برای نمایش و ادامه روند کار در برنامه برای شما
              وجود ندارد.
            </Text>
            <Text style={styles.txtBoldBody}>
              لطفا برای رفع محدودیت های برنامه و حذف تبلیغات آزار دهنده اشتراک
              ویژه تهیه کنید. و ما را در ادامه راه، و ارتقا اپلیکیشن دامیار یاری
              فرمایین
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={[
                {
                  backgroundColor: COLORS.cancelButton,
                },
                styles.loginBtn,
              ]}>
              <Text style={styles.txtBTN}>{LABELS.setLabel('Later')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: COLORS.btnBack,
                },

                styles.loginBtn,
              ]}>
              <Text style={styles.txtBTN}>{LABELS.setLabel('Buy')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestPAccountModal;

const styles = StyleSheet.create({
  txtBTN: {
    color: COLORS.txt,
    fontSize: 15,
    fontFamily: FONTS.IRAN_BOLD,
  },
  bgModal: {
    backgroundColor: '#232f34',
    opacity: 0.4,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    marginBottom: 20,

    width: '100%',
  },
  body: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: COLORS.borderColor,
    paddingBottom: 20,
    marginBottom: 20,
  },
  txtBody: {fontFamily: FONTS.IRAN_REGULAR},
  txtBoldBody: {fontFamily: FONTS.IRAN_BOLD},
  footer: {flexDirection: 'row', zIndex: 1},
  loginBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
    zIndex: -100,
    flexDirection: 'row',
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
    backgroundColor: COLORS.cancelButton,
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
    fontSize: 18,
  },
  vipLogo: {
    width: 35,
    height: 35,
    marginRight: 5,
    marginBottom: 15,
  },
});
