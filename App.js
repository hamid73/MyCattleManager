import React, {useEffect, useState} from 'react';
import {StyleSheet, I18nManager} from 'react-native';

import AuthNavigator from './navigators/AuthNavigator';
import SelectionLanguage from './src/screen/SelectionLanguage';
import {getDataStorage, itemListMayket, setDataStorage} from './src/utility';
import 'react-native-gesture-handler';
import {MYKETPUBLICKEY} from '@env';
import {useMyket} from 'iab-myket-reactnative';
import {SignInScreen} from './src/screen';

export default function App() {
  let productIds = itemListMayket.map(x => x.sku);
  const [getLang, setLang] = useState();
  const myketInstance = useMyket(MYKETPUBLICKEY);
  const [AlwaysLogin, setLogin] = useState(false);

  useEffect(() => {
    setDataStorage('PremiumeAccount', 'false');
    getLanguage();
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
    let inventory = await myketInstance
      .queryPurchaseProduct(true, productIds)
      .catch(error => {
        console.log(error.toString());
      });

    // console.log(inventory.allPurchases[0].sku);
    // console.log(inventory.allPurchases[0].purchaseTime);

    inventory.allPurchases.map(purchase => {
      const date1 = new Date(purchase.purchaseTime);

      const date2 = new Date();
      const millisBetween = date2.getTime() - date1.getTime();
      let days = millisBetween / (1000 * 3600 * 24);

      let getSku = itemListMayket.find(f => f.sku === purchase.sku);

      if (days >= getSku.day) {
        setDataStorage('PremiumeAccount', 'false');
        myketInstance.consumePurchase(purchase);
      } else {
        setDataStorage('PremiumeAccount', 'true');
        const dayCounter = parseInt(getSku.day - days);

        setDataStorage('PeremiumeDayCounter', dayCounter.toString());
      }
    });

    /**
     * It is recommended to consume products that User have already bought, immediately after querying the inventory
     */
  };

  const getLanguage = async () => {
    const res = await getDataStorage('@Language');
    setLang(res);
  };

  useEffect(() => {
    if (getLang) {
      // console.log("🚀 ~ file: App.js:45 ~ useEffect ~ getLang", getLang);
      if (getLang === 'en') {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
      } else {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
      }
    }
  }, [getLang]);

  return (
    <>{(getLang !== null && <AuthNavigator />) || <SelectionLanguage />}</>
    // <SelectionLanguage />
    // <SignInScreen />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
