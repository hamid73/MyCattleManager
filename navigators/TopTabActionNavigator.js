import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {EventsScreen, ViewRecordScreen} from '../src/screen';
import {COLORS, FONTS, LABELS, MESSAGES, ROUTES} from '../src/constants';
import {Image, LogBox, StyleSheet, Text, View} from 'react-native';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import {SetIcon} from '../src/constants/setIcon';
import {Button, Menu} from 'react-native-paper';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import ChangeStage from '../src/components/modal/ChangeStage';
import ArchiveModal from '../src/components/modal/ArchiveModal';
import {archiveCattle, deleteCattle} from '../src/redux/features/cattleSlice';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {deleteArchiveEvent} from '../src/redux/features/eventSlice';
import AlertMessage from '../src/components/AlertMessage';
import ChangeStatus from '../src/components/modal/ChangeStatus';
import RequestPAccountModal from '../src/components/modal/RequestPAccountModal';
import {showRewardedAdds} from '../src/utility/adivery';
const Tab = createMaterialTopTabNavigator();

function TopTabActionNavigator({route}) {
  const {cattles} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [modalStatusVisible, setModalStatusVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [modalArchiveVisible, setModalArchiveVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [ctrShowAdds, setCounter] = useState(0);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  useEffect(() => {
    route.params.setBackgroundColor &&
      route.params.setBackgroundColor(
        cattles.sex ? COLORS.feMaleColor : COLORS.maleColor,
      );
  }, []);

  const handleEdit = async () => {
    if (ctrShowAdds === 3) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        navigation.navigate(ROUTES.ADD_EDIT_CATTELE, cattles);
        setVisible(false);
      } else {
        setPremiumModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      navigation.navigate(ROUTES.ADD_EDIT_CATTELE, cattles);
      setVisible(false);
    }
  };

  const handleAddEvent = async () => {
    if (ctrShowAdds === 3) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        navigation.navigate(ROUTES.ADDEVENTS, {cattles});
        setVisible(false);
      } else {
        setPremiumModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      navigation.navigate(ROUTES.ADDEVENTS, {cattles});
      setVisible(false);
    }
  };

  const handleConvert = async () => {
    if (ctrShowAdds === 3) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        setModalVisible(true);
        setVisible(false);
      } else {
        setPremiumModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      setModalVisible(true);
      setVisible(false);
    }
  };

  const handleChangeStatus = async () => {
    if (ctrShowAdds === 3) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        setModalStatusVisible(true);
        setVisible(false);
      } else {
        setPremiumModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      setModalStatusVisible(true);
      setVisible(false);
    }
  };

  const handleRegWeighed = async () => {
    if (ctrShowAdds === 2) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        navigation.navigate(ROUTES.VIEWRECORDTAB, {cattles});
        setVisible(false);
      } else {
        setPremiumModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      navigation.navigate(ROUTES.VIEWRECORDTAB, {cattles});
      setVisible(false);
    }
  };

  const handleExport = async () => {
    if (ctrShowAdds === 2) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        navigation.navigate(ROUTES.VIEWRECORDTAB, {cattles});
        setVisible(false);
      } else {
        setPremiumModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      navigation.navigate(ROUTES.VIEWRECORDTAB, {cattles});
      setVisible(false);
    }
  };

  const handleArchive = async () => {
    if (ctrShowAdds === 2) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
      } else {
        setPremiumModalVisible(true);
        return;
      }
    } else {
      setCounter(ctrShowAdds + 1);
    }
    if (cattles.archive) {
      dispatch(
        archiveCattle({
          id: cattles.id,
          archive: false,
          toast,
          navigation,
        }),
      );
      dispatch(deleteArchiveEvent({cattleId: cattles.id}));
    } else {
      setModalArchiveVisible(true);
    }
    setVisible(false);
  };

  const handleDelete = async () => {
    if (ctrShowAdds === 2) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        setAlertModalVisible(true);
        setVisible(false);
      } else {
        setPremiumModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      setAlertModalVisible(true);
      setVisible(false);
    }
  };

  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: cattles.sex
              ? COLORS.feMaleColor
              : COLORS.maleColor,
          },
        ]}>
        <RequestPAccountModal
          modalVisible={premiumModalVisible}
          setModalVisible={setPremiumModalVisible}
        />
        <AlertMessage
          key={cattles.id}
          modalVisible={alertModalVisible}
          setModalVisible={setAlertModalVisible}
          title={LABELS.setLabel('DeletedCattle')}
          message={MESSAGES.setMessage('DeletedCattle')}
          buttons={[
            {text: LABELS.setLabel('No')},
            {
              text: LABELS.setLabel('Yes'),
              func: () => {
                dispatch(deleteCattle({id: cattles.id, toast, navigation}));
              },
              styles: {color: COLORS.red},
            },
          ]}
          android={{
            title: {fontFamily: FONTS.IRAN_BOLD},
            message: {fontFamily: FONTS.IRAN_REGULAR},
          }}
          Icon={<MaterialIcons name="dangerous" size={34} color={COLORS.red} />}
        />
        <ChangeStage
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          inputValue={{sex: cattles.sex, cattleId: cattles.id}}
        />
        <ChangeStatus
          modalVisible={modalStatusVisible}
          setModalVisible={setModalStatusVisible}
          id={cattles.id}
        />
        <ArchiveModal
          modalVisible={modalArchiveVisible}
          setModalVisible={setModalArchiveVisible}
          cattleId={cattles.id}
          plaque={cattles.plaque}
        />
        <Image
          style={styles.logo}
          source={SetIcon(cattles.cattleStage, cattles.sex)}
        />
        <View style={styles.sexStyle}>
          <Text
            style={[
              styles.plaque,
              {color: cattles.sex ? COLORS.icons : COLORS.white},
            ]}>
            {cattles.plaque}
          </Text>
          <Foundation
            name={cattles.sex ? 'male-symbol' : 'female-symbol'}
            size={35}
            color={cattles.sex ? COLORS.icons : COLORS.white}
          />
        </View>
        <View style={styles.menuPosition}>
          <Menu
            key={cattles.id}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu}>
                <Entypo name="dots-three-vertical" size={20} color="white" />
              </Button>
            }>
            <Menu.Item
              leadingIcon="update"
              titleStyle={styles.txtStyle}
              onPress={handleEdit}
              title={LABELS.setLabel('Update')}
            />
            <Menu.Item
              leadingIcon={SetIcon('event')}
              titleStyle={styles.txtStyle}
              onPress={handleAddEvent}
              title={LABELS.setLabel('AddEvents')}
            />
            <Menu.Item
              leadingIcon={SetIcon('convert')}
              titleStyle={styles.txtStyle}
              onPress={handleConvert}
              title={LABELS.setLabel('ChangeStage')}
            />
            {cattles.sex === 1 && (
              <Menu.Item
                leadingIcon={SetIcon('Status')}
                titleStyle={styles.txtStyle}
                onPress={handleChangeStatus}
                title={LABELS.setLabel('ChangeStatus')}
              />
            )}
            <Menu.Item
              leadingIcon="weight"
              titleStyle={styles.txtStyle}
              onPress={handleRegWeighed}
              title={LABELS.setLabel('WeightRep')}
              disabled
            />
            <Menu.Item
              leadingIcon="export"
              titleStyle={styles.txtStyle}
              onPress={handleExport}
              title={LABELS.setLabel('Pdf')}
              disabled
            />
            <Menu.Item
              leadingIcon={cattles.archive ? SetIcon('unarchive') : 'archive'}
              titleStyle={styles.txtStyle}
              onPress={handleArchive}
              title={
                cattles.archive
                  ? LABELS.setLabel('UnArchive')
                  : LABELS.setLabel('Archive')
              }
            />
            <Menu.Item
              leadingIcon="delete"
              titleStyle={styles.txtStyle}
              onPress={handleDelete}
              title={LABELS.setLabel('Delete')}
            />
          </Menu>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.activeTabBar,
          tabBarInactiveTintColor: COLORS.inActiveTabBar,
          headerShown: false,
          tabBarPressColor: COLORS.black,

          tabBarStyle: {
            backgroundColor: cattles.sex
              ? COLORS.feMaleColor
              : COLORS.maleColor,
          },
          tabBarItemStyle: {borderWidth: 1, borderColor: COLORS.white},
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('Details'),
            tabBarLabelStyle: styles.tabLabel,
          }}
          name={ROUTES.VIEWRECORD}
          component={ViewRecordScreen}
          initialParams={cattles}
        />
        <Tab.Screen
          options={{
            tabBarLabel: LABELS.setLabel('Events'),
            tabBarLabelStyle: styles.tabLabel,
          }}
          name={ROUTES.FLOCK}
          initialParams={cattles}
          component={EventsScreen}
        />
      </Tab.Navigator>
    </>
  );
}

export default TopTabActionNavigator;

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
