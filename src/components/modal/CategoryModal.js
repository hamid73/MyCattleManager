import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, LABELS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getGroups} from '../../redux/features/groupSlice';

const CategoryModal = props => {
  const {modalVisible, setModalVisible, setGroup, setAddEditGroupModalVisible} =
    props;
  const [searchGroups, setSearchGroups] = useState();
  const dispatch = useDispatch();
  const {groups, loading} = useSelector(state => ({
    ...state.group,
  }));
  useEffect(() => {
    dispatch(getGroups());
  }, []);
  useEffect(() => {
    setSearchGroups(groups);
  }, [groups]);
  const fa = true;
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          backgroundColor: '#232f34',
          opacity: 0.4,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TextInput
              style={styles.input}
              placeholder={LABELS.setLabel('Search', fa)}
              placeholderTextColor={COLORS.black}
              onChangeText={e => {
                setSearchGroups(
                  groups.filter(row => {
                    return row.name.includes(e.toString());
                  }),
                );
              }}
            />
          </View>
          <View style={styles.body}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.backGround,
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setAddEditGroupModalVisible(true);

                  setModalVisible(false);
                }}>
                <Text style={styles.btnCreate}>
                  {LABELS.setLabel('AddGroupModal', fa)}
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              keyExtractor={item => item.id}
              data={(searchGroups && searchGroups) || groups}
              renderItem={({item, index}) => (
                <View
                  key={item.id}
                  style={{
                    padding: 15,
                    borderTopColor: COLORS.backGround,
                    borderTopWidth: index === 0 ? 0 : 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setGroup({id: item.id, name: item.name});
                      setModalVisible(false);
                    }}>
                    <Text
                      style={{fontFamily: FONTS.IRAN_REGULAR, fontSize: 16}}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 15,
                  fontFamily: FONTS.IRAN_BOLD,
                }}>
                {LABELS.setLabel('Cancel', fa)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    borderBottomWidth: 4,
    borderColor: COLORS.backGround,
    paddingBottom: 15,
    marginBottom: 15,
    minHeight: 200,
    maxHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.backGround,
    marginBottom: 20,

    width: '100%',
  },
  btnCreate: {
    fontFamily: FONTS.IRAN_BOLD,
    color: COLORS.black,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.black,
    flex: 1,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    maxWidth: 400,
    width: '100%',

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingTop: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 24,
  },
  button: {
    borderRadius: 30,
    padding: 5,
    elevation: 2,
    position: 'absolute',
    right: -20,
    top: -20,
  },

  buttonClose: {
    backgroundColor: COLORS.red,
  },
  textStyle: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 15,
    textAlign: 'center',
  },
});
