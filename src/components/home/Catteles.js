import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, LABELS, ROUTES} from '../../constants';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Foundation from 'react-native-vector-icons/dist/Foundation';

import {Button, Menu, Divider} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

import {SetIcon} from '../../constants/setIcon';

const Cattles = props => {
  const {cattles} = props;
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate({
          name: ROUTES.VIEWRECORDTAB,
          params: {cattles},
          merge: true,
        })
      }
      style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.imageStage,
                {
                  backgroundColor: cattles.sex
                    ? COLORS.feMaleColor
                    : COLORS.maleColor,
                },
              ]}>
              <View style={cattles.archive && styles.disableStyle} />

              <Image
                source={SetIcon(cattles.cattleStage, cattles.sex)}
                style={{width: 50, height: 50}}
              />
            </View>
            <View
              style={{
                marginLeft: 65,
                alignItems: 'flex-start',
              }}>
              <Text style={styles.txtStyle}>{cattles.plaque}</Text>
              <Text style={styles.txtStyle}>{cattles.name}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',

              marginRight: 30,
            }}>
            <Text style={[styles.txtStyle, {marginRight: 5, marginTop: 2}]}>
              {cattles.sex
                ? LABELS.setLabel('Female')
                : LABELS.setLabel('Male')}
            </Text>
            <Foundation
              name={cattles.sex ? 'male-symbol' : 'female-symbol'}
              size={24}
              color={cattles.sex ? COLORS.feMaleColor : COLORS.maleColor}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.menuPosition}>
            <Menu
              key={cattles.id}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  style={{top: 0, right: -10}}
                  onPress={openMenu}>
                  <Entypo name="dots-three-vertical" size={20} color="black" />
                </TouchableOpacity>
              }>
              <Menu.Item
                leadingIcon="exclamation"
                titleStyle={styles.txtStyle}
                onPress={() => {
                  navigation.navigate(ROUTES.VIEWRECORDTAB, {cattles});

                  setVisible(false);
                }}
                title={LABELS.setLabel('ViewCattle')}
              />

              <Divider />
              <Menu.Item
                leadingIcon="update"
                titleStyle={styles.txtStyle}
                onPress={() => {
                  navigation.navigate(ROUTES.ADD_EDIT_CATTELE, cattles);
                  setVisible(false);
                }}
                title={LABELS.setLabel('Update')}
              />
              <Menu.Item
                leadingIcon="star-outline"
                disabled={true}
                titleStyle={styles.txtStyle}
                onPress={() => {
                  navigation.navigate(ROUTES.ADD_EDIT_CATTELE, cattles);
                  setVisible(false);
                }}
                title={LABELS.setLabel('Favorite')}
              />
            </Menu>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cattles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    margin: 5,
    padding: 10,
    borderRadius: 7,
  },
  txtStyle: {
    fontFamily: FONTS.IRAN_REGULAR,
  },
  disableStyle: {
    backgroundColor: COLORS.white,
    opacity: 0.6,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    zIndex: 1,
  },
  menuPosition: {
    position: 'absolute',
    top: 0,
    borderRadius: 20,
    width: 40,
    right: -2,
    alignItems: 'center',
  },
  imageStage: {
    left: -10,

    bottom: -10,
    top: -10,
    width: 65,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
