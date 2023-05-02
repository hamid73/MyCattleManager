import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  SettingScreen,
  AboutUsScreen,
  LearnScreen,
  SupportScreen,
} from '../src/screen';
import {COLORS, FONTS, LABELS, ROUTES} from '../src/constants';
import BottomTabsNavigator from './BottomTabsNavigator';
import {StyleSheet} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import CustomDrawer from '../src/components/navigatore/CustomDrawer';
import {useEffect} from 'react';
import {useState} from 'react';
import {showRewardedAdds} from '../src/utility/adivery';
import TopTabSetting from './TopTabSetting';
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  const [ctrShowAdds, setCounter] = useState(0);
  useEffect(() => {
    if (ctrShowAdds === 3) {
      showRewardedAdds();
      setCounter(0);
    }
  }, [ctrShowAdds]);
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: COLORS.primary,
          drawerActiveTintColor: COLORS.white,
          drawerStyle: {width: 200},
          drawerType: 'slide',
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          listeners={() => ({
            focus: () => {
              setCounter(ctrShowAdds + 1);
            },
          })}
          name={ROUTES.CATTELE}
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
            headerShown: false,
            drawerLabel: LABELS.setLabel('Home'),

            headerTitleStyle: styles.headerTitleStyle,
            drawerLabelStyle: styles.drawerLabelStyle,
          }}
          component={BottomTabsNavigator}
        />
        <Drawer.Screen
          listeners={() => ({
            focus: () => {
              setCounter(ctrShowAdds + 1);
            },
          })}
          options={{
            drawerIcon: ({color}) => (
              <FontAwesome name="graduation-cap" size={24} color={color} />
            ),
            //drawerLabel:  LABELS.setLabel("Learn"),
            title: LABELS.setLabel('Learn'),
            drawerLabelStyle: styles.drawerLabelStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
          name={ROUTES.Learning}
          component={LearnScreen}
        />

        <Drawer.Screen
          listeners={() => ({
            focus: () => {
              setCounter(ctrShowAdds + 1);
            },
          })}
          options={{
            drawerIcon: ({color}) => (
              <Entypo name="info-with-circle" size={24} color={color} />
            ),

            title: LABELS.setLabel('AboutUs'),
            drawerLabelStyle: styles.drawerLabelStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
          name={ROUTES.ABOUT}
          component={AboutUsScreen}
        />
        <Drawer.Screen
          listeners={() => ({
            focus: () => {
              setCounter(ctrShowAdds + 1);
            },
          })}
          options={{
            drawerIcon: ({color}) => (
              <MaterialIcons name="support-agent" size={24} color={color} />
            ),

            title: LABELS.setLabel('Support'),
            drawerLabelStyle: styles.drawerLabelStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
          name={ROUTES.SUPPORT}
          component={SupportScreen}
        />
        <Drawer.Screen
          listeners={() => ({
            focus: () => {
              setCounter(ctrShowAdds + 1);
            },
          })}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="settings" size={24} color={color} />
            ),

            title: LABELS.setLabel('Setting'),
            drawerLabelStyle: styles.drawerLabelStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
          name={ROUTES.SETTING}
          component={TopTabSetting}
        />
      </Drawer.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  drawerLabelStyle: {fontFamily: FONTS.IRAN_BOLD, left: -20},
  headerTitleStyle: {fontFamily: FONTS.IRAN_BOLD},
});

export default DrawerNavigator;
