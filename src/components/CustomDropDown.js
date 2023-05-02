import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {useState} from 'react';
import {COLORS, FONTS, LABELS} from '../constants';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useTheme} from 'react-native-paper';

const CustomDropDown = props => {
  // console.log(props.setValue);
  //DropDown Options
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  //console.log(props.setZIndex);
  //DropDown Options
  return (
    <DropDownPicker
      ListEmptyComponent={() => (
        <Text
          style={{
            padding: 15,
            fontFamily: FONTS.IRAN_REGULAR,
            backgroundColor: COLORS.white,
            color: COLORS.silver,
            textAlign: 'center',
          }}>
          {LABELS.setLabel('ItemNotFound')}
        </Text>
      )}
      placeholderStyle={{
        color: props.pColor ? props.pColor : COLORS.placeHolder,
        fontFamily: FONTS.IRAN_REGULAR,
      }}
      searchPlaceholder={LABELS.setLabel('Search')}
      searchTextInputStyle={{
        fontFamily: FONTS.IRAN_REGULAR,
        color: COLORS.black,
        borderColor: COLORS.white,
        borderWidth: 1,
      }}
      searchContainerStyle={{
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.primaryColor,
      }}
      searchPlaceholderTextColor={COLORS.gray}
      open={open}
      value={value}
      items={props.data}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={props.onChangeValue}
      //setLabel={(label) => console.log(label)}
      onSelectItem={props.onSelectItem}
      listMode="MODAL"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      maxHeight={300}
      placeholder={props.placeholder}
      loading={props.loading}
      ActivityIndicatorComponent={({color, size}) => (
        <ActivityIndicator color={color} size={size} />
      )}
      //activityIndicatorColor="red"
      //activityIndicatorSize={30}
      searchable={props.searchable}
      closeOnBackPressed={true}
      labelStyle={props.labelStyle}
      style={[props.setStyle, {height: 60}]}
      listItemLabelStyle={{
        fontFamily: FONTS.IRAN_REGULAR,
        color: props.listItemLabelColor ? props.listItemLabelColor : COLORS.txt,
      }}
      // listItemContainerStyle={{ padding: 30 }}
      zIndex={props.setZIndex}
      zIndexInverse={props.zIndexInverse}
      listItemContainerStyle={{
        backgroundColor: props.listItemColor
          ? props.listItemColor
          : COLORS.inputFieldBackGround,
        borderWidth: 0,
        height: 60,
      }}
      dropDownContainerStyle={{
        borderColor: props.dropDownBorderColor
          ? props.dropDownBorderColor
          : COLORS.txt,
        // position: 'relative',
        // top: -11,
        //maxHeight: 300,
      }}
      itemSeparator={true}
      itemSeparatorStyle={{backgroundColor: COLORS.txt}}
      autoScroll={true}
      ArrowUpIconComponent={() => (
        <FontAwesome
          name="angle-up"
          size={24}
          color={props.pColor ? props.pColor : COLORS.txt}
        />
      )}
      ArrowDownIconComponent={() => (
        <FontAwesome
          name="angle-down"
          size={24}
          color={props.pColor ? props.pColor : COLORS.txt}
        />
      )}
      TickIconComponent={() => (
        <FontAwesome5
          name="check"
          size={15}
          color={props.pColor ? props.pColor : COLORS.txt}
        />
      )}
      // setItems={props.setItems}
    />
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  placeholderStyle: {
    color: COLORS.placeHolder,
    fontFamily: FONTS.IRAN_REGULAR,
  },
});
