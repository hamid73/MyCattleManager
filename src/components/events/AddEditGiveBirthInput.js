import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS, FONTS, LABELS} from '../../constants';
import CustomDropDown from '../CustomDropDown';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCattlesByGender} from '../../redux/features/cattleSlice';
import {toEnglishDigits} from '../../utility';
import * as GetData from '../../constants/data';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {TextInput, useTheme} from 'react-native-paper';

const AddEditGiveBirthInput = ({setEventValues}) => {
  const {cattlesByGender} = useSelector(state => ({
    ...state.cattle,
  }));
  const theme = useTheme();
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
  const [regCalf, setRegCalf] = useState(false);

  const [giveBirthData, setGiveBirthData] = useState();
  useEffect(() => {
    setEventValues(giveBirthData);
  }, [giveBirthData]);
  return (
    <View style={{zIndex: 300}}>
      <CustomDropDown
        placeholder={LABELS.setLabel('Semen/Tag')}
        onChangeValue={value =>
          setGiveBirthData({...giveBirthData, fatherId: value})
        }
        onSelectItem={item =>
          setGiveBirthData({...giveBirthData, fPlaque: item.label})
        }
        searchable={true}
        data={fatherList}
        labelStyle={styles.input}
        setStyle={[styles.inputField, {borderWidth: 1}]}
        pColor={COLORS.gray}
        listItemLabelColor={COLORS.gray}
        dropDownBorderColor={COLORS.onPrimaryColor}
        listItemColor={COLORS.white}
        setZIndex={2000}
        zIndexInverse={2000}
      />
      {(!regCalf && (
        <TouchableOpacity
          style={[styles.ConfirmBtn, {zIndex: -1}]}
          onPress={() => {
            setRegCalf(true);
            setGiveBirthData({...giveBirthData, regCalf: true});
          }}>
          <Text style={[styles.titleTextFont, {color: COLORS.white}]}>
            {LABELS.setLabel('RegNewCalf')}
          </Text>
        </TouchableOpacity>
      )) || (
        <View style={styles.regCalf}>
          <TextInput
            keyboardType="phone-pad"
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={[styles.inputField, {flex: 0.8}]}
            label={LABELS.setLabel('Plaque') + '*'}
            placeholder={LABELS.setLabel('Plaque') + '*'}
            onChangeText={value =>
              setGiveBirthData({...giveBirthData, calfPlaque: value})
            }
          />

          <View style={{flex: 0.7, marginLeft: 10}}>
            <CustomDropDown
              placeholder={LABELS.setLabel('Sex') + '*'}
              data={GetData.sexData}
              onChangeValue={value =>
                setGiveBirthData({...giveBirthData, calfSex: value})
              }
              labelStyle={styles.input}
              setStyle={[
                styles.inputField,
                {borderWidth: 1, flex: 1, marginTop: 7},
              ]}
              pColor={COLORS.gray}
              listItemLabelColor={COLORS.gray}
              dropDownBorderColor={COLORS.onPrimaryColor}
              listItemColor={COLORS.white}
              setZIndex={3000}
              zIndexInverse={2000}
            />
          </View>
          <TouchableOpacity
            style={styles.closeReg}
            onPress={() => {
              setRegCalf(false);
              setGiveBirthData({...giveBirthData, regCalf: false});
            }}>
            <AntDesign name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddEditGiveBirthInput;

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
    color: COLORS.gray,
    fontFamily: FONTS.IRAN_REGULAR,
    flex: 1,
  },
  ConfirmBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: COLORS.btnConfirm,
    marginBottom: 10,
  },
  regCalf: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    zIndex: -1,
  },
  closeReg: {
    flex: 0.3,
    alignItems: 'center',
    paddingBottom: 10,
  },
});
