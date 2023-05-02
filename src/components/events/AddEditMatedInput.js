import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, LABELS} from '../../constants';
import CustomDatePicker from '../CustomDatePicker';
import React, {useState, useEffect} from 'react';
import moment from 'jalali-moment';
import {TextInput, useTheme} from 'react-native-paper';
const initialState = {
  semenName: '',
  technician: '',
  heateDate: '',
};

const AddEditMatedInput = ({setEventValues}) => {
  const theme = useTheme();
  const [modalVisible, setmodalVisible] = useState(false);
  const [heateDate, setHeateDate] = useState();

  const [matedValue, setMatedValue] = useState(initialState);
  const {semenName, heateDate: heateDateValue, technician} = matedValue;
  useEffect(() => {
    setEventValues(matedValue);
  }, [matedValue]);
  useEffect(() => {
    const hDate = heateDate
      ? moment(heateDate, 'jYYYY/jMM/jDD').locale('fa').format('YYYY/MM/DD')
      : '';
    setMatedValue({
      ...matedValue,
      heateDate: hDate ? hDate : '',
    });
  }, [heateDate]);
  return (
    <View>
      <CustomDatePicker
        modalVisible={modalVisible}
        setModalVisible={setmodalVisible}
        setSlectedDate={setHeateDate}
        //minimumDate={moment.from(new Date()).format('jYYYY/jMM/jDD')}
        selectedDate={heateDate}
        key={'bDate'}
      />

      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        label={LABELS.setLabel('SemenUsed') + '*'}
        placeholder={LABELS.setLabel('SemenUsed') + '*'}
        placeholderTextColor={COLORS.placeHolder}
        value={semenName}
        onChangeText={value => {
          setMatedValue({...matedValue, semenName: value});
        }}
      />

      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        label={LABELS.setLabel('Technician') + '*'}
        placeholder={LABELS.setLabel('Technician') + '*'}
        placeholderTextColor={COLORS.placeHolder}
        value={technician}
        onChangeText={value => {
          setMatedValue({...matedValue, technician: value});
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setmodalVisible(true);
        }}>
        <TextInput
          editable={false}
          mode="outlined"
          outlineColor={theme.colors.onPrimary}
          activeOutlineColor={theme.colors.primary}
          style={styles.inputField}
          placeholder={LABELS.setLabel('HeateDate') + '*'}
          value={heateDateValue}
          onChangeText={value => {
            setMatedValue({...matedValue, heateDate: value});
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddEditMatedInput;

const styles = StyleSheet.create({
  textFont: {fontFamily: FONTS.IRAN_REGULAR},
  titleTextFont: {fontFamily: FONTS.IRAN_BOLD},
  inputField: {
    borderRadius: 7,

    backgroundColor: COLORS.white,
    borderColor: COLORS.onPrimaryColor,
    marginBottom: 15,
  },
  input: {
    color: COLORS.inputFieldText,
    flex: 1,
  },
});
