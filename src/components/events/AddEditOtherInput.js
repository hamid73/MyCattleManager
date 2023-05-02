import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, LABELS} from '../../constants';
import {useEffect} from 'react';
import {useState} from 'react';
import {TextInput, useTheme} from 'react-native-paper';

const AddEditOtherInput = ({setEventValues}) => {
  const [otherValue, setOtherValue] = useState({name: ''});
  const {name} = otherValue;
  useEffect(() => {
    setEventValues(otherValue);
  }, [otherValue]);
  const theme = useTheme();
  return (
    <View>
      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        placeholder={LABELS.setLabel('NameEvent') + '*'}
        label={LABELS.setLabel('NameEvent') + '*'}
        value={name}
        onChangeText={value => setOtherValue({name: value})}
      />
    </View>
  );
};

export default AddEditOtherInput;

const styles = StyleSheet.create({
  textFont: {fontFamily: FONTS.IRAN_REGULAR},
  titleTextFont: {fontFamily: FONTS.IRAN_BOLD},
  inputField: {
    borderRadius: 7,
    borderColor: COLORS.onPrimaryColor,
    backgroundColor: COLORS.white,
    // padding: 17,
    //backgroundColor: COLORS.inputFieldBackGround,
    marginBottom: 10,
  },
  input: {
    color: COLORS.inputFieldText,
    flex: 1,
  },
});
