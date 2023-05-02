import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Menu} from 'react-native-paper';

import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import {COLORS, FONTS, LABELS, MESSAGES} from '../../constants';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteEvent} from '../../redux/features/eventSlice';
import {useToast} from 'react-native-toast-notifications';
import AlertMessage from '../AlertMessage';
const EventMenu = ({showCopy, eventId, relationId, type, general = false}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const handleEventDelete = async () => {
    setAlertModalVisible(true);
  };
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  return (
    <>
      <AlertMessage
        key={eventId}
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        title={LABELS.setLabel('DeletedCattle')}
        message={MESSAGES.setMessage('DeletedCattle')}
        buttons={[
          {text: LABELS.setLabel('No')},
          {
            text: LABELS.setLabel('Yes'),
            func: () => {
              dispatch(
                deleteEvent({id: eventId, relationId, type, toast, dispatch}),
              );
            },
            styles: {color: COLORS.red},
          },
        ]}
        android={{
          title: {fontFamily: FONTS.IRAN_BOLD},
          message: {fontFamily: FONTS.IRAN_REGULAR},
        }}
        ios={{
          title: {fontFamily: FONTS.IRAN_BOLD},
          message: {fontFamily: FONTS.IRAN_REGULAR},
        }}
        Icon={<MaterialIcons name="dangerous" size={34} color={COLORS.red} />}
      />
      <Menu
        visible={visibleMenu}
        onDismiss={closeMenu}
        anchorPosition={'bottom'}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Entypo name="dots-three-vertical" size={24} color={COLORS.white} />
          </TouchableOpacity>
        }>
        {general && (
          <Menu.Item
            leadingIcon="eye"
            titleStyle={styles.textFont}
            onPress={() => {
              //setLanguge(false);
              setVisibleMenu(false);
            }}
            title={LABELS.setLabel('ViewCattle')}
          />
        )}
        <Menu.Item
          leadingIcon="clipboard-edit"
          titleStyle={styles.textFont}
          onPress={() => {
            //setLanguge(false);
            setVisibleMenu(false);
          }}
          disabled={true}
          title={LABELS.setLabel('Update')}
        />
        {showCopy && (
          <Menu.Item
            leadingIcon="content-copy"
            titleStyle={styles.textFont}
            onPress={() => {
              //setLanguge(false);
              setVisibleMenu(false);
            }}
            disabled={true}
            title={LABELS.setLabel('CopyTo')}
          />
        )}
        <Menu.Item
          titleStyle={styles.textFont}
          onPress={() => {
            handleEventDelete();
            setVisibleMenu(false);
          }}
          leadingIcon="delete"
          title={LABELS.setLabel('Delete')}
        />
      </Menu>
    </>
  );
};

export default EventMenu;

const styles = StyleSheet.create({
  titleFont: {
    fontFamily: FONTS.IRAN_BOLD,
  },
  textFont: {
    fontFamily: FONTS.IRAN_REGULAR,
  },
});
