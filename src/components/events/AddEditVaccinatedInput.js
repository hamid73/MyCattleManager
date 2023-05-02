import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, LABELS} from '../../constants';
import {useEffect} from 'react';
import {useState} from 'react';
import {TextInput, useTheme} from 'react-native-paper';

const AddEditVaccinatedInput = ({setEventValues}) => {
  const [vaccinatedValue, setVaccinatedValue] = useState({name: ''});
  const {name} = vaccinatedValue;
  useEffect(() => {
    setEventValues(vaccinatedValue);
  }, [vaccinatedValue]);

  const theme = useTheme();

  return (
    <View>
      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        placeholder={LABELS.setLabel('NameVaccinated') + '*'}
        label={LABELS.setLabel('NameVaccinated') + '*'}
        value={name}
        onChangeText={value => setVaccinatedValue({name: value})}
      />
    </View>
  );
};

export default AddEditVaccinatedInput;

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
