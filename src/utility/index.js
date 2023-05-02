import AsyncStorage from '@react-native-async-storage/async-storage';
import {LABELS} from '../constants';
import {Text} from 'react-native-paper';
import {Base64} from 'js-base64';

export const excerpt = str => {
  if (str.length > 45) {
    return str.substring(0, 45) + '...';
  }
};
export const toFarsiDigits = function (str) {
  return str.replace(/[0-9]/g, function (w) {
    var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persian[w];
  });
};
export const toEnglishDigits = function (str) {
  return str.replace(/[۰-۹]/g, function (w) {
    var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persian.indexOf(w);
  });
};
export const GetAge = (StartDate, EndDate) => {
  const date1 = new Date(StartDate);

  const date2 = new Date(EndDate);

  const millisBetween = date2.getTime() - date1.getTime();
  let days = millisBetween / (1000 * 3600 * 24);

  let str = '';

  // Map lengths of `diff` to different time periods
  const values = [
    [LABELS.setLabel('Years') + ' ', 365],
    [LABELS.setLabel('Months'), 30],
    [LABELS.setLabel('Days'), 1],
  ];

  // Iterate over the values...
  for (let i = 0; i < values.length; i++) {
    const amount = Math.floor(days / values[i][1]);

    // ... and find the largest time value that fits into the diff
    if (amount >= 1) {
      // If we match, add to the string ('s' is for pluralization)
      str += amount + values[i][0] + ' ';

      // and subtract from the diff
      days -= amount * values[i][1];
    }
  }

  return str !== '' ? str : '0 ' + LABELS.setLabel('Days');
};

export const setDataStorage = async (label, value) => {
  //console.log("🚀 ~ file: index.js:53 ~ storeLanguage ~ value", value);
  try {
    await AsyncStorage.setItem(label, value);
  } catch (e) {
    console.log(e);
  }
};

export const getDataStorage = async label => {
  try {
    const value = await AsyncStorage.getItem(label);
    return value;
  } catch (e) {
    console.log(e);
  }
};
export const DayCounter = async setDay => {
  const day = await getDataStorage('PeremiumeDayCounter');
  setDay(day);
};

export const itemListMayket = [
  {sku: '1Month', day: 30},
  {sku: '3Month', day: 100},
  {sku: '6Month', day: 200},
  {sku: '1Years', day: 430},
];

export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const encryptPassword = password => {
  var encode = Base64.encode(password);
  return encode;
};
export const decryptPassword = password => {
  var decode = Base64.decode(password);
  return decode;
};
