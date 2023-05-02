import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  ToastAndroid,
  Pressable,
} from 'react-native';
import React from 'react';
import {HelperText, TextInput, useTheme} from 'react-native-paper';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../constants';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useToast} from 'react-native-toast-notifications';
const SupportScreen = () => {
  const theme = useTheme();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      mobile: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required(MESSAGES.setMessage('FullNameRequired')),
      mobile: Yup.string().required(MESSAGES.setMessage('MobileRequired')),
      email: Yup.string()
        .required(MESSAGES.setMessage('EmailRequired'))
        .email(MESSAGES.setMessage('EmailFormat')),
      message: Yup.string().required(MESSAGES.setMessage('MessageRequired')),
    }),
    onSubmit: async formValue => {
      toast.show(MESSAGES.setMessage('SendMessageSuccessfuly'), {
        type: 'success',
      });
      formik.resetForm();
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <View>
          <View
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 60,
              padding: 5,
              marginBottom: 25,
              marginTop: 25,
              width: 100,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <MaterialIcons
              name="support-agent"
              size={84}
              color={COLORS.white}
            />
          </View>
        </View>
        <View style={styles.support}>
          <View style={[styles.subSupport, {marginTop: 0}]}>
            <View style={styles.rightSide}>
              <Text style={styles.TitleText}>
                <FontAwesome name="whatsapp" size={40} color={COLORS.green} />
              </Text>
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
              <Text style={styles.TitleText}>
                <MaterialCommunityIcons name="web" size={40} color="blue" />
              </Text>
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
              <Entypo name="email" size={35} color="blue" />
            </View>
            <View style={styles.leftSide}>
              <Text
                style={styles.linkText}
                onPress={() => {
                  Clipboard.setString('damyar@breederspatron.ir');
                  ToastAndroid.show('Copied', ToastAndroid.SHORT);
                }}>
                Damyar@BreedersPatron.ir
              </Text>
            </View>
          </View>
          <View style={styles.subSupport}>
            <View style={styles.rightSide}>
              <Entypo name="location-pin" size={50} color={COLORS.btnBack} />
            </View>
            <View style={styles.leftSide}>
              <Text
                style={[
                  styles.linkText,
                  {
                    textDecorationLine: 'none',
                    fontFamily: FONTS.IRAN_EXTRA_BOLD,
                    color: COLORS.btnBack,
                  },
                ]}
                onPress={() =>
                  Linking.openURL(
                    'https://maps.google.com/maps?q=32.315952,54.015876&ll=32.315952,54.015876&z=16',
                  )
                }>
                یزد - اردکان - بلوار شهید سردار سلیمانی 20 متر مانده به میدان
                شهدا گاراژ عدل قدیم
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.sendEmail}>
          {MESSAGES.setMessage('ContactUs')}:
        </Text>
        <View style={styles.forms}>
          <TextInput
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={styles.inputField}
            label={LABELS.setLabel('Name&Family') + '*'}
            placeholder={LABELS.setLabel('Name&Family') + '*'}
            placeholderTextColor={COLORS.silver}
            value={formik.values.fullName}
            onChangeText={formik.handleChange('fullName')}
            onBlur={formik.handleBlur('fullName')}
            returnKeyType="next"
            onSubmitEditing={() => {
              secondTextInput1.focus();
            }}
            blurOnSubmit={false}
          />
          <HelperText
            type="error"
            visible={formik.touched.fullName && formik.errors.fullName}>
            {formik.errors.fullName}
          </HelperText>
          <TextInput
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={styles.inputField}
            label={LABELS.setLabel('Mobile') + '*'}
            placeholder={LABELS.setLabel('Mobile') + '*'}
            placeholderTextColor={COLORS.silver}
            value={formik.values.mobile}
            onChangeText={formik.handleChange('mobile')}
            onBlur={formik.handleBlur('mobile')}
            ref={input => {
              secondTextInput1 = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              secondTextInput2.focus();
            }}
            blurOnSubmit={false}
            keyboardType="number-pad"
          />
          <HelperText
            type="error"
            visible={formik.touched.mobile && formik.errors.mobile}>
            {formik.errors.mobile}
          </HelperText>
          <TextInput
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={styles.inputField}
            label={LABELS.setLabel('Email') + '*'}
            placeholder={LABELS.setLabel('Email') + '*'}
            placeholderTextColor={COLORS.silver}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            ref={input => {
              secondTextInput2 = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              secondTextInput3.focus();
            }}
            blurOnSubmit={false}
            keyboardType="email-address"
          />
          <HelperText
            type="error"
            visible={formik.touched.email && formik.errors.email}>
            {formik.errors.email}
          </HelperText>
          <TextInput
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={styles.inputField}
            multiline={true}
            numberOfLines={10}
            label={LABELS.setLabel('Message') + '*'}
            placeholder={LABELS.setLabel('Message') + '*'}
            placeholderTextColor={COLORS.silver}
            value={formik.values.message}
            onChangeText={formik.handleChange('message')}
            onBlur={formik.handleBlur('message')}
            ref={input => {
              secondTextInput3 = input;
            }}
          />
          <HelperText
            type="error"
            visible={formik.touched.message && formik.errors.message}>
            {formik.errors.message}
          </HelperText>

          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => formik.resetForm()}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? COLORS.btnCancelPress
                    : COLORS.btnCancel,
                  flex: 1,
                },

                styles.loginBtn,
              ]}>
              <Text
                style={{
                  color: COLORS.txt,
                  fontSize: 18,
                  fontFamily: FONTS.IRAN_BOLD,
                }}>
                {LABELS.setLabel('Cancel')}
              </Text>
            </Pressable>
            <Pressable
              onPress={formik.handleSubmit}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? COLORS.btnConfirmPress
                    : COLORS.btnConfirm,
                  flex: 2,
                },

                styles.loginBtn,
              ]}>
              <Text
                style={{
                  color: COLORS.txt,
                  fontSize: 18,
                  fontFamily: FONTS.IRAN_BOLD,
                }}>
                {LABELS.setLabel('Save')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  support: {
    backgroundColor: 'white',
    flex: 1,
    flexGrow: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.silver,
    paddingTop: 25,
    borderRadius: 10,
    paddingBottom: 20,
  },
  subSupport: {flexDirection: 'row', marginTop: 15, alignItems: 'center'},
  forms: {
    flex: 2,
    //backgroundColor: 'black',
    flexGrow: 2,
    width: '100%',

    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  leftSide: {alignItems: 'flex-end', flex: 2},
  rightSide: {
    alignItems: 'center',
    flex: 0.5,
    paddingRight: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    //backgroundColor: 'green',
    padding: 10,
    paddingTop: 0,
  },
  logo: {
    width: 200,
    height: 200,
  },
  loginBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,

    marginTop: 15,
  },
  TitleText: {
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 17,
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
  inputField: {
    borderRadius: 7,

    backgroundColor: COLORS.white,
    borderColor: COLORS.onPrimaryColor,
    marginBottom: 5,
  },
  txtError: {
    color: COLORS.txtError,
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 17,
  },
  sendEmail: {
    fontFamily: FONTS.IRAN_EXTRA_BOLD,

    paddingBottom: 20,
    fontSize: 13,

    paddingTop: 20,
  },
});
