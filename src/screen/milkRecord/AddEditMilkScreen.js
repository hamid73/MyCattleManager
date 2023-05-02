import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../constants';
import CustomDatePicker from '../../components/CustomDatePicker';
import {useState} from 'react';
import moment from 'jalali-moment';
import CustomDropDown from '../../components/CustomDropDown';
import * as GetData from '../../constants/data';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createMilkRecord} from '../../redux/features/milkRecordSlice';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getCattlesByGender} from '../../redux/features/cattleSlice';
import {toEnglishDigits} from '../../utility';
import {MD3LightTheme, TextInput} from 'react-native-paper';
const AddEditMilkScreen = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [milkingDate, setMilkingDate] = useState(false);
  const [cattleIdRequired, setCattleIdRequired] = useState(false);
  const [numberOfCowRequired, setNumberOfCowRequired] = useState(false);

  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCattlesByGender({sex: true, setData: setCowData}));
  }, []);
  const [CowList, setCowList] = useState([]);
  const [cowData, setCowData] = useState();
  useEffect(() => {
    if (cowData) {
      setCowList(
        cowData.map(row =>
          row.status === 'lactating' || row.status === 'lac&preg'
            ? {
                value: row.id,
                label: toEnglishDigits(row.plaque),
              }
            : [],
        ),
      );
    }
  }, [cowData]);

  const formik = useFormik({
    initialValues: {
      milkingDate: '',
      type: '',
      amTotal: 0,
      noonTotal: 0,
      pmTotal: 0,
      milkTotal: 0,
      totalUsed: 0,
      note: '',
      cattleId: '',
      numberOfCow: 0,
      mPlaque: '',
    },
    validationSchema: Yup.object({
      milkingDate: Yup.string().required(MESSAGES.setMessage('Required')),
      type: Yup.string().required(MESSAGES.setMessage('Required')),
      milkTotal: Yup.number().required(MESSAGES.setMessage('Required')),
    }),
    onSubmit: async formValue => {
      if (formValue.type === 'individual' && formValue.cattleId === '') {
        setCattleIdRequired(true);
        return;
      } else if (
        formValue.type === 'bulk' &&
        (formValue.numberOfCow === '' || formValue.numberOfCow === 0)
      ) {
        setNumberOfCowRequired(true);
        return;
      }
      if (route.params) {
        dispatch(updateCattle({id, formValue, navigation, toast}));
      } else {
        dispatch(createMilkRecord({formValue, navigation, toast, dispatch}));
      }
    },
  });
  useEffect(() => {
    const mDate = milkingDate
      ? moment(milkingDate, 'jYYYY/jMM/jDD').locale('fa').format('YYYY/MM/DD')
      : '';

    formik.setFieldValue('milkingDate', mDate);
  }, [milkingDate]);
  useEffect(() => {
    if (formik.values.cattleId !== '') {
      setCattleIdRequired(false);
    }
  }, [formik.values.cattleId]);
  useEffect(() => {
    if (formik.values.numberOfCow !== 0 && formik.values.numberOfCow !== '') {
      setNumberOfCowRequired(false);
    }
  }, [formik.values.numberOfCow]);

  useEffect(() => {
    const sum =
      parseFloat((formik.values.amTotal && formik.values.amTotal) || 0) +
      parseFloat((formik.values.noonTotal && formik.values.noonTotal) || 0) +
      parseFloat((formik.values.pmTotal && formik.values.pmTotal) || 0);
    formik.setFieldValue('milkTotal', sum.toString());
  }, [formik.values.amTotal, formik.values.noonTotal, formik.values.pmTotal]);

  useEffect(() => {
    if (formik.values.type !== '' && formik.values.type) {
      if (formik.values.type === 'individual') {
        formik.setFieldValue('numberOfCow', 0);
      } else {
        formik.setFieldValue('cattleId', '');
      }
    }
  }, [formik.values.type]);

  const theme = {
    colors: {
      ...MD3LightTheme.colors,
      primary: COLORS.btnBackPress,
      text: COLORS.black,
    },
  };

  return (
    <View style={styles.container}>
      <CustomDatePicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        maximumDate={moment.from(new Date()).format('jYYYY/jMM/jDD')}
        selectedDate={milkingDate}
        setSlectedDate={setMilkingDate}
        key={'milkingDate'}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <TouchableOpacity
          //style={styles.inputField}
          onPress={() => {
            setModalVisible(true);
          }}>
          <TextInput
            outlineColor={COLORS.outlineColor}
            theme={theme}
            editable={false}
            style={styles.inputField}
            error={
              formik.touched.milkingDate && formik.errors.milkingDate
                ? true
                : false
            }
            mode="outlined"
            label={LABELS.setLabel('MilkingDate')}
            placeholder={LABELS.setLabel('MilkingDate')}
            // placeholderTextColor={COLORS.silver}
            value={formik.values.milkingDate}
            onChangeText={formik.handleChange('milkingDate')}
            onBlur={formik.handleBlur('milkingDate')}
          />
        </TouchableOpacity>
        {formik.touched.milkingDate && formik.errors.milkingDate ? (
          <Text style={styles.txtError}>{formik.errors.milkingDate}</Text>
        ) : null}
        <View>
          {route.params && (
            <Text style={[styles.labelStyle, {zIndex: 1202}]}>
              {LABELS.setLabel('MilkType')}:
            </Text>
          )}
          <CustomDropDown
            placeholder={LABELS.setLabel('MilkType')}
            setZIndex={1200}
            data={GetData.milkTypeData}
            onChangeValue={value => formik.setFieldValue('type', value)}
            labelStyle={styles.input}
            setStyle={[styles.inputField, {borderWidth: 1}]}
            pColor={COLORS.silver}
            bgColor={COLORS.silver}
            dropDownBorderColor={COLORS.txt}
            listItemColor={COLORS.white}
            listItemLabelColor={COLORS.black}

            //setValue={route.params && type}
          />
        </View>
        {formik.touched.type && formik.errors.type ? (
          <Text style={styles.txtError}>{formik.errors.type}</Text>
        ) : null}

        {formik.values.type !== '' &&
          (formik.values.type === 'individual' ? (
            <View style={{zIndex: 1000}}>
              {route.params && (
                <Text style={styles.labelStyle}>
                  {LABELS.setLabel('MotherTag')}:
                </Text>
              )}
              <CustomDropDown
                placeholder={LABELS.setLabel('Cows')}
                onChangeValue={value => {
                  formik.setFieldValue('cattleId', value);
                }}
                onSelectItem={item =>
                  formik.setFieldValue('mPlaque', item.label)
                }
                searchable={true}
                setZIndex={1200}
                data={CowList}
                labelStyle={styles.input}
                setStyle={[
                  styles.inputField,
                  {
                    borderWidth: 1,
                    borderColor: cattleIdRequired ? COLORS.red : COLORS.green,
                  },
                ]}
                // setValue={route.params && parseInt(motherId)}
                pColor={COLORS.silver}
                bgColor={COLORS.silver}
                dropDownBorderColor={COLORS.txt}
                listItemColor={COLORS.white}
                listItemLabelColor={COLORS.black}
              />
              {cattleIdRequired ? (
                <Text style={styles.txtError}>
                  {MESSAGES.setMessage('Required')}
                </Text>
              ) : null}
            </View>
          ) : (
            <>
              <TextInput
                keyboardType="phone-pad"
                mode="outlined"
                label={LABELS.setLabel('NumberOfCows')}
                style={styles.inputField}
                placeholder={LABELS.setLabel('NumberOfCows')}
                // placeholderTextColor={COLORS.silver}
                value={formik.values.numberOfCow}
                onChangeText={formik.handleChange('numberOfCow')}
                onBlur={formik.handleBlur('numberOfCow')}
                outlineColor={COLORS.outlineColor}
                theme={theme}
              />
              {numberOfCowRequired ? (
                <Text style={styles.txtError}>
                  {MESSAGES.setMessage('Required')}
                </Text>
              ) : null}
            </>
          ))}

        <TextInput
          keyboardType="phone-pad"
          mode="outlined"
          style={[styles.inputField]}
          label={LABELS.setLabel('AMTotal')}
          placeholder={LABELS.setLabel('AMTotal')}
          // placeholderTextColor={COLORS.silver}
          value={formik.values.amTotal}
          onChangeText={formik.handleChange('amTotal')}
          onBlur={formik.handleBlur('amTotal')}
          outlineColor={COLORS.outlineColor}
          theme={theme}
        />

        <TextInput
          outlineColor={COLORS.outlineColor}
          theme={theme}
          keyboardType="phone-pad"
          style={styles.inputField}
          mode="outlined"
          label={LABELS.setLabel('NoonTotal')}
          placeholder={LABELS.setLabel('NoonTotal')}
          // placeholderTextColor={COLORS.silver}
          value={formik.values.noonTotal}
          onChangeText={formik.handleChange('noonTotal')}
          onBlur={formik.handleBlur('noonTotal')}
        />

        <TextInput
          outlineColor={COLORS.outlineColor}
          theme={theme}
          keyboardType="phone-pad"
          style={styles.inputField}
          mode="outlined"
          label={LABELS.setLabel('PMTotal')}
          placeholder={LABELS.setLabel('PMTotal')}
          // placeholderTextColor={COLORS.silver}
          value={formik.values.pmTotal}
          onChangeText={formik.handleChange('pmTotal')}
          onBlur={formik.handleBlur('pmTotal')}
        />

        <TextInput
          outlineColor={COLORS.outlineColor}
          theme={theme}
          keyboardType="phone-pad"
          style={styles.inputField}
          mode="outlined"
          label={LABELS.setLabel('TotalMilkProduced')}
          placeholder={LABELS.setLabel('TotalMilkProduced')}
          // placeholderTextColor={COLORS.silver}
          value={formik.values.milkTotal}
          onChangeText={formik.handleChange('milkTotal')}
          onBlur={formik.handleBlur('milkTotal')}
        />
        {formik.touched.totalUsed && formik.errors.totalUsed ? (
          <Text style={styles.txtError}>{formik.errors.totalUsed}</Text>
        ) : null}
        <TextInput
          outlineColor={COLORS.outlineColor}
          theme={theme}
          keyboardType="phone-pad"
          style={styles.inputField}
          mode="outlined"
          label={LABELS.setLabel('TotalMilkUsed')}
          placeholder={LABELS.setLabel('TotalMilkUsed')}
          // placeholderTextColor={COLORS.silver}
          value={formik.values.totalUsed}
          onChangeText={formik.handleChange('totalUsed')}
          onBlur={formik.handleBlur('totalUsed')}
        />

        <TextInput
          outlineColor={COLORS.outlineColor}
          theme={theme}
          multiline={true}
          numberOfLines={5}
          mode="outlined"
          label={LABELS.setLabel('Note')}
          style={styles.inputField}
          placeholder={LABELS.setLabel('Note')}
          // placeholderTextColor={COLORS.silver}
          value={formik.values.note}
          onChangeText={formik.handleChange('note')}
          onBlur={formik.handleBlur('note')}
        />

        <View>
          <Pressable
            onPress={formik.handleSubmit}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLORS.btnBackPress : COLORS.btnBack,
                flex: 1,
              },

              styles.loginBtn,
            ]}>
            <Text
              style={{
                color: COLORS.txt,
                fontSize: 18,
                fontFamily: FONTS.IRAN_BOLD,
              }}>
              {LABELS.setLabel('Save')}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEditMilkScreen;

const styles = StyleSheet.create({
  loginBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: COLORS.backGround,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.black,
    flex: 1,
  },
  inputField: {
    borderRadius: 7,

    backgroundColor: COLORS.white,
    borderColor: COLORS.btnBack,
    marginBottom: 15,
  },
  txtError: {
    color: COLORS.txtError,
    fontFamily: FONTS.IRAN_REGULAR,

    top: -10,
    left: 5,
  },
  textFont: {fontFamily: FONTS.IRAN_REGULAR},
});
