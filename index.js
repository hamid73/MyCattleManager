/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  configureFonts,
  Provider as PaperProvider,
  MD2LightTheme,
  MD3LightTheme,
  useTheme,
} from 'react-native-paper';

import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS, FONTS} from './src/constants';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
const fontConfig = {
  android: {
    regular: {
      fontFamily: FONTS.IRAN_REGULAR,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: FONTS.IRAN_BOLD,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: FONTS.IRAN_LIGHT,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: FONTS.IRAN_REGULAR,
      fontWeight: 'normal',
    },
  },
};
const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({
    config: fontConfig,
    isV3: false,
  }),
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primaryColor,
    onPrimary: COLORS.onPrimaryColor,

    outline: COLORS.onPrimaryColor,
    outlineVariant: COLORS.onPrimaryColor,
    secondary: COLORS.secondary,
    onSecondary: COLORS.onSecondary,
    text: COLORS.black,
    error: COLORS.error,
    onError: COLORS.onError,
    tertiary: COLORS.tertiary,
    onTertiary: COLORS.onTertiary,
  },
};

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ToastProvider
          dangerIcon={<AntDesign name="closecircleo" size={24} color="#fff" />}
          warningIcon={<AntDesign name="warning" size={24} color="#fff" />}
          successIcon={<Feather name="check-square" size={24} color="#fff" />}
          duration={3000}
          animationType="zoom-in"
          animationDuration={250}
          swipeEnabled={true}
          textStyle={{fontSize: 15, fontFamily: FONTS.IRAN_BOLD}}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
