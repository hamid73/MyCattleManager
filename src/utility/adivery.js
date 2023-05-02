import {Adivery} from 'adivery';
import {getDataStorage} from '.';
const adiveryAppId = 'ffb45eda-f86b-4e37-aeb2-a4c9f4099657';
//تبیلغ جایزه ای
const rewardedPlacement = '44f003f5-b1e7-4b6e-91b5-806b1b2f1f0d';

const setAdivery = () => {
  Adivery.configure(adiveryAppId);
};

const checkPremiumeAccount = async () => {
  return await getDataStorage('PremiumeAccount');
  // console.log('🚀 ~ file: adivery.js:11 ~ showRewardedAdds ~ res', res);
};

export const showRewardedAdds = async () => {
  try {
    setAdivery();
    const res = await checkPremiumeAccount();
    console.log('🚀 ~ file: adivery.js:20 ~ showRewardedAdds ~ res:', res);

    if (res === 'true') {
      return true;
    } else {
      Adivery.prepareRewardedAd(rewardedPlacement);
      const action = () =>
        new Promise(resolve => {
          Adivery.isLoaded(rewardedPlacement).then(isLoaded => {
            if (isLoaded) {
              Adivery.showAd(rewardedPlacement);
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      return await action().then(result => {
        return result;
      });
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
