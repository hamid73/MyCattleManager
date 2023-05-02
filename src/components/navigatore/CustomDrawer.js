import {
  DevSettings,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS, FONTS, ICONS, LABELS, MESSAGES, ROUTES} from '../../constants';

import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import {Divider} from 'react-native-paper';
import RNRestart from 'react-native-restart';
import {DayCounter, setDataStorage, sleep} from '../../utility';
import {useNavigation} from '@react-navigation/native';
import AlertMessage from '../AlertMessage';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const CustomDrawer = props => {
  const setLanguge = async fa => {
    setDataStorage('@Language', fa ? 'fa' : 'en');
    I18nManager.forceRTL(fa);
    I18nManager.allowRTL(fa);
    await sleep(500);
    RNRestart.restart();
  };
  const navigation = useNavigation();

  const shareAppHandle = async () => {
    const result = await Share.share({
      message:
        LABELS.setLabel('Damyar') +
        '\n ' +
        LABELS.setLabel('DownloadLink') +
        ':' +
        '\n https://myket.ir/app/com.mycattlemanager?utm_source=search-ads-gift&utm_medium=cpc' +
        '\n ' +
        LABELS.setLabel('WebSite') +
        ':' +
        '\n http://Damyar.BreedersPatron.ir' +
        '\n ' +
        LABELS.setLabel('InstaPage') +
        '\n https://www.instagram.com/damyar.app',
    });
  };
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [day, setDay] = useState();
  DayCounter(setDay);
  return (
    <>
      <AlertMessage
        // key={eventId}
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        title={LABELS.setLabel('Yes')}
        message={MESSAGES.setMessage('Exit')}
        buttons={[
          {text: LABELS.setLabel('No')},
          {
            text: LABELS.setLabel('Yes'),
            func: () => {
              setDataStorage('AlwaysLogin', 'false');
              BackHandler.exitApp();
            },
            styles: {color: COLORS.red},
          },
        ]}
        android={{
          title: {fontFamily: FONTS.IRAN_BOLD},
          message: {fontFamily: FONTS.IRAN_REGULAR},
        }}
        ios={{
          title: {fontFamily: FONTS.IRAN_BOLD},
          message: {fontFamily: FONTS.IRAN_REGULAR},
        }}
        Icon={<MaterialIcons name="dangerous" size={34} color={COLORS.red} />}
      />
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.header}>
            <View style={styles.logoBOx}>
              <View style={styles.logo}>
                <FontAwesome name="user" size={50} color={COLORS.primary} />
              </View>
              <Text style={styles.damyar}>{LABELS.setLabel('Damyar')}</Text>
            </View>
            <View style={styles.profile}>
              <Text style={styles.user}>{LABELS.setLabel('Guest')}</Text>
              <View style={styles.vipedBox}>
                <Image source={ICONS.vip} style={styles.vipedLogo} />
                <View>
                  <Text style={styles.Viped}>مشترک ویژه</Text>
                  <Text
                    style={[
                      styles.Viped,
                      {fontFamily: FONTS.IRAN_BOLD, paddingTop: 5},
                    ]}>
                    {day} روز
                  </Text>
                  <Text style={styles.Viped}> مانده</Text>
                </View>
              </View>
            </View>
          </View>

          <DrawerItemList {...props} />

          <View style={styles.languageBox}>
            <MaterialIcons name="language" size={24} color={COLORS.gray} />
            <Text style={styles.languageText}>
              {LABELS.setLabel('Language')}
            </Text>
          </View>
          <View style={styles.languageItem}>
            <TouchableOpacity
              style={styles.btnItem}
              onPress={() => {
                setLanguge(true);
              }}>
              <Text style={styles.textItem}>فارسی</Text>
            </TouchableOpacity>
            <Divider style={{marginBottom: 10, marginTop: 10}} />
            <TouchableOpacity
              style={styles.btnItem}
              onPress={() => {
                setLanguge(false);
              }}>
              <Text style={styles.textItem}>English</Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
        <TouchableOpacity
          style={styles.btnVIP}
          onPress={() => navigation.navigate(ROUTES.PAYMENT)}>
          <View style={styles.vipBox}>
            <Image source={ICONS.vip} style={styles.vipLogo} />
          </View>
          <Text style={styles.vipText}>{LABELS.setLabel('Premium')}</Text>
        </TouchableOpacity>
        <View style={styles.signOutBox}>
          <TouchableOpacity
            onPress={() => shareAppHandle()}
            style={{paddingBottom: 32, paddingTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="share-alt" size={24} color={COLORS.gray} />
              <Text style={styles.signOutText}>
                {LABELS.setLabel('IntroduceFriends')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAlertModalVisible(true)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="sign-out" size={24} color={COLORS.gray} />

              <Text style={styles.signOutText}>
                {LABELS.setLabel('SignOut')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  Viped: {
    paddingRight: 5,
    fontFamily: FONTS.IRAN_LIGHT,
    color: 'white',
    textAlign: 'center',
    lineHeight: 18,
  },
  btnVIP: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.btnBackPress,
    marginBottom: 5,
    backgroundColor: COLORS.btnBack,
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.primary,

    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    padding: 5,
    alignItems: 'center',
    flex: 1,
  },
  user: {
    fontFamily: FONTS.IRAN_BOLD,
    color: COLORS.white,
  },
  logoBOx: {alignItems: 'center', flex: 0.7},
  logo: {
    borderRadius: 30,
    backgroundColor: COLORS.white,
    width: 60,
    height: 60,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  damyar: {
    fontFamily: FONTS.IRAN_EXTRA_BOLD,
    color: COLORS.white,
    fontSize: 20,
  },
  signOutBox: {
    paddingBottom: 15,
    paddingLeft: 20,
  },
  vipText: {
    marginLeft: 10,
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 16,
    color: COLORS.white,
  },
  signOutText: {
    fontFamily: FONTS.IRAN_BOLD,
    marginLeft: 10,
    color: COLORS.gray,
  },
  vipLogo: {
    width: 35,
    height: 35,
  },
  vipedLogo: {
    width: 25,
    height: 25,
  },
  vipBox: {backgroundColor: COLORS.white, borderRadius: 30, padding: 5},
  vipedBox: {
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  languageBox: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.silver,
    alignItems: 'center',
  },
  languageText: {
    marginLeft: 5,
    color: COLORS.gray,
    fontFamily: FONTS.IRAN_BOLD,
  },
  languageItem: {
    padding: 17,
  },
  textItem: {
    fontFamily: FONTS.IRAN_BOLD,
    color: COLORS.gray,
  },
  btnItem: {
    padding: 8,
  },
});
