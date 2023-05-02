import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {HelperText, Switch, TextInput, useTheme} from 'react-native-paper';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../../constants';
import {useFormik} from 'formik';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';
import {
  encryptPassword,
  getDataStorage,
  setDataStorage,
  toEnglishDigits,
} from '../../../utility';

const SettingScreen = () => {
  const theme = useTheme();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      help: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(MESSAGES.setMessage('PasswordRequired')),
      confirmPassword: Yup.string()
        .required(MESSAGES.setMessage('ConfirmPassRequired'))
        .oneOf(
          [Yup.ref('password'), null],
          MESSAGES.setMessage('IncorrectPass'),
        ),
    }),
    onSubmit: async formValue => {
      enPassword = toEnglishDigits(formValue.password.trim(' '));
      const pw = encryptPassword(enPassword);
      setDataStorage('Password', pw);
      if (formValue.help) {
        setDataStorage('help', formValue.help);
      }
      toast.show(MESSAGES.setMessage('SavedSuccessfuly'), {
        type: 'success',
      });
      setDataStorage('loginIsActive', isLogedIn.toString());
      formik.resetForm();
    },
  });

  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const [isFingerPrint, setIsFingerPrint] = React.useState(false);
  useEffect(() => {
    var regexPattern = new RegExp('true');
    async function setDataFingerPrint() {
      const finger = await getDataStorage('fingerPrintIsActive');
      if (finger) {
        setIsFingerPrint(regexPattern.test(finger));
      }
    }
    setDataFingerPrint();
    async function setDataLogin() {
      const login = await getDataStorage('loginIsActive');
      if (login) {
        setIsLogedIn(regexPattern.test(login));
      }
    }
    setDataLogin();
  }, []);

  useEffect(() => {
    if (!isLogedIn) {
      setDataStorage('loginIsActive', isLogedIn.toString());
    }
    formik.resetForm();
  }, [isLogedIn]);

  useEffect(() => {
    setDataStorage('fingerPrintIsActive', isFingerPrint.toString());
  }, [isFingerPrint]);

  const onToggleSwitch = () => setIsLogedIn(!isLogedIn);
  const onFingerSwitch = () => setIsFingerPrint(!isFingerPrint);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.activeView,
          {borderBottomWidth: 0.5, borderColor: 'silver', paddingBottom: 10},
        ]}>
        <Text
          style={styles.TitleText}
          onPress={() => setIsFingerPrint(!isFingerPrint)}>
          {LABELS.setLabel('ActiveLogin')}
        </Text>
        <Switch
          value={isFingerPrint}
          onValueChange={onFingerSwitch}
          color={COLORS.btnConfirm}
        />
      </View>
      <View style={styles.activeView}>
        <Text style={styles.TitleText} onPress={() => setIsLogedIn(!isLogedIn)}>
          فعال سازی کلمه عبور هنگام ورود
        </Text>
        <Switch
          value={isLogedIn}
          onValueChange={onToggleSwitch}
          color={COLORS.btnConfirm}
        />
      </View>

      <View style={styles.forms}>
        <View
          style={[styles.disableView, {display: isLogedIn ? 'none' : 'flex'}]}
        />
        <TextInput
          mode="outlined"
          outlineColor={theme.colors.onPrimary}
          activeOutlineColor={theme.colors.primary}
          style={styles.inputField}
          label={LABELS.setLabel('Password') + '*'}
          placeholder={LABELS.setLabel('Password') + '*'}
          placeholderTextColor={COLORS.silver}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          returnKeyType="next"
          onSubmitEditing={() => {
            secondTextInput1.focus();
          }}
          blurOnSubmit={false}
        />
        {formik.touched.password && formik.errors.password && (
          <HelperText type="error" visible={formik.errors.password}>
            {formik.errors.password}
          </HelperText>
        )}

        <TextInput
          mode="outlined"
          outlineColor={theme.colors.onPrimary}
          activeOutlineColor={theme.colors.primary}
          style={styles.inputField}
          label={LABELS.setLabel('ConfirmPassword') + '*'}
          placeholder={LABELS.setLabel('ConfirmPassword') + '*'}
          placeholderTextColor={COLORS.silver}
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          ref={input => {
            secondTextInput1 = input;
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            secondTextInput2.focus();
          }}
          blurOnSubmit={false}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <HelperText type="error" visible={formik.errors.confirmPassword}>
            {formik.errors.confirmPassword}
          </HelperText>
        )}
        <TextInput
          mode="outlined"
          outlineColor={theme.colors.onPrimary}
          activeOutlineColor={theme.colors.primary}
          style={styles.inputField}
          label={LABELS.setLabel('Hint')}
          placeholder={LABELS.setLabel('Hint')}
          placeholderTextColor={COLORS.silver}
          value={formik.values.help}
          onChangeText={formik.handleChange('help')}
          onBlur={formik.handleBlur('help')}
          ref={input => {
            secondTextInput2 = input;
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            secondTextInput3.focus();
          }}
          blurOnSubmit={false}
        />

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
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  forms: {
    //backgroundColor: 'black',

    width: '100%',
  },

  container: {
    alignItems: 'center',
    flexGrow: 1,
    //backgroundColor: 'green',
    padding: 10,
    paddingTop: 15,
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
    fontSize: 15,
  },
  detText: {
    fontFamily: FONTS.IRAN_REGULAR,
    fontSize: 16,
  },

  inputField: {
    borderRadius: 7,
    backgroundColor: COLORS.white,
    borderColor: COLORS.onPrimaryColor,
    marginBottom: 10,
  },
  txtError: {
    color: COLORS.txtError,
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 17,
  },

  disableView: {
    width: '110%',
    height: '105%',
    opacity: 0.4,
    position: 'absolute',
    backgroundColor: 'silver',
    zIndex: 100,
    left: -10,
  },
  activeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
});
