import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, LABELS, ROUTES} from '../../../constants';

import Entypo from 'react-native-vector-icons/dist/Entypo';

import {useNavigation} from '@react-navigation/native';
import {Divider, Menu} from 'react-native-paper';
import {useEffect} from 'react';

const MilkRecordItem = props => {
  const {milkingData, setMilkingRecordId, setAlertModalVisible} = props;

  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            milkingData.type !== 'bulk' ? COLORS.silver : COLORS.white,
        },
      ]}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={styles.labels}>
            <Text style={styles.txtTitle}>
              {milkingData.type && milkingData.type === 'bulk'
                ? LABELS.setLabel('Bulk') + ' (' + milkingData.numberOfCow + ')'
                : LABELS.setLabel('Cattle') + ': ' + milkingData.plaque}
            </Text>
            <Text style={styles.txtFont}>{milkingData.milkingDate}</Text>
          </View>
          <View style={styles.labels}>
            <Text style={styles.txtTitle}>{milkingData.milkTotal}</Text>
            <Text style={styles.txtFont}>{LABELS.setLabel('TotalMilk')}</Text>
          </View>
          <View style={styles.labels}>
            <Text style={styles.txtTitle}>{milkingData.totalUsed}</Text>
            <Text style={styles.txtFont}>{LABELS.setLabel('Used')}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row-reverse',

            flex: 1,
            marginTop: 10,
          }}>
          <Text style={[styles.txtFont, {marginRight: 30}]}>
            {LABELS.setLabel('Pure') +
              ': ' +
              (milkingData.milkTotal - milkingData.totalUsed)}
          </Text>
          <View style={styles.menuPosition}>
            <Menu
              key={milkingData.id}
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
                leadingIcon="book-edit"
                titleStyle={styles.txtFont}
                disabled={true}
                title={LABELS.setLabel('Update')}
              />
              <Divider />
              <Menu.Item
                leadingIcon="delete"
                titleStyle={styles.txtFont}
                onPress={() => {
                  setVisible(false);
                  setMilkingRecordId(milkingData.id);
                  setAlertModalVisible(true);
                }}
                title={LABELS.setLabel('Delete')}
              />
            </Menu>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MilkRecordItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    margin: 5,
    padding: 10,
    borderRadius: 7,
  },
  txtFont: {
    fontFamily: FONTS.IRAN_REGULAR,
  },
  txtTitle: {
    fontFamily: FONTS.IRAN_BOLD,
  },

  menuPosition: {
    position: 'absolute',
    top: 0,
    borderRadius: 20,
    width: 40,
    left: -2,
    alignItems: 'center',
  },
  labels: {
    alignItems: 'center',
  },
});
