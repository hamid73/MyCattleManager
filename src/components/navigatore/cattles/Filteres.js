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
import {Menu} from 'react-native-paper';
import {SetIcon} from '../../../constants/setIcon';
import {useDispatch} from 'react-redux';
import {
  getCattles,
  getCattlesByStage,
  getCattlesByStatus,
  searchCattle,
} from '../../../redux/features/cattleSlice';
import {useEffect} from 'react';
import AdvancedSearch from './AdvancedSearch';

const Filteres = () => {
  const [visable, setVisable] = useState('none');

  const [visibleMenu, setVisibleMenu] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const [status, setStatus] = useState();
  const [stage, setStage] = useState();
  useEffect(() => {
    status && dispatch(getCattlesByStatus({status}));
  }, [status]);
  useEffect(() => {
    stage && dispatch(getCattlesByStage({stage}));
  }, [stage]);

  const searchHandle = e => {
    dispatch(searchCattle({value: e}));
  };

  const dispatch = useDispatch();
  return (
    <View
      style={{
        paddingRight: 20,
        paddingLeft: 10,
        maxWidth: 250,
        flexDirection: 'row-reverse',
        alignItems: 'center',
      }}>
      <AdvancedSearch
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {visable === 'none' ? (
        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 90,
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisable('flex');
            }}>
            <Feather name="search" size={24} color={COLORS.gray} />
          </TouchableOpacity>

          <Menu
            visible={visibleMenu}
            onDismiss={closeMenu}
            anchorPosition={'bottom'}
            contentStyle={{width: 250}}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <FontAwesome name="filter" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            }>
            <Menu.Item
              titleStyle={styles.txtStyle}
              onPress={() => {
                dispatch(getCattles({type: 'all'}));
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('AllActive')}
            />

            <Menu.Item
              titleStyle={styles.txtStyle}
              onPress={() => {
                dispatch(getCattles({type: 'archive'}));
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Archived')}
            />
            <Menu.Item
              leadingIcon={SetIcon('cows')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStage('cow');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Cows')}
            />
            <Menu.Item
              leadingIcon={SetIcon('heifers')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStage('heifer');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Heifers')}
            />
            <Menu.Item
              leadingIcon={SetIcon('bulls')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStage('bull');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Bulls')}
            />
            <Menu.Item
              leadingIcon={SetIcon('steers')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStage('steer');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Steers')}
            />
            <Menu.Item
              leadingIcon={SetIcon('weaners')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStage('weaner');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Weaners')}
            />
            <Menu.Item
              leadingIcon={SetIcon('calves')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStage('calf');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Calves')}
            />
            <Menu.Item
              leadingIcon={SetIcon('pregnanc')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStatus('pregnant');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('PregnantOnly')}
            />
            <Menu.Item
              leadingIcon={SetIcon('lactating')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStatus('lactating');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('LactatingOnly')}
            />
            <Menu.Item
              leadingIcon={SetIcon('cows')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStatus('lac&preg');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('Lac&Preg')}
            />
            <Menu.Item
              leadingIcon={SetIcon('dryoffs')}
              titleStyle={styles.txtStyle}
              onPress={() => {
                setStatus('nonLactating');
                setVisibleMenu(false);
              }}
              title={LABELS.setLabel('NonLactatings')}
            />
          </Menu>

          <TouchableOpacity disabled={true}>
            <FontAwesome5 name="file-export" size={20} color={COLORS.disable} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={{paddingLeft: 10}}
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
          placeholder={
            LABELS.setLabel('Search') +
            ' (' +
            LABELS.setLabel('Name') +
            ', ' +
            LABELS.setLabel('Plaque') +
            ')'
          }
        />
        <TouchableOpacity
          style={styles.advancedSearch}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Entypo name="sound-mix" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filteres;

const styles = StyleSheet.create({
  txtStyle: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.black,
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
    //borderRadius: 7,
    padding: 7,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
