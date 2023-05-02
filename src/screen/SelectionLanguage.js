import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {COLORS, FONTS, ICONS, ROUTES} from '../constants';
import {RadioButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/dist/FontAwesome';
import {setDataStorage, sleep} from '../utility';
import RNRestart from 'react-native-restart';
const SelectionLanguage = () => {
  const handleLang = async () => {
    if (value) {
      setDataStorage('@Language', value);
      if (value === 'fa') {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
        //await Updates.reloadAsync();
      } else {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
        //await Updates.reloadAsync();
      }
      await sleep(500);
      RNRestart.restart();
    }
  };

  const [value, setValue] = React.useState('fa');
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.header}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 60,
            padding: 20,
          }}>
          <Image source={ICONS.logo} style={{width: 80, height: 80}} />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontFamily: FONTS.IRAN_BOLD,
            color: COLORS.white,
          }}>
          اپلیکیشن دامیار
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Image
          source={require('./../../assets/language.png')}
          style={{width: '65%', height: '65%'}}
        />
      </View>
      <View
        style={{
          flex: 2,
          padding: 10,
        }}>
        <View style={styles.languageBox}>
          <View style={{flexDirection: 'row'}}>
            <MaterialIcons
              name="language"
              style={{fontSize: 24, color: COLORS.black}}
            />
            <Text style={styles.languageText}>انتخاب زبان</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[styles.languageText, {marginRight: 5, marginLeft: 0}]}>
              Selecting Language
            </Text>
            <MaterialIcons
              name="language"
              style={{fontSize: 24, color: COLORS.black}}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.languageItem}>
            <RadioButton.Group
              onValueChange={value => setValue(value)}
              value={value}>
              <RadioButton.Item
                labelStyle={{fontFamily: FONTS.IRAN_BOLD}}
                mode="ios"
                label="فارسی"
                value="fa"
              />
              <RadioButton.Item
                labelStyle={{fontFamily: FONTS.IRAN_BOLD}}
                label="English"
                mode="ios"
                value="en"
              />
              <RadioButton.Item
                labelStyle={{fontFamily: FONTS.IRAN_BOLD}}
                label="العربیه"
                mode="ios"
                value="ar"
                disabled={true}
              />
            </RadioButton.Group>
          </View>
          <TouchableOpacity
            onPress={() => handleLang()}
            style={styles.btnSetLang}>
            <Text
              style={{
                fontFamily: FONTS.IRAN_BOLD,
                color: COLORS.white,
                fontSize: 16,
              }}>
              {value === 'fa'
                ? 'ثبت و بارگذاری برنامه'
                : 'Register & Loading Apllication'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectionLanguage;

const styles = StyleSheet.create({
  header: {
    flex: 0.8,
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSetLang: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 15,
    margin: 20,
    alignItems: 'center',
    borderRadius: 7,
    justifyContent: 'flex-end',
  },
  languageBox: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.silver,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  languageText: {
    marginLeft: 5,
    color: COLORS.black,
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 17,
  },
  languageItem: {
    padding: 17,
    width: '100%',
  },
  textItem: {
    fontFamily: FONTS.IRAN_BOLD,
    color: COLORS.gray,
  },
});
