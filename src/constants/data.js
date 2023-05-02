import {COLORS, ICONS, LABELS} from './';

import Foundation from 'react-native-vector-icons/dist/Foundation';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import {Image} from 'react-native';
const fa = true;
export const sexData = [
  {
    value: false,
    label: LABELS.setLabel('Male'),
    icon: () => (
      <Foundation name="male-symbol" size={24} color={COLORS.maleColor} />
    ),
    //parent: true,
  },
  {
    value: true,
    label: LABELS.setLabel('Female'),
    icon: () => (
      <Foundation name="female-symbol" size={24} color={COLORS.feMaleColor} />
    ),
  },
];
export const milkTypeData = [
  {
    value: 'bulk',
    label: LABELS.setLabel('BulkMilk'),
  },
  {
    value: 'individual',
    label: LABELS.setLabel('IndividualMilk'),
  },
];
export const cattleStageData_MALE = [
  {
    value: 'calf',
    label: LABELS.setLabel('Calf'),
    icon: () => (
      <Image source={ICONS.calfMale} style={{width: 40, height: 40}} />
    ),
  },
  {
    value: 'weaner',
    label: LABELS.setLabel('Weaner'),
    icon: () => (
      <Image source={ICONS.weanerMale} style={{width: 40, height: 40}} />
    ),
  },
  {
    value: 'steer',
    label: LABELS.setLabel('Steer'),
    icon: () => <Image source={ICONS.steer} style={{width: 40, height: 40}} />,
  },
  {
    value: 'bull',
    label: LABELS.setLabel('Bull'),
    icon: () => <Image source={ICONS.bull} style={{width: 40, height: 40}} />,
  },
];
export const cattleStageData_FEMALE = [
  {
    value: 'calf',
    label: LABELS.setLabel('Calf'),
    icon: () => <Image source={ICONS.calf} style={{width: 40, height: 40}} />,
  },
  {
    value: 'weaner',
    label: LABELS.setLabel('Weaner'),
    icon: () => <Image source={ICONS.weaner} style={{width: 40, height: 40}} />,
  },
  {
    value: 'heifer',
    label: LABELS.setLabel('Heifer'),
    icon: () => <Image source={ICONS.heifer} style={{width: 40, height: 40}} />,
  },
  {
    value: 'cow',
    label: LABELS.setLabel('Cow'),
    icon: () => <Image source={ICONS.cow} style={{width: 40, height: 40}} />,
  },
];

export const archiveData = [
  {
    value: 'lost',
    label: LABELS.setLabel('Lost'),
  },
  {
    value: 'dead',
    label: LABELS.setLabel('Dead'),
  },
  {
    value: 'sold',
    label: LABELS.setLabel('Sold'),
  },
  {
    value: 'otherArchive',
    label: LABELS.setLabel('Other'),
  },
];

export const statusData = [
  {
    value: 'pregnant',
    label: LABELS.setLabel('Pregnant'),
  },
  {
    value: 'lactating',
    label: LABELS.setLabel('Lactating'),
  },
  {
    value: 'nonLactating',
    label: LABELS.setLabel('NonLactating'),
  },
  {
    value: 'lac&preg',
    label: LABELS.setLabel('Lac&Preg'),
  },
];

export const eventsTypeMale = [
  {
    value: 'weight',
    label: LABELS.setLabel('Weighed'),
    icon: () => (
      <FontAwesome5 name="weight" size={22} color={COLORS.placeHolder} />
    ),
  },
  {
    value: 'medicated',
    label: LABELS.setLabel('Medicated'),
    icon: () => (
      <MaterialIcons
        name="medical-services"
        size={24}
        color={COLORS.placeHolder}
      />
    ),
  },
  {
    value: 'weaned',
    label: LABELS.setLabel('Weaned'),
    icon: () => <Image source={ICONS.milk} style={{width: 25, height: 25}} />,
  },
  {
    value: 'castrated',
    label: LABELS.setLabel('Castrated'),
    icon: () => (
      <Image source={ICONS.castration} style={{width: 25, height: 25}} />
    ),
  },
  {
    value: 'vaccinated',
    label: LABELS.setLabel('Vaccinated'),
    icon: () => (
      <Image source={ICONS.vaccine} style={{width: 25, height: 25}} />
    ),
  },
  {
    value: 'otherEvent',
    label: LABELS.setLabel('OtherEvent'),
    icon: () => <Image source={ICONS.other} style={{width: 20, height: 20}} />,
  },
];
export const eventsTypeFemale = [
  {
    value: 'dryOff',
    label: LABELS.setLabel('DryOff'),
    icon: () => <Image source={ICONS.dryoff} style={{width: 25, height: 25}} />,
  },
  {
    value: 'medicated',
    label: LABELS.setLabel('Medicated'),
    icon: () => (
      <MaterialIcons
        name="medical-services"
        size={24}
        color={COLORS.placeHolder}
      />
    ),
  },
  {
    value: 'mated',
    label: LABELS.setLabel('Mated'),
    icon: () => (
      <Image source={ICONS.insemination} style={{width: 25, height: 25}} />
    ),
  },
  {
    value: 'giveBirth',
    label: LABELS.setLabel('GiveBirth'),
    icon: () => (
      <Image source={ICONS.childbirth} style={{width: 25, height: 25}} />
    ),
  },

  {
    value: 'weight',
    label: LABELS.setLabel('Weighed'),
    icon: () => (
      <FontAwesome5 name="weight" size={22} color={COLORS.placeHolder} />
    ),
  },

  {
    value: 'vaccinated',
    label: LABELS.setLabel('Vaccinated'),
    icon: () => (
      <Image source={ICONS.vaccine} style={{width: 25, height: 25}} />
    ),
  },
  {
    value: 'pregnant',
    label: LABELS.setLabel('Pregnant'),
    icon: () => (
      <Image source={ICONS.pregnancyTest} style={{width: 25, height: 25}} />
    ),
  },
  {
    value: 'abortedPregnancy',
    label: LABELS.setLabel('AbortedPregnancy'),
    icon: () => (
      <Image source={ICONS.abortedPregnancy} style={{width: 25, height: 25}} />
    ),
  },
  {
    value: 'otherEvent',
    label: LABELS.setLabel('OtherEvent'),
    icon: () => <Image source={ICONS.other} style={{width: 20, height: 20}} />,
  },
];

export const typeObtainedData = [
  {value: 'born', label: LABELS.setLabel('Born')},
  {value: 'purchased', label: LABELS.setLabel('Purchased')},
  {value: 'other', label: LABELS.setLabel('Other')},
];

export const SetNameObtaine = name => {
  switch (name) {
    case 'born':
      return LABELS.setLabel('Born');
    case 'purchased':
      return LABELS.setLabel('Purchased');
    case 'other':
      return LABELS.setLabel('Other');
  }
};
