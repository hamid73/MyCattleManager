import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, LABELS} from '../../constants';
import CustomDropDown from '../CustomDropDown';
import {toEnglishDigits} from '../../utility';
import {useDispatch, useSelector} from 'react-redux';
import {getCattlesByGender} from '../../redux/features/cattleSlice';
import moment from 'jalali-moment';
import {TextInput, useTheme} from 'react-native-paper';

const initialState = {
  matingDate: '',
  deliveryDate: '',
  semen: '',
};
const AddEditPregnantInput = ({
  setEventValues,
  setModalDeliveryDateVisible,
  setModalVisible,
  getMatingDate,
  getDeliveryDate,
}) => {
  const [pregnantValue, setPregnantValue] = useState(initialState);
  const {matingDate, deliveryDate, semen} = pregnantValue;
  useEffect(() => {
    setEventValues(pregnantValue);
  }, [pregnantValue]);

  // set dropDown list for father tags
  const {cattlesByGender} = useSelector(state => ({
    ...state.cattle,
  }));
  // set dropDown list for father tags
  const [fatherList, setFatherList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCattlesByGender({sex: false}));
  }, []);
  useEffect(() => {
    if (cattlesByGender) {
      setFatherList(
        cattlesByGender.map(row => ({
          value: row.id,
          label: toEnglishDigits(row.plaque),
        })),
      );
    }
  }, [cattlesByGender]);

  useEffect(() => {
    if (getMatingDate !== '') {
      setPregnantValue({
        ...pregnantValue,
        matingDate: moment(getMatingDate, 'jYYYY/jMM/jDD')
          .locale('fa')
          .format('YYYY/MM/DD'),
      });
    } else {
      setPregnantValue({
        ...pregnantValue,
        matingDate: '',
      });
    }
  }, [getMatingDate]);

  useEffect(() => {
    if (getDeliveryDate) {
      setPregnantValue({
        ...pregnantValue,
        deliveryDate: moment(getDeliveryDate, 'jYYYY/jMM/jDD')
          .locale('fa')
          .format('YYYY/MM/DD'),
      });
    } else {
      setPregnantValue({
        ...pregnantValue,
        deliveryDate: '',
      });
    }
  }, [getDeliveryDate]);

  useEffect(() => {
    //add 283 day for delivery date
    if (matingDate !== '') {
      const delDate = moment(matingDate, 'jYYYY/jMM/jDD')
        .add('day', 283)
        .locale('fa')
        .format('YYYY/MM/DD');
      setPregnantValue({
        ...pregnantValue,
        deliveryDate: moment(delDate, 'jYYYY/jMM/jDD')
          .locale('fa')
          .format('YYYY/MM/DD'),
      });
    }
  }, [matingDate]);
  const theme = useTheme();

  return (
    <View style={{zIndex: 200}}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <TextInput
          editable={false}
          mode="outlined"
          outlineColor={theme.colors.onPrimary}
          activeOutlineColor={theme.colors.primary}
          style={styles.inputField}
          placeholder={LABELS.setLabel('MatingDate') + '*'}
          label={LABELS.setLabel('MatingDate') + '*'}
          value={matingDate}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalDeliveryDateVisible(true);
        }}>
        <TextInput
          editable={false}
          mode="outlined"
          outlineColor={theme.colors.onPrimary}
          activeOutlineColor={theme.colors.primary}
          style={styles.inputField}
          placeholder={LABELS.setLabel('DeliveryDate') + '*'}
          label={LABELS.setLabel('DeliveryDate') + '*'}
          value={deliveryDate}
        />
      </TouchableOpacity>
      <CustomDropDown
        placeholder={LABELS.setLabel('Semen/Tag')}
        onChangeValue={value =>
          setPregnantValue({...pregnantValue, semen: value})
        }
        searchable={true}
        data={fatherList}
        setStyle={[styles.inputField, {borderWidth: 1}]}
        pColor={COLORS.gray}
        listItemLabelColor={COLORS.gray}
        dropDownBorderColor={COLORS.onPrimaryColor}
        listItemColor={COLORS.white}
        setZIndex={2000}
        zIndexInverse={2000}
      />
    </View>
  );
};

export default AddEditPregnantInput;

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
