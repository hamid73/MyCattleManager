import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {login} from './../../../redux/features/authSlice';
import {useToast} from 'react-native-toast-notifications';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';

import Spinner from 'react-native-loading-spinner-overlay';
import * as LocalAuthentication from 'expo-local-authentication';
import {COLORS, FONTS, ROUTES} from '../../../constants';
const FormInput = ({navigation}) => {
  const {loading, error, user} = useSelector(state => ({...state.auth}));

  // console.log(token);
  const toast = useToast();
  const dispatch = useDispatch();
  // wherever the useState is located
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const LocalAuthenticationOptions = {
    promptMessage: 'ورود با اثر انگشت',
    cancelLabel: 'انصراف',
    disableDeviceFallback: true,
    fallbackLabel: 'غیر فعال کردن',
    requireConfirmation: true,
  };

  const handleBiometricAuth = async () => {
    const isBiometricAvilable = await LocalAuthentication.hasHardwareAsync();
    if (!isBiometricAvilable)
      return Alert.alert(
        'لطفا با نام کاربری و پسورد وارد شوید',
        'اثر انگشتی در دستگاه شما یافت نشد',
        'باشه',
        () => fallBackToDefaultAuth(),
      );
    let supportedBiometric;
    if (isBiometricSupported)
      supportedBiometric =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return Alert.alert(
        'اثر انگشتی برای گوشی شما ذخیره نشده است',
        'لطفا با نام کاربی و پسورد وارد شوید',
        'باشه',
        () => fallBackToDefaultAuth(),
      );
    const biometricAuth = await LocalAuthentication.authenticateAsync(
      LocalAuthenticationOptions,
    );
    if (biometricAuth.success) {
      navigation.replace(ROUTES.HOME);
    }
  };

  const formik = useFormik({
    initialValues: {mobile: '', password: ''},
    validationSchema: Yup.object({
      mobile: Yup.string().required('برای ورود شماره موبایل الزامی می باشد'),
      password: Yup.string().required('برای ورود پسورد الزامی میباشد'),
    }),
    onSubmit: async formValue => {
      dispatch(login({formValue, navigation, toast}));
    },
  });

  useEffect(() => {
    error && toast.show(error, {type: 'danger'});
  }, [error]);
  return (
    <>
      <View style={{padding: 15, flex: 1, direction: 'rtl'}}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="موبایل"
            placeholderTextColor={COLORS.placeHolder}
            value={formik.values.mobile}
            onChangeText={formik.handleChange('mobile')}
            onBlur={formik.handleBlur('mobile')}
            autoCapitalize="none"
          />
        </View>
        {formik.touched.mobile && formik.errors.mobile ? (
          <Text style={styles.txtError}>{formik.errors.mobile}</Text>
        ) : null}
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.placeHolder}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            autoCorrect={false}
            placeholder="پسورد"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.txtError}>{formik.errors.password}</Text>
        ) : null}
        <View style={{flexDirection: 'row'}}>
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
            ]}
            disabled={loading && !loading}>
            <Spinner visible={loading} />
            <Text
              style={{
                color: COLORS.txt,
                fontSize: 18,
                fontFamily: FONTS.IRAN_BOLD,
              }}>
              ورود
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLORS.btnBack : COLORS.btnBackPress,
                flex: 1,
              },

              styles.loginBtn,
            ]}
            disabled={loading && !loading}>
            <Text
              style={{
                color: COLORS.txt,
                fontSize: 18,
                fontFamily: FONTS.IRAN_BOLD,
              }}>
              ثبت نام
            </Text>
          </Pressable>
        </View>
        {user?.token && isBiometricSupported && (
          <View style={{alignItems: 'center', padding: 20}}>
            <Pressable
              style={{alignItems: 'center'}}
              onPress={handleBiometricAuth}>
              <Ionicons name="finger-print" size={44} color={COLORS.icons} />
              <Text
                style={{
                  fontFamily: FONTS.IRAN_BOLD,
                  marginTop: 10,
                  color: COLORS.txt,
                }}>
                ورود با اثر انگشت
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 7,
    padding: 17,
    backgroundColor: COLORS.inputFieldBackGround,
    marginBottom: 15,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.inputFieldText,
  },
  loginBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  txtError: {
    color: COLORS.txtError,
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 17,
  },
});
