import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {COLORS, FONTS, LABELS} from '../../../constants';
import {Button, Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {searchCattle} from '../../../redux/features/cattleSlice';
import CustomDropDown from '../../CustomDropDown';
import * as GetData from '../../../constants/data';
const MilkRecordFilter = () => {
  const [visable, setVisable] = useState('none');

  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const [visibleTypeMenu, seVisibleTypeMenu] = useState(false);
  const openTypeMenu = () => seVisibleTypeMenu(true);
  const closeLangMenu = () => seVisibleTypeMenu(false);
  const searchHandle = e => {
    dispatch(searchCattle({value: e}));
  };

  const dispatch = useDispatch();
  return (
    <View
      style={{
        paddingRight: 20,
        paddingLeft: 10,
        width: 250,
        flexDirection: 'row-reverse',
        alignItems: 'center',
      }}>
      <Menu
        visible={visibleTypeMenu}
        onDismiss={closeLangMenu}
        anchorPosition={'bottom'}
        contentStyle={{width: 150}}
        anchor={
          <TouchableOpacity
          // onPress={openTypeMenu}
          >
            <Entypo name="dots-three-vertical" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        }>
        <Menu.Item
          titleStyle={styles.txtStyle}
          onPress={() => {
            setLanguge(true);
            seVisibleTypeMenu(false);
          }}
          title={LABELS.setLabel('Pdf')}
        />
        <CustomDropDown
          placeholder={LABELS.setLabel('MilkType')}
          data={GetData.milkTypeData}
          pColor={COLORS.silver}
          bgColor={COLORS.silver}
          dropDownBorderColor={COLORS.txt}
          listItemColor={COLORS.white}
          listItemLabelColor={COLORS.black}
          setStyle={{borderWidth: 0, backgroundColor: 'transparent'}}
        />
      </Menu>
      {visable === 'none' ? (
        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',

            justifyContent: 'space-between',
            width: 100,
          }}>
          <TouchableOpacity
            onPress={() => {
              //setVisable("flex");
            }}>
            <Feather name="search" size={24} color={COLORS.gray} />
          </TouchableOpacity>

          <Menu
            visible={visibleMenu}
            onDismiss={closeMenu}
            anchorPosition={'bottom'}
            anchor={
              <TouchableOpacity onPress={openMenu} disabled={true}>
                <FontAwesome name="filter" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            }>
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // dispatch(getCattles({ type: "all" }));
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('L7Days')}
            />

            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // dispatch(getCattles({ type: "archive" }));
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('CMonth')}
            />
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStage("heifer");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('PMonth')}
            />
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStage("bull");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('L3Month')}
            />
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStage("steer");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('L6Month')}
            />
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStage("weaner");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('L12Month')}
            />
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStage("calf");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('PYears')}
            />
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStatus("pregnant");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('L6Years')}
            />
            <Menu.Item
              leadingIcon="calendar-clock"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStatus("lactating");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('AllTimes')}
            />
            <Menu.Item
              disabled={true}
              leadingIcon="calendar-clock"
              trailingIcon="check"
              titleStyle={styles.txtStyle}
              onPress={() => {
                // setStatus("lac&preg");
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('CustomRange')}
            />
          </Menu>

          <TouchableOpacity style={{paddingLeft: 10}} disabled={true}>
            <FontAwesome5 name="file-export" size={20} color={COLORS.disable} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setVisable('none');
          }}>
          <Ionicons name="arrow-back" size={30} color={COLORS.gray} />
        </TouchableOpacity>
      )}
      <View style={[styles.searchBox, {display: visable}]}>
        <TextInput
          style={[{flex: 1}, styles.titleFont]}
          onChangeText={e => searchHandle(e)}
          placeholder={LABELS.setLabel('Search') + '...'}
        />
      </View>
    </View>
  );
};

export default MilkRecordFilter;

const styles = StyleSheet.create({
  txtStyle: {
    fontFamily: FONTS.IRAN_REGULAR,
  },
  titleFont: {
    fontFamily: FONTS.IRAN_BOLD,
  },
  textFont: {
    fontFamily: FONTS.IRAN_REGULAR,
  },
  searchBox: {
    backgroundColor: '#f0f0f0',
    width: 250,
    borderRadius: 7,
    padding: 7,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
