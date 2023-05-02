import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ROUTES} from '../../constants';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';
import {getEvents} from '../../redux/features/eventSlice';

import Entypo from 'react-native-vector-icons/dist/Entypo';

import {SetEvent} from '../../components/events';

const ListOfEventsScreen = () => {
  const dispatch = useDispatch();
  const {allEvents, loading} = useSelector(state => ({
    ...state.event,
  }));

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const addEditCatteleHandle = async () => {
    navigation.navigate(ROUTES.ADD_EDIT_CATTELE);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Spinner visible={loading} />

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getEvents());
                setRefreshing(false);
              }}
            />
          }
          keyExtractor={item => item.id}
          data={allEvents}
          renderItem={({item, index}) =>
            SetEvent(item.type, item, {general: true})
          }
        />
      </View>
      <Pressable
        disabled={false}
        cancelable={false}
        //onPress={addEditCatteleHandle}
        style={({pressed}) => [
          {
            position: 'absolute',
            bottom: 15,
            right: 15,
            backgroundColor: pressed
              ? COLORS.btnConfirmPress
              : COLORS.btnConfirmPress,
            padding: 15,
            borderRadius: 30,
          },
        ]}>
        <Entypo name="plus" size={30} color={COLORS.inActiveTabBar} />
      </Pressable>
    </SafeAreaView>
  );
};

export default ListOfEventsScreen;

const styles = StyleSheet.create({
  textFont: {
    fontFamily: FONTS.IRAN_REGULAR,
  },
  titleFont: {
    fontFamily: FONTS.IRAN_BOLD,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.backGround,
    paddingBottom: 20,
    padding: 10,
  },
});
