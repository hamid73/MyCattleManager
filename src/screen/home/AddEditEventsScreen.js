import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LogBox,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../constants';

import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import CustomDatePicker from '../../components/CustomDatePicker';
import {useEffect, useState} from 'react';
import CustomDropDown from '../../components/CustomDropDown';
import {eventsTypeFemale, eventsTypeMale} from '../../constants/data';

import {SetInputEvent} from '../../components/events';
import {useToast} from 'react-native-toast-notifications';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import moment from 'jalali-moment';
import {useDispatch} from 'react-redux';
import {createWeighed} from '../../redux/features/weighedSlice';
import {createEvent} from '../../redux/features/eventSlice';
import {createSicknes} from '../../redux/features/sicknesSlice';
import {createMates} from '../../redux/features/matesSlice';
import {createPregnant} from '../../redux/features/pregnantSlice';
import {createCattle} from '../../redux/features/cattleSlice';
import {showRewardedAdds} from '../../utility/adivery';
import {TextInput, useTheme} from 'react-native-paper';

const AddEditEventsScreen = ({route}) => {
  LogBox.ignoreLogs([
    'value provided is not in a recognized RFC2822 or ISO format',
  ]);
  const {plaque, name, sex, cattleStage, id, breedsId, breedName, status} =
    route.params.cattles;

  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [ctrShowAdds, setCounter] = useState(0);
  const formik = useFormik({
    initialValues: {
      eventDate: '',
      type: '',
      note: '',
      resultWeiged: '',
    },
    validationSchema: Yup.object({
      eventDate: Yup.string().required(
        MESSAGES.setMessage('EventDateRequired'),
      ),
      type: Yup.string().required(MESSAGES.setMessage('TypeEventRequired')),
    }),
    onSubmit: async formValue => {
      if (ctrShowAdds === 1) {
        const resAdd = await showRewardedAdds();
        if (resAdd) {
          setCounter(0);
        } else {
          return;
        }
      } else {
        setCounter(ctrShowAdds + 1);
      }
      const newEvent = {
        cattleId: id,
        note: formValue.note,
        createdAt: formValue.eventDate,
        plaque,
        type: formValue.type,
      };
      switch (formValue.type) {
        case 'weight':
          dispatch(
            createWeighed({
              formValue: {...newEvent, result: eventValues.resultWeiged},
              toast,
              dispatch,
              navigation,
            }),
          );
          break;
        case 'medicated':
          const newMedicate = {...eventValues, ...newEvent};
          dispatch(
            createSicknes({
              formValue: newMedicate,
              toast,
              dispatch,
              navigation,
            }),
          );
          break;
        case 'otherEvent':
          const newOtherEvent = {...newEvent, name: eventValues.name};
          dispatch(
            createEvent({eventValues: newOtherEvent, toast, navigation}),
          );
          break;
        case 'vaccinated':
          const newVaccinated = {...newEvent, name: eventValues.name};
          dispatch(
            createEvent({eventValues: newVaccinated, toast, navigation}),
          );
          break;

        case 'mated':
          const newMated = {...newEvent, ...eventValues};
          dispatch(
            createMates({
              formValue: newMated,
              toast,
              dispatch,
              navigation,
            }),
          );
          break;
        case 'pregnant':
          const newPregnant = {...newEvent, ...eventValues, status};
          dispatch(
            createPregnant({
              formValue: newPregnant,
              toast,
              dispatch,
              navigation,
            }),
          );
          break;
        case 'giveBirth':
          const newGiveBirth = {...newEvent, name: eventValues.fatherId};
          dispatch(
            createEvent({
              eventValues: newGiveBirth,
              toast,
              navigation,
              dispatch,
            }),
          );
          if (eventValues.regCalf) {
            dispatch(
              createCattle({
                formValue: {
                  sex: eventValues.calfSex,
                  plaque: eventValues.calfPlaque,
                  fatherId: eventValues.fatherId,
                  fPlaque: eventValues.fPlaque,
                  motherId: id,
                  mPlaque: plaque,
                  breedName,
                  breedsId,
                  typeObtained: 'born',
                  birthDate: moment.from(new Date()).format('jYYYY/jMM/jDD'),
                  entryDate: moment.from(new Date()).format('jYYYY/jMM/jDD'),
                  cattleStage: 'calf',
                },
              }),
            );
          }
          break;
        default:
          dispatch(
            createEvent({
              eventValues: newEvent,
              toast,
              navigation,
              dispatch,
              cattleStage,
            }),
          );
          break;
      }
    },
  });
  const [eventDateModalVisible, setEventDateModalVisible] = useState(false);
  const [eventType, setEventType] = useState();

  const [eventDate, setEventDate] = useState();
  useEffect(() => {
    const eDate = eventDate
      ? moment(eventDate, 'jYYYY/jMM/jDD').locale('fa').format('YYYY/MM/DD')
      : '';
    formik.setFieldValue('eventDate', eDate ? eDate : '');
    //console.log(eventDate);
  }, [eventDate]);

  const [eventValues, setEventValues] = useState({});

  //show in invisible modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeliveryDateVisible, setModalDeliveryDateVisible] =
    useState(false);

  //set value mate and delivery Date
  const [getMatingDate, setGetMatingDate] = useState();
  const [getDeliveryDate, setGetDeliveryDate] = useState();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <CustomDatePicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSlectedDate={setGetMatingDate}
        key={'matingDate'}
        maximumDate={moment.from(new Date()).format('jYYYY/jMM/jDD')}
        selectedDate={getMatingDate}
      />
      <CustomDatePicker
        modalVisible={modalDeliveryDateVisible}
        setModalVisible={setModalDeliveryDateVisible}
        setSlectedDate={setGetDeliveryDate}
        key={'deliveryDate'}
        minimumDate={moment.from(new Date()).format('jYYYY/jMM/jDD')}
        selectedDate={getDeliveryDate}
      />
      <CustomDatePicker
        modalVisible={eventDateModalVisible}
        setModalVisible={setEventDateModalVisible}
        setSlectedDate={setEventDate}
        key={'eventDate'}
        maximumDate={moment.from(new Date()).format('jYYYY/jMM/jDD')}
        selectedDate={eventDate}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            styles.header,
            {backgroundColor: sex ? COLORS.feMaleColor : COLORS.maleColor},
          ]}>
          <FontAwesome name="calendar" size={24} color={COLORS.white} />

          <Text style={[styles.titleTextFont, styles.titleHeader]}>
            {plaque} {name && '(' + name + ')'}
            {' - '}
            {LABELS.setLabel(cattleStage)}
            {' - '} {sex ? 'ماده' : 'نر'}
          </Text>
        </View>
        <TouchableOpacity
          // style={styles.inputField}
          onPress={() => {
            setEventDateModalVisible(true);
          }}>
          <TextInput
            editable={false}
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={styles.inputField}
            label={LABELS.setLabel('EventDate') + '*'}
            placeholder={LABELS.setLabel('EventDate') + '*'}
            value={formik.values.eventDate}
            onChangeText={formik.handleChange('eventDate')}
            onBlur={formik.handleBlur('eventDate')}
          />
        </TouchableOpacity>
        {formik.touched.eventDate && formik.errors.eventDate ? (
          <Text style={[styles.txtError, styles.titleTextFont]}>
            {formik.errors.eventDate}
          </Text>
        ) : null}
        <View style={{zIndex: 300}}>
          <CustomDropDown
            placeholder={LABELS.setLabel('EventType') + '*'}
            data={sex ? eventsTypeFemale : eventsTypeMale}
            onChangeValue={value => {
              setEventType(value);
              formik.setFieldValue('type', value);
            }}
            labelStyle={styles.input}
            pColor={COLORS.gray}
            listItemLabelColor={COLORS.gray}
            dropDownBorderColor={COLORS.onPrimaryColor}
            listItemColor={COLORS.white}
            setStyle={[styles.inputField, {borderWidth: 1}]}
            setZIndex={3000}
            zIndexInverse={2000}
          />
          {formik.touched.type && formik.errors.type ? (
            <Text style={[styles.txtError, styles.titleTextFont]}>
              {formik.errors.type}
            </Text>
          ) : null}
        </View>
        {eventType &&
          SetInputEvent(
            eventType,
            setEventValues,
            setModalDeliveryDateVisible,
            setModalVisible,
            getMatingDate,
            getDeliveryDate,
          )}

        <TextInput
          multiline={true}
          numberOfLines={5}
          mode="outlined"
          outlineColor={theme.colors.onPrimary}
          activeOutlineColor={theme.colors.primary}
          style={styles.inputField}
          label={LABELS.setLabel('Note')}
          placeholder={LABELS.setLabel('Note')}
          value={formik.values.note}
          onChangeText={formik.handleChange('note')}
          onBlur={formik.handleBlur('note')}
        />

        <TouchableOpacity
          onPress={formik.handleSubmit}
          style={[
            styles.btnConfirm,
            {backgroundColor: sex ? COLORS.feMaleColor : COLORS.maleColor},
          ]}>
          <Text style={[styles.btnText, styles.titleTextFont]}>
            {LABELS.setLabel('Save')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddEditEventsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backGround,
    padding: 7,
    paddingTop: 20,
    height: '100%',
  },
  header: {
    borderRadius: 7,
    padding: 10,

    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {color: COLORS.white, fontSize: 18, marginLeft: 10},
  textFont: {fontFamily: FONTS.IRAN_REGULAR},
  titleTextFont: {fontFamily: FONTS.IRAN_BOLD},
  inputField: {
    borderRadius: 7,
    borderColor: COLORS.onPrimaryColor,
    backgroundColor: COLORS.white,
    // padding: 17,
    //backgroundColor: COLORS.inputFieldBackGround,
    marginBottom: 10,
  },
  DropDownField: {
    borderRadius: 7,
    backgroundColor: COLORS.inputFieldBackGround,
    marginBottom: 25,
    borderWidth: 0,
    height: 60,
  },
  input: {
    color: COLORS.black,
    fontFamily: FONTS.IRAN_REGULAR,
    flex: 1,
    fontSize: 16,
  },

  btnConfirm: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  btnText: {
    color: COLORS.txt,
    fontSize: 18,
  },
  txtError: {
    color: COLORS.txtError,

    marginBottom: 17,
  },
});
