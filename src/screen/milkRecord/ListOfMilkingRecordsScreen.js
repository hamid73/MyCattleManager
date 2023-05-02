import {
  RefreshControl,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  LogBox,
  Text,
} from 'react-native';
import React, {useState} from 'react';

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';

import {COLORS, FONTS, LABELS, MESSAGES, ROUTES} from '../../constants';

import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteMilkRecord,
  getMilkingRecords,
} from '../../redux/features/milkRecordSlice';
import {useEffect} from 'react';
import MilkRecordItem from '../../components/milking/listItem/MilkRecordItem';
import AlertMessage from '../../components/AlertMessage';
import {useToast} from 'react-native-toast-notifications';
import {showRewardedAdds} from '../../utility/adivery';
import RequestPAccountModal from '../../components/modal/RequestPAccountModal';
const ListOfMilkingRecordsScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {milkRecords, loading} = useSelector(state => ({
    ...state.milkRecord,
  }));
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [milkingRecordId, setMilkingRecordId] = useState(false);
  const [ctrShowAdds, setCounter] = useState(0);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    console.log(milkRecords);
  }, [milkRecords]);

  const [modalVisible, setModalVisible] = useState(false);
  const addEditCatteleHandle = async () => {
    if (ctrShowAdds === 2) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        navigation.navigate(ROUTES.ADD_EDIT_Milk);
      } else {
        setModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      navigation.navigate(ROUTES.ADD_EDIT_Milk);
    }
  };
  useEffect(() => {
    dispatch(getMilkingRecords());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <RequestPAccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <AlertMessage
        key={milkingRecordId}
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        title={LABELS.setLabel('DeletingMilkingRecord')}
        message={MESSAGES.setMessage('DeletingMilkingRecord')}
        buttons={[
          {text: LABELS.setLabel('No')},
          {
            text: LABELS.setLabel('Yes'),
            func: () => {
              dispatch(deleteMilkRecord({id: milkingRecordId, toast}));
            },
            styles: {color: COLORS.red},
          },
        ]}
        android={{
          title: {fontFamily: FONTS.IRAN_BOLD, fontSize: 18},
          message: {fontFamily: FONTS.IRAN_REGULAR},
        }}
        ios={{
          title: {fontFamily: FONTS.IRAN_BOLD, fontSize: 18},
          message: {fontFamily: FONTS.IRAN_REGULAR},
        }}
        Icon={<MaterialIcons name="dangerous" size={34} color={COLORS.red} />}
      />
      <View>
        <Spinner visible={loading} />

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getMilkingRecords());
                setRefreshing(false);
              }}
            />
          }
          keyExtractor={item => item && item.id}
          data={milkRecords}
          renderItem={({item, index}) => (
            <MilkRecordItem
              milkingData={item}
              key={index}
              setMilkingRecordId={setMilkingRecordId}
              setAlertModalVisible={setAlertModalVisible}
            />
          )}
        />
      </View>
      <Pressable
        onPress={addEditCatteleHandle}
        style={({pressed}) => [
          {
            position: 'absolute',
            bottom: 15,
            right: 15,
            backgroundColor: pressed ? COLORS.btnBackPress : COLORS.btnBack,
            padding: 15,
            borderRadius: 30,
          },
        ]}>
        <Entypo name="plus" size={30} color={COLORS.inActiveTabBar} />
      </Pressable>
    </SafeAreaView>
  );
};

export default ListOfMilkingRecordsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backGround,
    paddingBottom: 20,
    padding: 10,
  },
});
