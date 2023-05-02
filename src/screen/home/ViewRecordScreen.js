import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, LABELS, MESSAGES, ROUTES} from '../../constants';
import moment from 'jalali-moment';
import {GetAge} from '../../utility';

import Foundation from 'react-native-vector-icons/dist/Foundation';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import {SetIcon, SetNameStage, SetNameStatus} from '../../constants/setIcon';
import {SetNameObtaine} from '../../constants/data';
import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCattleByPlaque,
  getCattlesOffspring,
} from '../../redux/features/cattleSlice';
import Spinner from 'react-native-loading-spinner-overlay';
import {getEventByArchive} from '../../redux/features/eventSlice';
import ArchiveBox from '../../components/events/boxes/ArchiveBox';
import BreedingBox from '../../components/events/boxes/BreedingBox';
import {WEIGHTQUERY} from '../../queries';

const ViewRecordScreen = ({route}) => {
  const {
    plaque,
    name,
    birthDate,
    sex,
    cattleStage,
    entryDate,
    typeObtained,
    note,
    id,
    breedName,
    groupName,
    mPlaque,
    fPlaque,
    archive,
    status,
  } = route.params;
  const {cattlesOffspring, loading} = useSelector(state => ({
    ...state.cattle,
  }));
  const {event} = useSelector(state => ({
    ...state.event,
  }));

  const navigation = useNavigation();
  //const [weightCattle, setWeightCattle] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCattlesOffspring({id}));
    if (archive) {
      dispatch(getEventByArchive({cattleId: id}));
    }
    getLastWeighed();
  }, []);

  const bDate = moment
    .from(birthDate, 'en', 'jYYYY/jMM/jDD')
    .format('YYYY-MM-DD');
  const age = GetAge(bDate, Date.now());

  const handleCheckPlaque = plaque => {
    dispatch(getCattleByPlaque({plaque, navigation}));
  };
  const [lastWeight, setLastWeight] = useState();
  const getLastWeighed = async () => {
    const result = await WEIGHTQUERY.getLastResultWeighed(id);
    console.log(
      '🚀 ~ file: ViewRecordScreen.js:82 ~ getLastWeighed ~ result:',
      result.result,
    );

    result && setLastWeight(result.result);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{flexGrow: 1}}
      nestedScrollEnabled={true}>
      <Spinner visible={loading} />
      {event && archive === 1 && <ArchiveBox event={event} />}
      {sex === 1 &&
        (cattleStage === 'cow' || cattleStage === 'heifer') &&
        (status !== 'pregnant' && status !== 'lac&preg' ? (
          <BreedingBox event={event} />
        ) : null)}
      <View style={styles.boxStyle}>
        <Text
          style={[
            styles.header,
            styles.titleTextFont,
            {backgroundColor: sex ? COLORS.feMaleColor : COLORS.maleColor},
          ]}>
          {LABELS.setLabel('GeneralDet')}
        </Text>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Plaque')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>{plaque}</Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Name')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>{name}</Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('BDate')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {(birthDate && birthDate) || '-'}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Age')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {birthDate ? age : '-'}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Sex')}:
          </Text>
          <Foundation
            name={sex ? 'male-symbol' : 'female-symbol'}
            size={24}
            color={sex ? COLORS.feMaleColor : COLORS.maleColor}
          />
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {sex ? LABELS.setLabel('Female') : LABELS.setLabel('Male')}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Weight')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {(lastWeight && lastWeight) || '-'}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('CattleStage')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {SetNameStage(cattleStage)}
          </Text>
        </View>
        {sex === 1 && (
          <View style={[styles.detailsStyle, {height: 70}]}>
            <Text style={[styles.textStyle, styles.titleTextFont]}>
              {LABELS.setLabel('Status')}:
            </Text>
            <Text style={[styles.textDetStyle, styles.textFont]}>
              {SetNameStatus(status)}
            </Text>
          </View>
        )}
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Breed')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {(breedName && breedName) || '-'}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Groups')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {' '}
            {(groupName && groupName) || '-'}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('JoinedOn')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {(entryDate && entryDate) || '-'}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Source')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {SetNameObtaine(typeObtained)}
          </Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Mother')}:
          </Text>
          <View style={styles.boxMother}>
            <Text style={[styles.textFont]}>{(mPlaque && mPlaque) || '-'}</Text>
            <TouchableOpacity
              disabled={mPlaque === null ? true : false}
              style={styles.btnSearch}
              onPress={() => handleCheckPlaque(mPlaque)}>
              <AntDesign
                name="search1"
                size={24}
                color={mPlaque !== null ? COLORS.btnBackPress : COLORS.btnBack}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Father')}:
          </Text>
          <View style={styles.boxMother}>
            <Text style={[styles.textFont]}>{(fPlaque && fPlaque) || '-'}</Text>
            <TouchableOpacity
              disabled={fPlaque !== null ? false : true}
              style={styles.btnSearch}
              onPress={() => handleCheckPlaque(fPlaque)}>
              <AntDesign
                name="search1"
                size={24}
                color={fPlaque !== null ? COLORS.btnBackPress : COLORS.btnBack}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel('Note')}:
          </Text>
          <Text style={[styles.textDetStyle, styles.textFont]}>
            {(note && note) || '-'}
          </Text>
        </View>
      </View>
      <View style={styles.boxStyle}>
        <Text
          style={[
            styles.header,
            styles.titleTextFont,
            {
              backgroundColor: sex ? COLORS.feMaleColor : COLORS.maleColor,
            },
          ]}>
          {LABELS.setLabel('CattleKids')}
        </Text>
        {(cattlesOffspring &&
          cattlesOffspring.length > 0 &&
          cattlesOffspring.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.childBox}
              onPress={() =>
                navigation.push(ROUTES.VIEWRECORDTAB, {cattles: item})
              }>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.textFont}>{item.plaque}</Text>
                <Text style={styles.textFont}>{item.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.push(ROUTES.VIEWRECORDTAB, {cattles: item})
                }>
                <AntDesign name="search1" size={24} color={COLORS.btnBack} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))) || (
          <Text style={[styles.notFoundKids, styles.titleTextFont]}>
            {MESSAGES.setMessage('notFoundKids')}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ViewRecordScreen;

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.backGround, padding: 7, paddingTop: 0},
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,

    marginBottom: 10,
    color: COLORS.white,
    fontSize: 18,
  },
  boxStyle: {
    shadowColor: COLORS.black,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    marginTop: 20,
  },

  textStyle: {
    padding: 5,
    marginLeft: 10,
    textAlign: 'left',
    flex: 1,
  },
  textDetStyle: {
    padding: 5,
    textAlign: 'left',
    flex: 2,
  },
  boxMother: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start',

    flex: 1,
  },
  textFont: {fontFamily: FONTS.IRAN_REGULAR},
  titleTextFont: {fontFamily: FONTS.IRAN_BOLD},
  detailsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  btnSearch: {
    marginLeft: 50,
  },
  notFoundKids: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
  childBox: {
    flex: 1,
    flexDirection: 'row',
    shadowColor: COLORS.black,

    shadowOpacity: 0.9,

    elevation: 2,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
});
