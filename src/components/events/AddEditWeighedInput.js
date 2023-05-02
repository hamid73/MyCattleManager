import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, LABELS} from '../../constants';
import {useEffect} from 'react';
import {useState} from 'react';
import {TextInput, useTheme} from 'react-native-paper';
const AddEditWeighedInput = ({setEventValues}) => {
  const [weighedValue, setWeighedValue] = useState({resultWeiged: ''});
  const {resultWeiged} = weighedValue;
  useEffect(() => {
    setEventValues(weighedValue);
  }, [weighedValue]);

  const theme = useTheme();
  return (
    <View>
      <TextInput
        mode="outlined"
        outlineColor={theme.colors.onPrimary}
        activeOutlineColor={theme.colors.primary}
        style={styles.inputField}
        label={LABELS.setLabel('Weight') + '*'}
        placeholder={LABELS.setLabel('Weight') + '*'}
        placeholderTextColor={COLORS.placeHolder}
        value={resultWeiged}
        onChangeText={value => setWeighedValue({resultWeiged: value})}
        keyboardType="number-pad"
      />
    </View>
  );
};

export default AddEditWeighedInput;

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
