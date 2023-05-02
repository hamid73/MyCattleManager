import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddEditCattele,
  AddEditEventsScreen,
  AddEditMilkScreen,
  PaymentScreenMyket,
  SignInScreen,
} from '../src/screen';
import {COLORS, FONTS, LABELS, ROUTES} from '../src/constants';
import DrawerNavigator from './DrawerNavigator';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import TopTabActionNavigator from './TopTabActionNavigator';
import TopTabSetting from './TopTabSetting';

const Stack = createNativeStackNavigator();
function AuthNavigator({navigation}) {
  const [backgroundColor, setBackgroundColor] = useState(COLORS.headerColor);
  const fa = true;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.txt,
        headerTitleStyle: {
          fontFamily: FONTS.IRAN_EXTRA_BOLD,
        },
        headerShown: false,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: backgroundColor,
          paddingTop: StatusBar.currentHeight,
        },
        headerTitleAlign: 'center',
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={SignInScreen} />
      <Stack.Screen
        options={{
          title: 'مدیریت دام ها',
          headerShown: false,
        }}
        name={ROUTES.HOME}
        component={DrawerNavigator}
      />
      <Stack.Screen
        options={{
          title: LABELS.setLabel('AddCattle'),
          headerShown: true,
        }}
        name={ROUTES.ADD_EDIT_CATTELE}
        component={AddEditCattele}
      />
      <Stack.Screen
        options={{
          title: LABELS.setLabel('AddMilk'),
          headerShown: true,
          headerStyle: {backgroundColor: COLORS.btnBack},
        }}
        name={ROUTES.ADD_EDIT_Milk}
        component={AddEditMilkScreen}
      />

      <Stack.Screen
        options={{
          title: LABELS.setLabel('ViewCattle'),
          headerShown: true,
        }}
        name={ROUTES.VIEWRECORDTAB}
        component={TopTabActionNavigator}
        initialParams={{setBackgroundColor: setBackgroundColor}}
      />

      <Stack.Screen
        options={{
          title: LABELS.setLabel('AddEvents'),
          headerShown: true,
        }}
        name={ROUTES.ADDEVENTS}
        component={AddEditEventsScreen}
      />
      <Stack.Screen
        options={{
          title: LABELS.setLabel('PaymentPermium'),
          headerTitleStyle: {fontFamily: FONTS.IRAN_BOLD},
          headerTintColor: COLORS.white,

          headerShown: true,
          headerStyle: {
            backgroundColor: '#43cea2',
          },
        }}
        name={ROUTES.PAYMENT}
        component={PaymentScreenMyket}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
