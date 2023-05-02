import {
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import React, {useState, useEffect} from 'react';
import {COLORS, FONTS} from '../constants';
// import {LinearGradient} from 'expo-linear-gradient';
import {Divider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useMyket} from 'iab-myket-reactnative';
import {itemListMayket, setDataStorage} from '../utility';
import {MYKETPUBLICKEY} from '@env';
const itemList = itemListMayket;
const PaymentScreenMyket = () => {
  LogBox.ignoreAllLogs(true);

  const myketInstance = useMyket(MYKETPUBLICKEY);
  myketInstance.enableDebugging(false);

  const items = new Map();
  itemList.map(x => (items[x.sku] = x));

  useEffect(() => {
    // Anything in here is fired on component mount.
    myketInstance
      .connect(MYKETPUBLICKEY)
      .catch(error => {
        /**
         * myket is not installed or RSA public key is null or empty
         */
        console.log(error);
      })
      .then(retrieverProducts);
    return () => {
      // Anything in here is fired on component unmount.
      myketInstance.disconnect().catch(() => console.log);
    };
  }, []);

  const retrieverProducts = async () => {
    let productIds = itemList.map(x => x.sku);

    let inventory = await myketInstance
      .queryPurchaseProduct(true, productIds)
      .catch(error => {
        console.log(error.toString());
      });

    console.log(inventory.allPurchases);
    inventory.allProducts.map(s => {
      items[s.productId].title = s.title;
      items[s.productId].price = s.price;

      items[s.productId].description = s.description;
    });

    /**
     * It is recommended to consume products that User have already bought, immediately after querying the inventory
     */
    // inventory.allPurchases.map(purchase => {
    //   myketInstance.consumePurchase(purchase);
    // });
  };
  const purchase = async purchase => {
    /*
     TODO: for security, generate your payload here for verification.Since this is a SAMPLE, we just use
      * an empty string, but on a production app you should carefully generate this.
     */
    myketInstance
      .purchaseProduct(purchase.sku, '')
      .then(message => {
        setDataStorage('PremiumeAccount', 'true');
        ToastAndroid.show('اشتراک شما ثبت شد', ToastAndroid.SHORT);
        //console.log('called consumed!' + JSON.stringify(message));
        //consumePurchase(message);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // const consumePurchase = purchase => {
  //   myketInstance
  //     .consumePurchase(purchase)
  //     .then(model => {
  //       setDataStorage('PremiumeAccountDate', new Date.now());
  //       setDataStorage('PremiumeAccount', true);
  //       ToastAndroid.show('consume successful', ToastAndroid.SHORT);
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     });
  // };

  const handle1Month = async () => purchase(itemList[0]);
  const handle3Month = async () => purchase(itemList[1]);
  const handle6Month = async () => purchase(itemList[2]);
  const handle1Years = async () => purchase(itemList[3]);

  const diamond = require('./../../assets/diamond.png');
  return (
    <>
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
              <TouchableOpacity style={styles.boxPrice} onPress={handle3Month}>
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
              <TouchableOpacity style={styles.boxPrice} onPress={handle6Month}>
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
              <TouchableOpacity style={styles.boxPrice} onPress={handle1Years}>
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

export default PaymentScreenMyket;

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
