import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WEIGHTQUERY} from '../../queries';
import {COLORS, FONTS, LABELS} from '../../constants';

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

import EventMenu from '../menu/EventMenu';
const WeighedBox = ({eventData, general}) => {
  // console.log("🚀 ~ file: WeighedBox.js:8 ~ WeighedBox ~ general", general);
  useEffect(() => {
    getResultWeight(eventData.relationId);
  }, []);
  const [result, setResult] = useState();
  const getResultWeight = async id => {
    setResult(await WEIGHTQUERY.getWeightById(id));
  };

  return (
    <View style={styles.boxStyle} key={eventData.relationId}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5 name="weight" size={24} color={COLORS.white} />
          <Text style={[styles.titleTextFont, styles.titleHeader]}>
            {LABELS.setLabel('Weighed')}
          </Text>
        </View>
        <EventMenu
          showCopy={true}
          eventId={eventData.id}
          relationId={eventData.relationId}
          type={eventData.type}
          general={general}
        />
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel('eventDate')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {eventData.createdAt}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel('Plaque')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {eventData.plaque}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel('Weight')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {result && result.result + ' ' + LABELS.setLabel('Kg')}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel('Note')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {(eventData.note && eventData.note) || '-'}
        </Text>
      </View>
    </View>
  );
};

export default WeighedBox;

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    backgroundColor: COLORS.weighedBox,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleHeader: {color: COLORS.white, fontSize: 15, marginLeft: 10},
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
  textFont: {fontFamily: FONTS.IRAN_REGULAR},
  titleTextFont: {fontFamily: FONTS.IRAN_BOLD},
  textStyle: {
    padding: 5,
    marginLeft: 10,
    textAlign: 'left',
    flex: 1,
  },
  textDetStyle: {
    padding: 5,
    textAlign: 'left',
    flex: 1,
  },
  detailsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});
