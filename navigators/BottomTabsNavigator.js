import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  ListOfEventsScreen,
  ListOfMilkingRecordsScreen,
  ListOfTransaction,
} from '../src/screen';
import {COLORS, FONTS, ROUTES, LABELS} from '../src/constants';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import Filteres from '../src/components/navigatore/cattles/Filteres';
import {useDispatch} from 'react-redux';
import {getCattles} from '../src/redux/features/cattleSlice';
import MilkRecordFilter from '../src/components/navigatore/milkRecord/MilkRecordFilter';
import CustomTitleBottomTab from '../src/components/navigatore/CustomTitleBottomTab';
import RequestPAccountModal from '../src/components/modal/RequestPAccountModal';
import {showRewardedAdds} from '../src/utility/adivery';

const Tab = createBottomTabNavigator();

function BottomTabsNavigator({navigation}) {
  const [ctrShowAdds, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const fa = true;

  useEffect(() => {
    console.log(ctrShowAdds);
    if (ctrShowAdds === 4) {
      showRewardedAdds();
      setCounter(0);
    }
  }, [ctrShowAdds]);

  useEffect(() => {
    dispatch(getCattles({type: 'all'}));
  }, []);
  return (
    <>
      <RequestPAccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Tab.Navigator
        screenListeners={{
          state: e => {
            setCounter(ctrShowAdds + 1);
          },
        }}
        initialRouteName={ROUTES.CATTELE_TAB}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: COLORS.activeBottomTabBar,
          tabBarInactiveTintColor: COLORS.inActiveBottomTabBar,
          tabBarStyle: {
            height: 70,
            paddingBottom: 5,
          },
          headerTitle: ({children}) => (
            <CustomTitleBottomTab children={children} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather
                name="menu"
                size={24}
                color={COLORS.gray}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({color, size, focused}) => {
            let iconName;
            let imageSource;

            if (route.name === ROUTES.CATTELE_TAB) {
              imageSource = focused
                ? require('../assets/icons/cow-out-line.png')
                : require('../assets/icons/cow.png');
            } else if (route.name === ROUTES.MILKRECORD) {
              imageSource = focused
                ? require('../assets/icons/milking-out-line.png')
                : require('../assets/icons/milking.png');
            } else if (route.name === ROUTES.EVENTS) {
              imageSource = focused
                ? require('../assets/icons/calendar-out-line.png')
                : require('../assets/icons/calendar.png');
            } else if (route.name === ROUTES.TRANSACTIONS) {
              imageSource = focused
                ? require('../assets/icons/lending-out-line.png')
                : require('../assets/icons/lending.png');
            }

            if (iconName) {
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={50}
                  color={color}
                />
              );
            }
            return (
              <Image source={imageSource} style={{width: 50, height: 50}} />
            );
          },
        })}>
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('Cattles', fa),
            tabBarLabelStyle: styles.tabBarLabelStyle,
            title: LABELS.setLabel('Cattles', fa),
            headerTitleStyle: styles.headerTitleStyle,
            headerRight: () => <Filteres />,
          }}
          name={ROUTES.CATTELE_TAB}
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('MilkRecord', fa),
            tabBarLabelStyle: styles.tabBarLabelStyle,
            title: LABELS.setLabel('Milking', fa),
            headerTitleStyle: styles.headerTitleStyle,
            headerRight: () => <MilkRecordFilter />,
          }}
          name={ROUTES.MILKRECORD}
          component={ListOfMilkingRecordsScreen}
        />

        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('Events', fa),
            tabBarLabelStyle: styles.tabBarLabelStyle,
            title: LABELS.setLabel('Events', fa),
            headerTitleStyle: styles.headerTitleStyle,
          }}
          name={ROUTES.EVENTS}
          component={ListOfEventsScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('Transactions', fa),
            tabBarLabelStyle: styles.tabBarLabelStyle,
            title: LABELS.setLabel('Transactions', fa),
            headerTitleStyle: styles.headerTitleStyle,
          }}
          name={ROUTES.TRANSACTIONS}
          component={ListOfTransaction}
        />
      </Tab.Navigator>
    </>
  );
}

export default BottomTabsNavigator;

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: FONTS.IRAN_BOLD,
  },
  headerTitleStyle: {
    fontFamily: FONTS.IRAN_BOLD,
    color: COLORS.gray,
  },
});
