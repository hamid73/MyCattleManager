import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import {COLORS, FONTS} from '../constants';
import moment from 'jalali-moment';

const CustomDatePicker = props => {
  const {
    modalVisible,
    setModalVisible,
    maximumDate,
    selectedDate,
    minimumDate,
  } = props;

  const [selectDate, setSlectedDate] = useState();
  const confirmDate = () => {
    setModalVisible(false);
    props.setSlectedDate(selectDate);
  };

  const dateSelected = selectedDate
    ? selectedDate
    : moment.from(new Date()).format('jYYYY/jMM/jDD');
  const fa = true;
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
          <View style={styles.body}>
            <DatePicker
              isGregorian={fa ? false : true}
              mode="datepicker"
              options={{
                defaultFont: FONTS.IRAN_REGULAR,
                headerFont: FONTS.IRAN_BOLD,
              }}
              selected={dateSelected}
              // maximumDate={moment.from(new Date()).format("jYYYY/jMM/jDD")}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              onSelectedChange={selectedDate1 => {
                setSlectedDate(selectedDate1);
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center'}}
              onPress={confirmDate}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 15,
                  fontFamily: FONTS.IRAN_BOLD,
                }}>
                تایید
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 15,
                  fontFamily: FONTS.IRAN_BOLD,
                }}>
                انصراف
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    borderBottomWidth: 4,
    borderColor: COLORS.backGround,
    paddingBottom: 15,
    marginBottom: 15,
    minHeight: 200,
    maxHeight: 500,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backGround,
    marginBottom: 20,

    width: '100%',
  },
  btnCreate: {
    fontFamily: FONTS.IRAN_BOLD,
    color: COLORS.black,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.black,
    flex: 1,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    maxWidth: 400,
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
