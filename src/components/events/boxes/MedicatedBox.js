import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import {COLORS, FONTS, LABELS} from '../../../constants';
import {SICKNESQUERY} from '../../../queries';
import {useEffect} from 'react';
import {useState} from 'react';
import EventMenu from '../../menu/EventMenu';

const MedicatedBox = ({eventData, general}) => {
  useEffect(() => {
    getSicknes(eventData.relationId);
  }, []);
  const [result, setResult] = useState();
  const getSicknes = async id => {
    setResult(await SICKNESQUERY.getSicknesById(id));
  };

  return (
    <View style={styles.boxStyle} key={eventData.relationId}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="medical-services"
            size={24}
            color={COLORS.placeHolder}
          />
          <Text style={[styles.titleTextFont, styles.titleHeader]}>
            {LABELS.setLabel('Medicated')}
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
          {LABELS.setLabel('Symptoms')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {' '}
          {result?.symptoms}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel('Diagnosis')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {result?.diagnosis}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel('Technician')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {' '}
          {result?.technician}
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
          {LABELS.setLabel('Note')}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {(eventData.note && eventData.note) || '-'}
        </Text>
      </View>
    </View>
  );
};

export default MedicatedBox;

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    backgroundColor: COLORS.medicatedBox,
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
