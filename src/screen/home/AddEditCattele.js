import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';
import {COLORS, FONTS, LABELS, MESSAGES} from '../../constants';
import * as GetData from '../../constants/data';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import moment from 'jalali-moment';
import BreedsModal from '../../components/modal/BreedsModal';
import CustomDropDown from '../../components/CustomDropDown';
import CustomDatePicker from '../../components/CustomDatePicker';
import CategoryModal from '../../components/modal/CategoryModal';
import AddEditBreedModal from '../../components/modal/AddEditBreedModal';
import AddEditGroupModal from '../../components/modal/AddEditGroupModal';
import {toEnglishDigits} from '../../utility';
import {useDispatch} from 'react-redux';
import {
  createCattle,
  getCattlesByGender,
  updateCattle,
} from '../../redux/features/cattleSlice';
import {TextInput, useTheme} from 'react-native-paper';

const AddEditCattele = ({route}) => {
  const fa = true;
  const {
    plaque,
    birthDate: bDate,
    entryDate: eDate,
    breedName,
    name,
    sex,
    cattleStage,
    categoryId,
    groupName,
    motherId,
    fatherId,
    typeObtained,
    note,
    breedsId,
    setCattlesData,
    fPlaque,
    id,
    mPlaque,
    status,
  } = route.params ? route.params : {};

  //modals
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [addEditBreedModalVisible, setAddEditBreedModalVisible] =
    useState(false);
  const [breedsData, setBreedsData] = useState();

  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [addEditGroupModalVisible, setAddEditGroupModalVisible] =
    useState(false);
  const [groupData, setGroupData] = useState();
  //datePicker
  const [bDateModalVisible, setBDateModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(false);
  const [entryDateModalVisible, setEntryDateModalVisible] = useState(false);
  const [entryDate, setEntryDate] = useState(false);

  useEffect(() => {
    const bDate = birthDate
      ? moment(birthDate, 'jYYYY/jMM/jDD').locale('fa').format('YYYY/MM/DD')
      : '';

    formik.setFieldValue('birthDate', bDate ? bDate : '');
    //console.log(formik.values.breedsId);
  }, [birthDate]);

  useEffect(() => {
    const eDate = entryDate
      ? moment(entryDate, 'jYYYY/jMM/jDD').locale('fa').format('YYYY/MM/DD')
      : '';

    formik.setFieldValue('entryDate', eDate ? eDate : '');
  }, [entryDate]);

  // console.log(token);
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params) {
      formik.setValues(route.params);
      formik.setFieldValue('breedsId', breedsId);
      formik.setFieldValue('breedName', breedName);
      formik.setFieldValue('categoryId', categoryId);
      formik.setFieldValue('groupName', groupName);
      navigation.setOptions({title: LABELS.setLabel('EditCattle')});
    }
  }, [route.params]);
  const formik = useFormik({
    initialValues: {
      plaque: '',
      birthDate: '',
      entryDate: '',
      name: '',
      sex: false,
      cattleStage: '',
      categoryId: null,
      motherId: null,
      fatherId: null,
      typeObtained: '',
      note: '',
      breedsId: '',
      weight: '',
      breedName: '',
      groupName: '',
      mPlaque: '',
      fPlaque: '',
    },
    validationSchema: Yup.object({
      plaque: Yup.string().required(MESSAGES.setMessage('PlaqueRequired')),
      sex: Yup.boolean().required(MESSAGES.setMessage('SexRequired')),
      cattleStage: Yup.string().required(
        MESSAGES.setMessage('CattleStageRequired'),
      ),
      typeObtained: Yup.string().required(
        MESSAGES.setMessage('ObtainedEntryCattleRequired'),
      ),
      breedsId: Yup.string().required(MESSAGES.setMessage('BreedRequired')),
    }),
    onSubmit: async formValue => {
      if (route.params) {
        dispatch(updateCattle({id, formValue, navigation, toast}));
      } else {
        dispatch(createCattle({formValue, navigation, toast, dispatch}));
      }
    },
  });
  const [getBreed, setGetBreed] = useState();
  useEffect(() => {
    if (getBreed) {
      formik.setFieldValue('breedsId', getBreed.id);
      formik.setFieldValue('breedName', getBreed.name);
    }
    //console.log(formik.values.breedsId);
  }, [getBreed]);
  const [getGroup, setGetGroup] = useState();
  useEffect(() => {
    if (getGroup) {
      formik.setFieldValue('categoryId', getGroup.id);
      formik.setFieldValue('groupName', getGroup.name);
    }
  }, [getGroup]);

  const [maleCattlesData, setMaleCattlesData] = useState();
  const [femaleCattlesData, setFemaleCattlesData] = useState();
  const [fatherList, setFatherList] = useState([]);
  const [motherList, setMotherList] = useState([]);
  const [toDaye, setToDay] = useState();

  useEffect(() => {
    dispatch(getCattlesByGender({sex: false, setData: setMaleCattlesData}));
    dispatch(getCattlesByGender({sex: true, setData: setFemaleCattlesData}));
    setToDay(moment.from(new Date()).format('jYYYY/jMM/jDD'));
  }, []);
  useEffect(() => {
    if (maleCattlesData) {
      setFatherList(
        maleCattlesData.map(row => ({
          value: row.id,
          label: toEnglishDigits(row.plaque),
        })),
      );
    }
    if (femaleCattlesData) {
      setMotherList(
        femaleCattlesData.map(row => ({
          value: row.id,
          label: toEnglishDigits(row.plaque),
        })),
      );
    }
  }, [maleCattlesData, femaleCattlesData]);
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <AddEditBreedModal
          modalVisible={addEditBreedModalVisible}
          setModalVisible={setAddEditBreedModalVisible}
          setBreedsData={setBreedsData}
        />
        <AddEditGroupModal
          modalVisible={addEditGroupModalVisible}
          setModalVisible={setAddEditGroupModalVisible}
          setGroupsData={setGroupData}
        />
        <BreedsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setBreed={setGetBreed}
          setBreedsData={setBreedsData}
          breedsData={breedsData}
          setAddEditBreedModalVisible={setAddEditBreedModalVisible}
        />
        <CategoryModal
          modalVisible={groupModalVisible}
          setModalVisible={setGroupModalVisible}
          setGroup={setGetGroup}
          setGroupsData={setGroupData}
          groupData={groupData}
          setAddEditGroupModalVisible={setAddEditGroupModalVisible}
        />
        <CustomDatePicker
          modalVisible={bDateModalVisible}
          setModalVisible={setBDateModalVisible}
          selectedDate={birthDate}
          maximumDate={toDaye}
          setSlectedDate={setBirthDate}
          key={'bDate'}
        />
        <CustomDatePicker
          key={'entryDate'}
          modalVisible={entryDateModalVisible}
          setModalVisible={setEntryDateModalVisible}
          selectedDate={entryDate}
          maximumDate={toDaye}
          setSlectedDate={setEntryDate}
        />
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
              styles.zindexStyle,
            ]}>
            <TextInput
              mode="outlined"
              outlineColor={COLORS.onPrimaryColor}
              label={LABELS.setLabel('Breed') + ' *'}
              style={[styles.inputField, styles.zindexStyle, {width: '100%'}]}
              editable={false}
              placeholder={LABELS.setLabel('Breed') + ' *'}
              // placeholderTextColor={COLORS.silver}
              value={(getBreed && getBreed.name) || (route.params && breedName)}
            />
            <AntDesign
              name="caretdown"
              size={13}
              color={COLORS.silver}
              style={{position: 'absolute', right: 10, paddingBottom: 10}}
            />
          </TouchableOpacity>
          {formik.touched.breedsId && formik.errors.breedsId ? (
            <Text style={styles.txtError}>{formik.errors.breedsId}</Text>
          ) : null}
          <TextInput
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={[styles.inputField, styles.zindexStyle]}
            label={LABELS.setLabel('Name')}
            placeholder={LABELS.setLabel('Name')}
            // placeholderTextColor={COLORS.silver}
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          <TextInput
            editable={route.params ? false : true}
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={[styles.inputField, styles.zindexStyle]}
            label={LABELS.setLabel('Plaque') + '*'}
            placeholder={LABELS.setLabel('Plaque') + '*'}
            // placeholderTextColor={COLORS.silver}
            value={formik.values.plaque}
            onChangeText={formik.handleChange('plaque')}
            onBlur={formik.handleBlur('plaque')}
          />
          {formik.touched.plaque && formik.errors.plaque ? (
            <Text style={styles.txtError}>{formik.errors.plaque}</Text>
          ) : null}
          <View style={{zIndex: 200}}>
            {route.params && (
              <Text style={[styles.labelStyle, {zIndex: 1202}]}>
                {LABELS.setLabel('Sex')}:
              </Text>
            )}
            <CustomDropDown
              pColor={COLORS.gray}
              listItemLabelColor={COLORS.gray}
              dropDownBorderColor={COLORS.onPrimaryColor}
              listItemColor={COLORS.white}
              placeholder={LABELS.setLabel('Sex')}
              setZIndex={1000}
              zIndexInverse={5000}
              data={GetData.sexData}
              onChangeValue={value => formik.setFieldValue('sex', value)}
              labelStyle={styles.input}
              setStyle={[styles.inputField, {borderWidth: 1}]}
              setValue={route.params && Boolean(sex)}
            />
          </View>
          {formik.touched.sex && formik.errors.sex ? (
            <Text style={styles.txtError}>{formik.errors.sex}</Text>
          ) : null}
          <View style={{zIndex: 150}}>
            {route.params && (
              <Text style={styles.labelStyle}>
                {LABELS.setLabel('CattleStage')}:
              </Text>
            )}
            <CustomDropDown
              setZIndex={2000}
              zIndexInverse={4000}
              placeholder={LABELS.setLabel('CattleStage')}
              value={formik.values.cattleStage}
              onChangeValue={value =>
                formik.setFieldValue('cattleStage', value)
              }
              data={
                formik.values.sex
                  ? GetData.cattleStageData_FEMALE
                  : GetData.cattleStageData_MALE
              }
              labelStyle={styles.input}
              pColor={COLORS.gray}
              listItemLabelColor={COLORS.gray}
              dropDownBorderColor={COLORS.onPrimaryColor}
              listItemColor={COLORS.white}
              setStyle={[styles.inputField, {borderWidth: 1}]}
              setValue={route.params && cattleStage}
            />
          </View>

          {formik.touched.cattleStage && formik.errors.cattleStage ? (
            <Text style={styles.txtError}>{formik.errors.cattleStage}</Text>
          ) : null}
          <View style={{zIndex: 100}}>
            {route.params && (
              <Text style={styles.labelStyle}>
                {LABELS.setLabel('ObtainedCattle')}:
              </Text>
            )}
            <CustomDropDown
              placeholder={LABELS.setLabel('ObtainedCattle')}
              setZIndex={3000}
              zIndexInverse={3000}
              data={GetData.typeObtainedData}
              onChangeValue={value =>
                formik.setFieldValue('typeObtained', value)
              }
              labelStyle={styles.input}
              pColor={COLORS.gray}
              listItemLabelColor={COLORS.gray}
              dropDownBorderColor={COLORS.onPrimaryColor}
              listItemColor={COLORS.white}
              setStyle={[styles.inputField, {borderWidth: 1}]}
              setValue={route.params && typeObtained}
            />
          </View>
          {formik.touched.typeObtained && formik.errors.typeObtained ? (
            <Text style={styles.txtError}>{formik.errors.typeObtained}</Text>
          ) : null}
          {!route.params ? (
            <TextInput
              keyboardType="phone-pad"
              mode="outlined"
              outlineColor={theme.colors.onPrimary}
              activeOutlineColor={theme.colors.primary}
              style={[styles.inputField, styles.zindexStyle]}
              label={LABELS.setLabel('Weight')}
              placeholder={LABELS.setLabel('Weight')}
              // placeholderTextColor={COLORS.silver}
              value={formik.values.weight}
              onChangeText={formik.handleChange('weight')}
              onBlur={formik.handleBlur('weight')}
            />
          ) : null}
          <TouchableOpacity
            onPress={() => {
              setBDateModalVisible(true);
            }}
            style={[{justifyContent: 'center'}, styles.zindexStyle]}>
            <TextInput
              editable={false}
              mode="outlined"
              outlineColor={theme.colors.onPrimary}
              activeOutlineColor={theme.colors.primary}
              style={[styles.inputField, styles.zindexStyle]}
              label={LABELS.setLabel('BDate')}
              placeholder={LABELS.setLabel('BDate')}
              // placeholderTextColor={COLORS.silver}
              value={formik.values.birthDate}
              onChangeText={formik.handleChange('birthDate')}
              onBlur={formik.handleBlur('birthDate')}
            />
            {formik.values.birthDate && (
              <TouchableOpacity
                style={styles.cleanDate_btn}
                onPress={() => setBirthDate(null)}>
                <AntDesign name="close" size={18} color={COLORS.error} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEntryDateModalVisible(true)}
            style={[{justifyContent: 'center'}, styles.zindexStyle]}>
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.onPrimary}
              activeOutlineColor={theme.colors.primary}
              style={[styles.inputField, styles.zindexStyle]}
              label={LABELS.setLabel('EntryDate')}
              placeholder={LABELS.setLabel('EntryDate')}
              // placeholderTextColor={COLORS.placeHolder}
              value={formik.values.entryDate}
              onChangeText={formik.handleChange('entryDate')}
              onBlur={formik.handleBlur('entryDate')}
              editable={false}
            />
            {formik.values.entryDate && (
              <TouchableOpacity
                style={styles.cleanDate_btn}
                onPress={() => setEntryDate(null)}>
                <AntDesign name="close" size={18} color={COLORS.error} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGroupModalVisible(true)}
            style={styles.zindexStyle}>
            <TextInput
              editable={false}
              mode="outlined"
              outlineColor={theme.colors.onPrimary}
              activeOutlineColor={theme.colors.primary}
              style={[styles.inputField, styles.zindexStyle]}
              label={LABELS.setLabel('Groups')}
              placeholder={LABELS.setLabel('Groups')}
              // placeholderTextColor={COLORS.placeHolder}
              value={(getGroup && getGroup.name) || (route.params && groupName)}
            />
          </TouchableOpacity>
          <View>
            {route.params && (
              <Text style={styles.labelStyle}>
                {LABELS.setLabel('MotherTag')}:
              </Text>
            )}
            <CustomDropDown
              placeholder={LABELS.setLabel('MotherTag')}
              onChangeValue={value => {
                formik.setFieldValue('motherId', value);
              }}
              onSelectItem={item => formik.setFieldValue('mPlaque', item.label)}
              searchable={true}
              setZIndex={4000}
              zIndexInverse={2000}
              data={motherList}
              labelStyle={styles.input}
              pColor={COLORS.gray}
              listItemLabelColor={COLORS.gray}
              dropDownBorderColor={COLORS.onPrimaryColor}
              listItemColor={COLORS.white}
              setStyle={[styles.inputField, {borderWidth: 1}]}
              setValue={route.params && parseInt(motherId)}
            />
          </View>
          <View>
            {route.params && (
              <Text style={styles.labelStyle}>
                {LABELS.setLabel('FatherTag')}:
              </Text>
            )}
            <CustomDropDown
              placeholder={LABELS.setLabel('FatherTag')}
              onChangeValue={value => formik.setFieldValue('fatherId', value)}
              onSelectItem={item => formik.setFieldValue('fPlaque', item.label)}
              searchable={true}
              setZIndex={5000}
              zIndexInverse={1000}
              data={fatherList}
              labelStyle={styles.input}
              pColor={COLORS.gray}
              listItemLabelColor={COLORS.gray}
              dropDownBorderColor={COLORS.onPrimaryColor}
              listItemColor={COLORS.white}
              setStyle={[styles.inputField, {borderWidth: 1}]}
              setValue={route.params && parseInt(fatherId)}
            />
          </View>
          <TextInput
            multiline={true}
            numberOfLines={5}
            mode="outlined"
            outlineColor={theme.colors.onPrimary}
            activeOutlineColor={theme.colors.primary}
            style={[styles.inputField, styles.zindexStyle]}
            label={LABELS.setLabel('Note')}
            placeholder={LABELS.setLabel('Note')}
            // placeholderTextColor={COLORS.placeHolder}
            value={formik.values.note}
            onChangeText={formik.handleChange('note')}
            onBlur={formik.handleBlur('note')}
          />
          <View>
            <Pressable
              onPress={formik.handleSubmit}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? COLORS.btnConfirmPress
                    : COLORS.btnConfirm,
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEditCattele;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: COLORS.backGround,
  },
  labelStyle: {
    color: COLORS.gray,
    backgroundColor: 'transparent',
    borderRadius: 7,
    padding: 3,
    fontFamily: FONTS.IRAN_BOLD,
    position: 'absolute',
    top: -12,
    left: 0,
    zIndex: 1100,
  },
  inputField: {
    borderRadius: 7,

    backgroundColor: COLORS.white,
    borderColor: COLORS.onPrimaryColor,
    marginBottom: 15,
  },
  zindexStyle: {zIndex: -1},
  DropDownField: {
    borderRadius: 7,
    backgroundColor: COLORS.inputFieldBackGround,
    marginBottom: 25,
    borderWidth: 0,
    height: 60,
  },
  input: {
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.gray,
    flex: 1,
  },
  textInputPropsDropDown: {
    borderRadius: 7,
    padding: 14,
    marginBottom: 15,
    backgroundColor: COLORS.inputFieldBackGround,
    color: COLORS.white,
    fontFamily: FONTS.IRAN_REGULAR,
    top: 10,
  },
  txtError: {
    color: COLORS.txtError,
    fontFamily: FONTS.IRAN_BOLD,
    marginBottom: 17,
  },
  PersianDatePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 17,
    borderRadius: 7,
    marginBottom: 25,
    backgroundColor: COLORS.inputFieldBackGround,

    fontFamily: FONTS.IRAN_REGULAR,
  },
  PersianDatePickerText: {
    textAlign: 'center',
    flex: 1,
    padding: 0,
    fontFamily: FONTS.IRAN_REGULAR,
    color: COLORS.inputFieldText,
  },
  loginBtn: {
    padding: 17,
    borderRadius: 7,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  cleanDate_btn: {
    position: 'absolute',
    right: 0,
    padding: 10,
    paddingTop: 5,
  },
});
