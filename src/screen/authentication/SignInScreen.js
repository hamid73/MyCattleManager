import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, ICONS, LABELS, MESSAGES, ROUTES} from '../../constants';
import {HelperText, Switch, TextInput, useTheme} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {decryptPassword, getDataStorage, setDataStorage} from '../../utility';
import {useToast} from 'react-native-toast-notifications';

const SignIn = ({navigation: {replace}}) => {
  const theme = useTheme();
  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const onToggleSwitch = () => setIsLogedIn(!isLogedIn);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(MESSAGES.setMessage('PasswordRequired')),
    }),
    onSubmit: async formValue => {
      const CurrentPassword = await getDataStorage('Password');
      pw = decryptPassword(CurrentPassword);
      if (formValue.password === pw) {
        replace(ROUTES.HOME);
        setDataStorage('AlwaysLogin', isLogedIn.toString());
        toast.show(LABELS.setLabel('Welcome'), {
          type: 'success',
        });
      } else {
        toast.show(MESSAGES.setMessage('IncorrectPassword'), {
          type: 'danger',
        });
      }
      formik.resetForm();
    },
  });

  const getStatusLogin = async () => {
    const state = await getDataStorage('AlwaysLogin');
    var regexPattern = new RegExp('true');
    const check = regexPattern.test(state);
    if (check) {
      replace(ROUTES.LOGIN);
    }
  };

  const [login, setLogin] = useState(false);

  useEffect(() => {
    async function getStatusLogin() {
      const state = await getDataStorage('AlwaysLogin');
      var regexPattern = new RegExp('true');
      setLogin(regexPattern.test(state));
    }
    getStatusLogin();
  }, []);

  useEffect(() => {
    if (login) {
      replace(ROUTES.HOME);
    }
  }, [login]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1.5}}>
          <View style={styles.brandLogo}>
            <View style={styles.logo}>
              <Image source={ICONS.logo} style={{width: 180, height: 180}} />
            </View>
            <Text style={styles.welcomeStyle}>دامیار (مدیریت گاوداری)</Text>
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            padding: 10,
          }}>
          <View style={styles.form}>
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
            />

            <Pressable style={styles.btnLogin} onPress={formik.handleSubmit}>
              <AntDesign name="arrowleft" size={40} color={COLORS.silver} />
            </Pressable>
          </View>
          <HelperText
            type="error"
            visible={formik.touched.password && formik.errors.password}>
            {formik.errors.password}
          </HelperText>
          <View style={styles.activeView}>
            <Text
              style={styles.TitleText}
              onPress={() => setIsLogedIn(!isLogedIn)}>
              {LABELS.setLabel('RemmemberMe')}
            </Text>
            <Switch
              value={isLogedIn}
              onValueChange={onToggleSwitch}
              color={COLORS.btnConfirm}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.primary,
  },
  btnLogin: {
    borderWidth: 1,
    borderColor: COLORS.btnConfirmPress,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 8,
    width: 60,
    height: 58,
    marginLeft: 2,
    alignItems: 'center',
  },
  brandLogo: {flex: 0.7, alignItems: 'center', justifyContent: 'center'},
  logo: {
    backgroundColor: COLORS.txt,
    borderRadius: 120,
    padding: 30,
    alignItems: 'center',
  },
  welcomeStyle: {
    fontSize: 28,
    color: COLORS.white,
    fontFamily: FONTS.IRAN_EXTRA_BOLD,
    marginTop: 30,
  },
  inputField: {
    borderRadius: 7,
    flexGrow: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.onPrimaryColor,
    marginBottom: 5,
  },
  form: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  TitleText: {
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 18,
    color: 'white',
  },
  activeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

    paddingLeft: 20,
  },
});
