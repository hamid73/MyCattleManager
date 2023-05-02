import {I18nManager} from 'react-native';

const fa = I18nManager.isRTL;
export const setMessage = (message, stage) => {
  switch (message) {
    case 'IncorrectPassword':
      return fa ? 'گذر واژه صحیح نمی باشد' : 'Incorrect Password';
    case 'PasswordRequired':
      return fa ? 'گذرواژه الزامی می باشد' : 'Password is Required';
    case 'SavedSuccessfuly':
      return fa ? 'ذخیره شد' : 'Saved Successfuly';
    case 'ConfirmPassRequired':
      return fa
        ? 'تکرار گذرواژه الزامی می باشد'
        : 'Confirm Password is Required';
    case 'IncorrectPass':
      return fa ? 'پسورد با تکرار آن یکی نیست' : 'Passwords must Match';
    case 'FullNameRequired':
      return fa
        ? 'نام و نام خانوادگی الزامی می باشد'
        : 'ّFull Name is Required';
    case 'MobileRequired':
      return fa ? 'موبایل الزامی می باشد' : 'Mobile is Required';
    case 'EmailRequired':
      return fa ? 'ایمیل الزامی می باشد' : 'Email is Required';
    case 'EmailFormat':
      return fa ? 'فرمت ایمیل صحیح نمی باشد' : 'Email format is Incorrect';
    case 'MessageRequired':
      return fa ? 'پیغام الزامی می باشد' : 'Message is Required';
    case 'SendMessageSuccessfuly':
      return fa
        ? 'پیغام شما با موفقیت به تیم پشتیبانی ما ارسال شد'
        : 'Send Message Successfuly';
    case 'PlaqueRequired':
      return fa ? 'پلاک الزامی می باشد' : 'Plaque is Required';

    case 'NewMilkRecord':
      return fa
        ? 'مقدار شیر دوشی جدید ثبت شد'
        : 'The Milking was Successfully Inserted';
    case 'Required':
      return fa ? 'این فیلد الزامی میباشد.' : 'Required Filed';
    case 'DeletedEvent':
      return fa ? 'رویداد حذف شد' : 'Deleted event Successfully';
    case 'DeletingMilkingRecord':
      return fa
        ? 'از حذف شیردوشی ثبت شده مطمئنید؟'
        : 'Are you sure removal MilkingRecord?';
    case 'DeletedMilkingRecord':
      return fa
        ? 'َشیردوشی ثبت شده حذف شد'
        : 'The Milking Record was Successfully Deleted';
    case 'DeletedCattle':
      return fa ? 'از حذف دام مطمئنید؟' : 'Are you sure removal Cattle?';
    case 'EventDateRequired':
      return fa ? 'تاریخ رویداد الزامی می باشد' : 'Event Date is Required';
    case 'TypeEventRequired':
      return fa ? 'نوع رویداد الزامی می باشد' : 'Event Type is Required';
    case 'ResultWeighedRequired':
      return fa ? 'نتیج وزن کشی الزامی می باشد' : 'Result is Required';
    case 'ChangeStage':
      return fa
        ? 'دام شما به ' + stage + ' تبدیل شد'
        : 'The Catlle Stage Changed';
    case 'ChangeStatus':
      return fa
        ? 'وضعیت به ' + stage + ' تبدیل شد'
        : 'The Catlle Status Changed';
    case 'NewCattle':
      return fa
        ? 'یک دام جدید اضافه شد'
        : 'The Cattle was Successfully Inserted';
    case 'NewBreed':
      return fa ? 'نژاد جدید اضافه شد' : 'The Breed was Successfully Inserted';

    case 'NewGroup':
      return fa ? 'گروه جدید اضافه شد' : 'The Group was Successfully Inserted';

    case 'NewSicknes':
      return fa
        ? 'بیماری جدید برای اضافه شد'
        : 'The Sicknes was Successfully Inserted';
    case 'NewEvent':
      return fa
        ? 'رویداد جدید اضافه شد'
        : 'The New Event was Successfully Inserted';
    case 'NewWeight':
      return fa
        ? 'نتیجه وزنکشی اضافه شد'
        : 'The Weighed was Successfully Inserted';

    case 'CattleStatusRequired':
      return fa ? 'وضعیت الزامی میباشد' : 'The status is required';

    case 'SexRequired':
      return fa ? 'جنسیت الزامی می باشد' : 'Sex is Required';
    case 'DeletedSuccessfully':
      return fa ? 'حذف با موفقیت انجام شد' : 'Deleted Successfully';

    case 'CattleStageRequired':
      return fa
        ? 'نام مرحله سنی دام الزامی می باشد'
        : 'Cattle Stage is Required';

    case 'ObtainedEntryCattleRequired':
      return fa
        ? 'نحوه ورود دام به فارم الزامی می باشد'
        : 'How Cattle was Obtained is Required';

    case 'BreedRequired':
      return fa ? 'نام نژاد دام الزامی می باشد' : 'Breed name is Required';

    case 'GroupRequired':
      return fa ? 'نام گروه الزامی می باشد' : 'Group name is Required';
    case 'notFoundKids':
      return fa
        ? 'هیچ فرزند مرتبطی با دام یافت نشد'
        : 'Cattle has no Offspring Linked yet';
    case 'notFoundEvents':
      return fa ? 'هیچ رویداد جدیدی ثبت نشده است' : 'No Events Registered yet';
    case 'ArchiveCattle':
      return fa ? 'دام آرشیو شد' : 'Archive Cattle';
    case 'UnArchiveCattle':
      return fa ? 'دام لغو آرشیو شد' : 'UnArchive Cattle';

    case 'Exit':
      return fa ? 'از برنامه خارج میشوید؟' : 'Exit App?';
    case 'ContactUs':
      return fa
        ? 'ما را با نظرات، انتقاداتتان و ارائه مشکلات برنامه یاری فرمائید'
        : 'Contact Us';
  }
};
