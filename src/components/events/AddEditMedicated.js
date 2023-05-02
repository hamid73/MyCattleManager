import {StyleSheet, View} from 'react-native';

import {COLORS, FONTS, LABELS} from '../../constants';
import React, {useState, useEffect} from 'react';
import {TextInput, useTheme} from 'react-native-paper';

const initialState = {
  symptoms: '',
  diagnosis: '',
  technician: '',
};
const AddEditMedicated = ({setEventValues}) => {
  const [medicatedValue, setMedicatedValue] = useState(initialState);
  const {symptoms, diagnosis, technician} = medicatedValue;
  useEffect(() => {
    setEventValues(medicatedValue);
  }, [medicatedValue]);

  const theme = useTheme();
  return (
    <View>
      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        label={LABELS.setLabel('Symptoms') + '*'}
        placeholder={LABELS.setLabel('Symptoms') + '*'}
        value={symptoms}
        onChangeText={value => {
          setMedicatedValue({...medicatedValue, ['symptoms']: value});
        }}
      />

      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        placeholder={LABELS.setLabel('Diagnosis') + '*'}
        label={LABELS.setLabel('Diagnosis') + '*'}
        value={diagnosis}
        onChangeText={value => {
          setMedicatedValue({...medicatedValue, ['diagnosis']: value});
        }}
      />

      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        placeholder={LABELS.setLabel('Technician') + '*'}
        label={LABELS.setLabel('Technician') + '*'}
        value={technician}
        onChangeText={value => {
          setMedicatedValue({...medicatedValue, ['technician']: value});
        }}
      />
    </View>
  );
};

export default AddEditMedicated;

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
