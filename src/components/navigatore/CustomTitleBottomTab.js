import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import {COLORS, FONTS, ICONS, ROUTES} from '../../constants';
import {Badge} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CustomTitleBottomTab = ({children}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.titleBox}>
        <Text style={styles.titleStyle}>{children}</Text>
        <TouchableOpacity>
          <Badge
            style={{
              position: 'absolute',
              zIndex: 2,
              top: 11,
              left: 12,
              backgroundColor: COLORS.error,
            }}
            size={15}>
            0
          </Badge>
          <Ionicons name="notifications-sharp" size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => navigation.navigate(ROUTES.SUPPORT)}>
          <MaterialIcons name="support-agent" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => navigation.navigate(ROUTES.PAYMENT)}>
          <Image source={ICONS.vip} style={styles.vipLogo} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CustomTitleBottomTab;

const styles = StyleSheet.create({
  titleBox: {flexDirection: 'row', alignItems: 'center'},
  titleStyle: {
    fontFamily: FONTS.IRAN_BOLD,
    color: COLORS.gray,
    fontSize: 20,
    marginRight: 10,
  },
  vipLogo: {
    width: 34,
    height: 24,
  },
});
