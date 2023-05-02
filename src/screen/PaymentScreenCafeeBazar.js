import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import React, {useState} from 'react';
import {COLORS, FONTS} from '../constants';
// import {LinearGradient} from 'expo-linear-gradient';
import {Divider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
// import CafeBazaar from "react-native-cafe-bazaar";

//myket
// Myket Iap
import MyketIap from './MyketIap';
import Inventory from './IapModels/Inventory';
import IabResult from './IapModels/IabResult';
import Purchase from './IapModels/Purchase';

const REQUEST_CODE = 10001;
function verifyDeveloperPayload(purchase) {
  // let payload = purchase.getDeveloperPayload();

  /*
   * TODO: verify that the developer payload of the purchase is correct. It will be
   * the same one that you sent when initiating the purchase.
   *
   * WARNING: Locally generating a random string when starting a purchase and
   * verifying it here might seem like a good approach, but this will fail in the
   * case where the user purchases an item on one device and then uses your app on
   * a different device, because on the other device you will not have access to the
   * random string you originally generated.
   *
   * So a good developer payload has these characteristics:
   *
   * 1. If two different users purchase an item, the payload is different between them,
   *    so that one user's purchase can't be replayed to another user.
   *
   * 2. The payload must be such that you can verify it even when the app wasn't the
   *    one who initiated the purchase flow (so that items purchased by the user on
   *    one device work on other devices owned by the user).
   *
   * Using your own server to store and verify developer payloads across app
   * installations is recommended.
   */

  return true;
}

const PaymentScreenCafeeBazar = () => {
  const [premium, usePremium] = useState(undefined);
  const RSA_PUBLIC_KEY =
    'MIHNMA0GCSqGSIb3DQEBAQUAA4G7ADCBtwKBrwCoKJbcA4k4lIGu7mtHI+I6ER9FcTGoAmvSgSuz1ozyW92IsahF0N5zMn/eCOlJSHNvtQfhtU9buc2+lCS43IUv/M+Zejp1H+ZGlRiOiZ7E8a2kbzwpJw0RxIVF8wicDcUwQEx2l6ax7ttHnZM9gDZy1bqNCAWMMlgkwv6s/EEE0c3eSPRaEvyTOpJsq6KlvcftxtGlZBPACupoYni/6g5yxYlluN9Vp7Cb53JL8S8CAwEAAQ==';

  //const bazaar = useBazaar(RSA_PUBLIC_KEY);
  const onPurchaseFinished = (result, purchase) => {
    let resultObject = new IabResult(JSON.parse(result));
    let purchaseObject = new Purchase(JSON.parse(purchase));

    if (resultObject.isFailure()) {
      console.debug('Error purchasing: ' + resultObject.Message);
      Alert.alert('Error purchasing: ', resultObject.Message);
      return;
    }

    if (!verifyDeveloperPayload(purchaseObject)) {
      console.debug(
        'Error :  Authenticity verification failed : ' + resultObject.Message,
      );
      Alert.alert(
        'Error :  Authenticity verification failed ',
        resultObject.Message,
      );
      return;
    }

    // bought 1/4 tank of gas. So consume it.
    console.debug('Purchase is gas. Starting gas consumption.');
    Alert.alert(
      'Purchase Completed',
      'Purchase is gas. Starting gas consumption.',
    );
    try {
      MyketIap.consumeAsync(purchase, this.onConsumeFinished);
    } catch (e) {
      console.warn('Error consuming gas. Another async operation in progress.');
    }
  };

  const handle1Month = async () => {
    MyketIap.launchPurchaseFlow(
      '1Month',
      REQUEST_CODE,
      () => onPurchaseFinished,
    );
  };

  const diamond = require('./../../assets/diamond.png');
  return (
    <>
      {/* <LinearGradient
        // Background Linear Gradient
        colors={['#43cea2', '#185a9d']}
        style={styles.background}
      /> */}
      <LinearGradient
        colors={['#43cea2', '#185a9d']}
        style={styles.linearGradient}>
        <View
          // Button Linear Gradient

          style={{flex: 1, alignItems: 'center'}}>
          <Image source={diamond} style={styles.bgImage} resizeMode="contain" />
          <View style={styles.header}>
            <View style={styles.logo}>
              <MaterialCommunityIcons
                name="advertisements-off"
                size={50}
                color={COLORS.gold}
              />
            </View>
            <Text style={styles.titleAds}>حذف تبلیغات</Text>
            <Text style={styles.detAds}>
              برای حذف تبلیغات آزار دهنده و یاری تیم توسعه دهنده ما در پشتیبانی
              و ارتقاء سطح اپلیکیشن دامیار اشتراک ویژه تهیه کنید.
            </Text>
          </View>

          <View style={{flex: 2, alignItems: 'center'}}>
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'center',

                alignItems: 'center',
              }}
              horizontal={true}>
              <TouchableOpacity style={styles.boxPrice} onPress={handle1Month}>
                <Image
                  source={diamond}
                  style={styles.bgBoxPrice}
                  resizeMode="contain"
                />
                <Text style={styles.number}>1</Text>
                <Text style={styles.month}>ماهه</Text>
                <Text style={styles.price}>30،000 تومان</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boxPrice}>
                <Image
                  source={diamond}
                  style={styles.bgBoxPrice}
                  resizeMode="contain"
                />
                <Text style={styles.number}>3</Text>
                <Text style={styles.month}>ماهه</Text>
                <Text style={styles.reward}>10 روز اشتراک رایگان</Text>
                <Text style={styles.price}>78،000 تومان</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boxPrice}>
                <Image
                  source={diamond}
                  style={styles.bgBoxPrice}
                  resizeMode="contain"
                />
                <Text style={styles.number}>6</Text>
                <Text style={styles.month}>ماهه</Text>
                <Text style={styles.reward}>20 روز اشتراک رایگان</Text>
                <Text style={styles.price}>156،000 تومان</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boxPrice}>
                <Image
                  source={diamond}
                  style={styles.bgBoxPrice}
                  resizeMode="contain"
                />
                <Text style={styles.number}>1</Text>
                <Text style={styles.month}>ساله</Text>
                <Text style={styles.reward}>2 ماه اشتراک رایگان</Text>
                <Text style={styles.price}>312،000 تومان</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View>
            <FontAwesome name="user-circle-o" size={24} color="white" />
          </View>
          <Divider
            theme={{color: {borderColor: 'white'}}}
            style={{
              marginTop: 20,

              width: '100%',
            }}
          />
          <View>
            <Text style={styles.owner}>تیم تحقیق و توسعه دامیار</Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default PaymentScreenCafeeBazar;

const styles = StyleSheet.create({
  bgImage: {
    maxWidth: 200,
    height: '100%',
    position: 'absolute',
    opacity: 0.2,
  },
  bgBoxPrice: {
    width: '100%',
    opacity: 0.2,
    height: '100%',
    position: 'absolute',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: "#FFD700",
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    padding: 20,

    backgroundColor: COLORS.white,
    borderRadius: 60,
  },
  titleAds: {
    fontFamily: FONTS.IRAN_BOLD,
    margin: 15,
    color: COLORS.white,
    fontSize: 20,
  },
  detAds: {
    fontFamily: FONTS.IRAN_REGULAR,
    textAlign: 'center',
    color: COLORS.white,
  },
  boxPrice: {
    height: 250,
    width: 180,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  number: {fontFamily: FONTS.IRAN_BOLD, fontSize: 50, color: COLORS.gold},
  month: {
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 35,
    top: -15,
    color: COLORS.gold,
  },
  price: {fontFamily: FONTS.IRAN_BOLD, fontSize: 20, top: -10},
  reward: {
    fontFamily: FONTS.IRAN_EXTRA_BOLD,
    fontSize: 18,
    color: COLORS.green,
    top: -15,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  owner: {
    textAlign: 'center',
    margin: 20,
    fontFamily: FONTS.IRAN_EXTRA_BOLD,
    color: COLORS.white,
  },
});
