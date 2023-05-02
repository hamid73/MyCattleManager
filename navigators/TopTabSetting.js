import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SettingScreen, UserInfoScreen} from '../src/screen';
import {COLORS, FONTS, LABELS, ROUTES} from '../src/constants';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function TopTabSetting({route}) {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.gray,
          headerShown: false,
          tabBarPressColor: COLORS.black,

          tabBarStyle: {
            backgroundColor: COLORS.tabSettingColor,
          },
          tabBarItemStyle: {borderWidth: 1, borderColor: COLORS.white},
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('LoginInfo'),
            tabBarLabelStyle: styles.tabLabel,
          }}
          name={ROUTES.LOGININFO}
          component={SettingScreen}
          //initialParams={cattles}
        />
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('BreedersInfo'),
            tabBarLabelStyle: styles.tabLabel,
          }}
          name={ROUTES.BREEDERSINFO}
          //initialParams={cattles}
          component={UserInfoScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('GroupsInfo'),
            tabBarLabelStyle: styles.tabLabel,
          }}
          name={ROUTES.GROUPSINFO}
          //initialParams={cattles}
          component={UserInfoScreen}
        />
      </Tab.Navigator>
    </>
  );
}

export default TopTabSetting;

const styles = StyleSheet.create({
  txtStyle: {fontFamily: FONTS.IRAN_REGULAR, color: COLORS.black},
  tabLabel: {
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 15,
  },
  header: {
    height: 150,

    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 100,
  },
  plaque: {
    fontFamily: FONTS.IRAN_BOLD,
    fontSize: 25,

    marginRight: 5,
  },
  sexStyle: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  menuPosition: {
    position: 'absolute',
    top: 8,
    borderRadius: 20,
    right: -8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
