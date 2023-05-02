import {
  RefreshControl,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  LogBox,
} from 'react-native';
import React, {useState} from 'react';

import Entypo from 'react-native-vector-icons/dist/Entypo';

import {COLORS, FONTS, ROUTES} from '../../constants';

import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import Catteles from '../../components/home/Catteles';
import {useDispatch, useSelector} from 'react-redux';
import {getCattles} from '../../redux/features/cattleSlice';

import {useEffect} from 'react';
import {showRewardedAdds} from '../../utility/adivery';
import RequestPAccountModal from '../../components/modal/RequestPAccountModal';
const HomeScreen = () => {
  LogBox.ignoreLogs(['Require cycle']);

  const [ctrShowAdds, setCounter] = useState(0);

  const dispatch = useDispatch();
  const {cattles, loading} = useSelector(state => ({
    ...state.cattle,
  }));

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const addEditCatteleHandle = async () => {
    if (ctrShowAdds === 2) {
      const resAdd = await showRewardedAdds();
      if (resAdd) {
        setCounter(0);
        navigation.navigate(ROUTES.ADD_EDIT_CATTELE);
      } else {
        setModalVisible(true);
      }
    } else {
      setCounter(ctrShowAdds + 1);
      navigation.navigate(ROUTES.ADD_EDIT_CATTELE);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RequestPAccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={{paddingTop: 8}}>
        <Spinner visible={loading} />

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getCattles({type: 'all'}));
                setRefreshing(false);
              }}
            />
          }
          keyExtractor={item => item.id}
          data={cattles}
          style={{paddingBottom: 80}}
          renderItem={({item, index}) => (
            <Catteles key={index} cattles={item} />
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
            backgroundColor: pressed
              ? COLORS.btnConfirmPress
              : COLORS.btnConfirm,
            padding: 15,
            borderRadius: 30,
          },
        ]}>
        <Entypo name="plus" size={30} color={COLORS.inActiveTabBar} />
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputField: {
    margin: 7,
    borderRadius: 7,
    padding: 17,
    backgroundColor: COLORS.inputFieldBackGround,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.inputFieldText,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backGround,
  },
});
