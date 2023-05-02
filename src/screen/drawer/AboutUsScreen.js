import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS, LABELS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <View style={{backgroundColor: COLORS.white}}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 60,
              padding: 20,
              alignItems: 'center',
            }}>
            <Image source={ICONS.logo} style={{width: 180, height: 180}} />
          </View>
        </View>
        <View style={styles.support}>
          <View style={[styles.subSupport, {marginTop: 0}]}>
            <View style={styles.rightSide}>
              <FontAwesome name="whatsapp" size={40} color={COLORS.green} />
            </View>
            <View style={styles.leftSide}>
              <Text
                style={[styles.linkText, {color: 'green'}]}
                onPress={() =>
                  Linking.openURL('https://wa.me/message/WLYZIU3ZYQHXI1')
                }>
                09134572676
              </Text>
            </View>
          </View>
          <View style={styles.subSupport}>
            <View style={styles.rightSide}>
              <MaterialCommunityIcons name="web" size={40} color="blue" />
            </View>
            <View style={styles.leftSide}>
              <Text
                style={[styles.linkText, {color: 'blue'}]}
                onPress={() =>
                  Linking.openURL('http://damyar.breederspatron.ir')
                }>
                WWW.Damyar.BreedersPatron.IR
              </Text>
            </View>
          </View>
          <View style={styles.subSupport}>
            <View style={styles.rightSide}>
              <Entypo name="instagram" size={40} color="#833AB4" />
            </View>
            <View style={styles.leftSide}>
              <Text
                style={[styles.linkText, {color: '#833AB4'}]}
                onPress={() =>
                  Linking.openURL(
                    'https://instagram.com/damyar.app?igshid=ZDdkNTZiNTM=',
                  )
                }>
                @Damyar.App
              </Text>
            </View>
          </View>
        </View>
        <View style={{padding: 20, backgroundColor: 'white'}}>
          <Text
            style={{
              fontFamily: FONTS.IRAN_EXTRA_BOLD,
              textAlign: 'justify',
              color: 'black',
              lineHeight: 35,
              fontSize: 16,
            }}>
            دامیار:
          </Text>
          <Text
            style={{
              fontFamily: FONTS.IRAN_REGULAR,
              textAlign: 'justify',
              color: 'black',
              lineHeight: 35,
              fontSize: 14,
            }}>
            {'    '}نرم افزار دامیار یک نرم افزار کاربردی هست که به گاوداران کمک
            می کند تا مزارع گاوهای شیری/گوشتی خود را مدیریت کنند.{'\n'} تمامی
            اتفاقات و رویدادهای دامداری مانند:{'\n'} تولید شیر و گوشت، درآمد،
            هزینه ها و ... را ردیابی و ثبت می کند.{'\n'} شما می توانید از تمامی
            وقایع دامداری گزارش هایی بصورت تصویری و PDF تهیه کنید{'\n'} این
            برنامه به دامدارانی که، پرورش گاو شیری و پرواری انجام میدهند در ثبت
            تولیدات خود در زمینه گوشت و شیر کمک کرده و کار آن ها بسیار راحت می
            کند{'\n'} شما می توانید در این برنامه مدیریت گاو، گاو نر، تلیسه،
            گوساله و گوساله نر را به راحتی انجام دهید.{'\n'} یکی از ویژگی های
            برجسته این برنامه کمک به شما برای مدیرت اتفاقات و رویدادهای فردی و
            دسته جمعی گاو ها مانند تلقیح گاو، بارداری، سقط جنین، درمان،
            واکسیناسیون، اخته کردن، وزن کردن، اسپری کردن، تولد و داشتن شجره نامه
            گوساله ها نام برد.{'\n'} و بعد از جمع آوری این اطلاعات شما قادر
            خواهی بود در هر بازه زمانی که خواسته باشین از این اطلاعات گزارش تهیه
            کنید.{'\n'} این برنامه از چندین نژاد گاو پشتیبانیکرده و می توانید
            چندین نژاد گاو را همزمان در گروه های مختلف مدیریت و رسیدگی کنید.
            {'\n'}
          </Text>

          <Text
            style={{
              fontFamily: FONTS.IRAN_EXTRA_BOLD,
              textAlign: 'justify',
              color: 'black',
              lineHeight: 35,
              fontSize: 16,
            }}>
            امکانات فعلی برنامه:
          </Text>
          <Text
            style={{
              fontFamily: FONTS.IRAN_BOLD,
              textAlign: 'justify',
              color: 'black',
              lineHeight: 35,
              fontSize: 14,
              paddingRight: 15,
            }}>
            • امکان ثبت دام در دسته بندی ها و نژاد های مختلف{'\n'}• امکان ثبت
            تولیدات دام ها بصورت فردی و دسته جمعی دام ها{'\n'}• امکان ثبت حاملگی
            دام ها بصورت تلقیح و گاو نر{'\n'}• امکان ثبت رویداد های دامداری
            مانند سقط جنین، درمان، واکسیناسیون، اخته کردن، وزن کردن، اسپری کردن،
            و تولد گوساله{'\n'}• درست کردن شجره کامل از نسل یک گاو
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
  },
  support: {
    backgroundColor: COLORS.bgColorApp,
    flex: 1,
    flexGrow: 1,
    //width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.silver,
    paddingTop: 25,
    paddingBottom: 20,
    margin: 10,
  },
  subSupport: {flexDirection: 'row', marginTop: 15, alignItems: 'center'},
  leftSide: {
    alignItems: 'flex-end',
    flex: 2,
  },
  rightSide: {
    alignItems: 'center',
    flex: 0.6,
    paddingRight: 10,
  },
  TitleText: {
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 17,
    color: 'black',
  },
  detText: {
    fontFamily: FONTS.IRAN_REGULAR,
    fontSize: 16,
  },
  linkText: {
    fontFamily: FONTS.IRAN_REGULAR,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: COLORS.btnConfirmPress,
    marginRight: 10,
  },
});
