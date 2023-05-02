import {I18nManager} from 'react-native';

const fa = I18nManager.isRTL;

export const setLabel = label => {
  switch (label) {
    case 'Damyar':
      return fa ? 'اپلیکیشن دامیار(مدیریت گاو و گاوداری من)' : 'Damyar App';
    case 'DownloadLink':
      return fa ? 'لینک دانلود' : 'Download Link';
    case 'WebSite':
      return fa ? 'وب سایت' : 'WebSite';
    case 'InstaPage':
      return fa ? 'پیج اینستاگرام ما را دنبال کنید' : 'Instagram Page';
    case 'ActiveLogin':
      return fa ? 'فعال سازی ورود با اثر انگشت' : 'Active Login Me';
    case 'RemmemberMe':
      return fa ? 'من را به خاطر بسپار' : 'Remmember Me';
    case 'Password':
      return fa ? 'گذرواژه' : 'Password';
    case 'Welcome':
      return fa ? 'خوش آمدید' : 'Welcome';
    case 'Hint':
      return fa ? 'راهنمای گذرواژه' : 'Hint';
    case 'ConfirmPassword':
      return fa ? 'تکرار گذرواژه' : 'Confirm Password';
    case 'BreedersInfo':
      return fa ? 'نژاد ها' : 'Breeders';
    case 'GroupsInfo':
      return fa ? 'گروه ها' : 'Groups';
    case 'LoginInfo':
      return fa ? 'اطلاعات کاربری' : 'Login Info';
    case 'Name&Family':
      return fa ? 'نام و نام خانوادگی' : 'Name & Family';
    case 'Mobile':
      return fa ? 'موبایل' : 'Phone Number';
    case 'WhatsApp':
      return fa ? 'واتساپ' : 'WhatsApp';
    case 'WebSite':
      return fa ? 'وب سایت' : 'Web Site';
    case 'Email':
      return fa ? 'ایمیل' : 'Email';
    case 'Address':
      return fa ? 'آدرس' : 'Address';
    case 'Message':
      return fa ? 'پیام' : 'Message';
    case 'PaymentPermium':
      return fa ? 'خرید اشتراک ویژه' : 'Buy Premium Account';
    case 'Buy':
      return fa ? 'خرید اشتراک' : 'Buy Premium Account';
    case 'Later':
      return fa ? 'باشه برای بعدا' : 'OK for Later';
    case 'Home':
      return fa ? 'صفحه اصلی' : 'Home';
    case 'Language':
      return fa ? 'انتخاب زبان' : 'Slecting Language';
    case 'Premium':
      return fa ? 'ارتقاء حساب' : 'Premium Account';
    case 'PremiumRequest':
      return fa ? 'اشتراک بخر' : 'Buy Premium Account';
    case 'SignOut':
      return fa ? 'خروج' : 'Sign Out';
    case 'IntroduceFriends':
      return fa ? 'معرفی به دوستان' : 'Introduce to Friends';
    case 'Favorite':
      return fa ? 'ویژه' : 'Favorite';
    case 'Milking':
      return fa ? 'شیر دوشی' : 'Milk Record';
    case 'Setting':
      return fa ? 'تنظیمات' : 'Setting';
    case 'Learn':
      return fa ? 'آموزش' : 'Traning';
    case 'AboutUs':
      return fa ? 'درباره دامیار' : 'About Us';
    case 'Support':
      return fa ? 'پشتیبانی' : 'Support';
    case 'Damyar':
      return fa ? 'دامیار' : 'Damyar';
    case 'Guest':
      return fa ? 'کاربر میهمان' : 'Guest User';

    case 'MilkingDate':
      return fa ? 'تاریخ شیردوشی' : 'Milking Date';
    case 'DeletingMilkingRecord':
      return fa ? 'حذف شیردوشی ثبت شده' : 'Deleting Milking Record';
    case 'Used':
      return fa ? 'استفاده شده' : 'Used';
    case 'Pure':
      return fa ? 'خالصی' : 'Pure';
    case 'TotalMilk':
      return fa ? 'کل شیر' : 'Total';
    case 'NumberOfCows':
      return fa ? 'تعداد گاو های شیر' : 'Number of Cows Milk';
    case 'TotalMilkProduced':
      return fa ? 'کل شیر جمع شده' : 'Total Milk Produced';
    case 'TotalMilkUsed':
      return fa
        ? 'َشیر مصرف شده (گوساله/مصارف دیگر)'
        : 'Total Used (Calves/Consurmed)';
    case 'AMTotal':
      return fa ? 'مقدار شیر صبح' : 'AM Total';
    case 'NoonTotal':
      return fa ? 'مقدار شیر عصر' : 'Noon Total';
    case 'PMTotal':
      return fa ? 'مقدار شیر شب' : 'PM Total';
    case 'Bulk':
      return fa ? 'فله' : 'Bulk';
    case 'BulkMilk':
      return fa ? 'شیر فله' : 'Bulk Milk';
    case 'AddMilk':
      return fa ? 'افزودن شیرها' : 'AddMilk';
    case 'Individual':
      return fa ? 'تکی' : 'Individual';
    case 'IndividualMilk':
      return fa ? 'شیر تکی' : 'Individual Milk';
    case 'CopyTo':
      return fa ? 'کپی برداشتن' : 'Copy To';
    case 'MilkType':
      return fa ? 'نوع شیر' : 'Milk Type';
    case 'L7Days':
      return fa ? '7 روز گذشته' : 'Last 7 Days';
    case 'CMonth':
      return fa ? 'ماه جاری' : 'Currnet Month';
    case 'PMonth':
      return fa ? 'ماه گذشته' : 'Previous Month';
    case 'L3Month':
      return fa ? '3 ماه گذشته' : 'Last 3 Month';
    case 'L6Month':
      return fa ? '6 ماه گذشته' : 'Last 6 Month';
    case 'L12Month':
      return fa ? '12 ماه گذشته' : 'Last 12 Month';
    case 'L6Years':
      return fa ? '6 سال گذشته' : 'Last 6 Years';
    case 'AllTimes':
      return fa ? 'همه' : 'All Times';
    case 'PYears':
      return fa ? 'سال گذشته' : 'Previous Years';
    case 'CustomRange':
      return fa ? 'تاریخ دستی' : 'Custom Range';
    case 'Years':
      return fa ? 'سال' : 'Years';
    case 'Months':
      return fa ? 'ماه' : 'Months';
    case 'Days':
      return fa ? 'روز' : 'Days';
    case 'Cattles':
      return fa ? 'دام ها' : 'Cattles';
    case 'Cattle':
      return fa ? 'دام' : 'Cattle';
    case 'RegNewCalf':
      return fa
        ? 'برای ثبت گوساله جدید کلیک کنید'
        : 'Click here to register ther calf...';
    case 'UpdatedSuccessfully':
      return fa ? 'تغییرات اعمال شد' : 'Updated Successfully';
    case 'َAsDate':
      return fa ? 'از تاریخ' : 'َAs Date';
    case 'َToDate':
      return fa ? 'تا تاریخ' : 'To Date';
    case 'AllActive':
      return fa ? 'دام های فعال' : 'All Active';
    case 'Cows':
      return fa ? 'دام های شیرده' : 'Cows';
    case 'AdvancedSearch':
      return fa ? 'جستجوی پیشرفته' : 'Advanced Search';
    case 'Heifers':
      return fa ? 'تلیسه ها' : 'Heifers';
    case 'NonLactatings':
      return fa ? 'دام های خشک' : 'Non Lactating';
    case 'Calves':
      return fa ? 'گوساله ها' : 'Calves';
    case 'Bulls':
      return fa ? 'دام های نر' : 'Bulls';
    case 'PregnantOnly':
      return fa ? 'دام های آبستن' : 'Pregnant Only';
    case 'LactatingOnly':
      return fa ? 'دام های شیرده' : 'Lactating Only';
    case 'Steers':
      return fa ? 'گوساله های نر' : 'Steers';
    case 'Weaners':
      return fa ? 'از شیر گرفته ها' : 'Weaners';
    case 'Archived':
      return fa ? 'آرشیو شده ها' : 'Archived';
    case 'Insemination':
      return fa ? 'تلقیح ها' : 'Insemination';
    case 'Status':
      return fa ? 'وضعیت' : 'Status';
    case 'Abortions':
      return fa ? 'سقط ها' : 'Abortions';
    case 'Remark':
      return fa ? 'تذکر' : 'Remark';
    case 'EditCattle':
      return fa ? 'ویرایش دام' : 'Edit Cattle';
    case 'BreedingInsights':
      return fa
        ? 'دیدکلی دوره دام (12 ماه گذشته)'
        : 'Breeding Insights (Last 12 Month)';
    case 'Reason':
      return fa ? 'علت' : 'Reason';
    case 'Amount':
      return fa ? 'مبلغ' : 'Amount';
    case 'DeletedCattle':
      return fa ? 'حذف دام!' : 'Deleted Cattle!';

    case 'EventName':
      return fa ? 'نام رویداد' : 'Event Name';
    case 'AbortedPregnancy':
      return fa ? 'سقط شده' : 'Aborted Pregnancy';
    case 'Symptoms':
      return fa ? 'علائم بیماری' : 'Symptoms for Sickness';
    case 'Lactating':
      return fa ? 'شیرده' : 'Lactating';
    case 'NonLactating':
      return fa ? 'خشک' : 'Non Lactating';
    case 'Lac&Preg':
      return fa ? 'آبستن و شیرده' : 'Lactating & Pregnant';
    case 'MatingDate':
      return fa ? 'تاریخ تلقیح/جفت شدن' : 'Insemination/Mating Date';
    case 'DeliveryDate':
      return fa
        ? 'تاریخ زایمان (283 روز)'
        : 'Expected Delivery Date (283 Days)';
    case 'Diagnosis':
      return fa ? 'تشخیص' : 'Diagnosis';
    case 'Kg':
      return fa ? 'کیلوگرم' : 'Kg';

    case 'Technician':
      return fa ? 'نام دکتر یا تکنسین' : 'Name of Technician';
    case 'ResonArchive':
      return fa ? 'علت آرشیو شدن دام' : 'Reson for Archiving';
    case 'NameVaccinated':
      return fa ? 'نام واکسن دریافت شده' : 'Name of Medicine Given';
    case 'NameEvent':
      return fa ? 'نام رویداد' : 'Name of Event';
    case 'MilkRecord':
      return fa ? 'ثبت شیردوشی' : 'Milk Record';
    case 'HeateDate':
      return fa ? 'تاریخ احتمالی برگشت دام' : 'Estimated return to Heat Date';
    case 'SemenUsed':
      return fa ? 'اسپرم استفاده شده' : 'Semen Used';
    case 'Semen/Tag':
      return fa
        ? 'اسپرم/ شماره پلاک دام نر پدر'
        : 'Semen/Tag no. of Bull Responsible';

    case 'Events':
      return fa ? 'رویداد ها' : 'Events';
    case 'AddEvents':
      return fa ? 'افزودن رویداد' : 'Add Event';

    case 'Transactions':
      return fa ? 'معاملات' : 'Transactions';

    case 'Female':
      return fa ? 'ماده' : 'Female';

    case 'Male':
      return fa ? 'نر' : 'Male';

    case 'calf':
    case 'Calf':
      return fa ? 'گوساله' : 'Calf';

    case 'weaner':
    case 'Weaner':
      return fa ? 'قطع شیر' : 'Weaner';

    case 'heifer':
    case 'Heifer':
      return fa ? 'تلیسه' : 'Heifer';

    case 'cow':
    case 'Cow':
      return fa ? 'دام شیرده' : 'Cow';

    case 'steer':
    case 'Steer':
      return fa ? 'گوساله نر' : 'Steer';

    case 'bull':
    case 'Bull':
      return fa ? 'دام نر' : 'Bull';

    case 'born':
    case 'Born':
      return fa ? 'متولده شده در فارم' : 'Born on Farm';

    case 'purchased':
    case 'Purchased':
      return fa ? 'خریداری شده' : 'Purchased';

    case 'other':
    case 'otherArchive':
    case 'Other':
      return fa ? 'روش دیگر' : 'Other';

    case 'OtherEvent':
      return fa ? 'رویداد های دیگر' : 'Other';
    case 'Lost':
    case 'lost':
      return fa ? 'گمشده' : 'Lost';
    case 'Dead':
    case 'dead':
      return fa ? 'مرگ' : 'Dead';
    case 'Sold':
    case 'sold':
      return fa ? 'فروش' : 'sold';

    case 'Breed':
      return fa ? 'نژاد دام' : "Cattle's Breed";

    case 'Name':
      return fa ? 'نام' : 'Name';

    case 'Sex':
      return fa ? 'جنسیت' : 'Gender';

    case 'CattleStage':
      return fa ? 'نام مرحله سنی دام' : 'Cattle Stage';

    case 'Weight':
      return fa ? 'وزن' : 'Weight';

    case 'BDate':
      return fa ? 'تاریخ تولد' : 'Date of Birth';
    case 'Age':
      return fa ? 'سن' : 'Age';
    case 'EntryDate':
      return fa ? 'تاریخ ورود به فارم' : 'Date of Entry on the Farm';
    case 'JoinedOn':
      return fa ? 'ورود به فارم' : 'Joined On';
    case 'Groups':
      return fa ? 'گروه' : "Cattle's Group";

    case 'MotherTag':
      return fa ? 'پلاک مادر' : "Mother's Tag no";

    case 'FatherTag':
      return fa ? 'پلاک پدر' : "Father's Tag no";

    case 'Note':
      return fa ? 'یادداشت' : 'Notes';

    case 'ObtainedCattle':
      return fa ? 'نحوه ورود دام به فارم' : 'How Cattle was Obtained';

    case 'Plaque':
      return fa ? 'پلاک' : 'Tag no';

    case 'Save':
      return fa ? 'ذخیره' : 'Save';

    case 'AddCattle':
      return fa ? 'دام جدید' : 'New Cattle';

    case 'AddBreedModal':
      return fa ? 'ایجاد نژاد جدید' : 'Create New Breed';

    case 'AddGroupModal':
      return fa ? 'ایجاد گروه جدید' : 'Create New Group';

    case 'Search':
      return fa ? 'جستجو' : 'ُSearch';

    case 'Cancel':
      return fa ? 'انصراف' : 'Cancel';

    case 'ItemNotFound':
      return fa
        ? 'هیچ فیلدی برای نمایش وجود ندارد!'
        : "There's nothing to show!";

    case 'NewBreed':
      return fa ? 'نژاد جدید' : 'New Breed';

    case 'UpdateBreed':
      return fa ? 'ویرایش نژاد' : 'Edited at';

    case 'ViewCattle':
      return fa ? 'نمایش جزئیات دام' : 'Details Cattle';
    case 'Details':
      return fa ? 'جزئیات' : 'Details';
    case 'Male':
      return fa ? 'نر' : 'Male';
    case 'Female':
      return fa ? 'ماده' : 'Female';
    case 'Source':
      return fa ? 'مبداء' : 'Source';
    case 'Update':
      return fa ? 'ویرایش' : 'Edit';
    case 'Mother':
      return fa ? 'مادر' : 'Mother';
    case 'Father':
      return fa ? 'پدر' : 'Father';
    case 'GeneralDet':
      return fa ? 'اطلاعات عمومی دام' : 'General Details';
    case 'CattleKids':
      return fa ? 'فرزندان دام' : "Cattle's Offspring";
    case 'Delete':
      return fa ? 'حذف' : 'Delete';
    case 'ArchiveDet':
      return fa ? 'جزئیات آرشیو' : 'Archive Details)';
    case 'Archive':
      return fa ? 'آرشیو (فروش، مرگ و ...)' : 'Archive (Sold,Dead...)';
    case 'UnArchive':
      return fa ? 'لغو آرشیو' : 'UnArchive';
    case 'Pdf':
      return fa ? 'خروجی PDF' : 'Export PDF';
    case 'WeightRep':
      return fa ? 'گزارش وزن گیری' : 'Weight Report';
    case 'ChangeStage':
      return fa ? 'تغییر وضعیت سنی دام' : 'Change Stage';
    case 'ChangeStatus':
      return fa ? 'تغییر وضعیت دام' : 'Change Status';
    case 'eventDate':
      return fa ? 'تاریخ رویداد' : 'Event Date';
    case 'Weighed':
      return fa ? 'وزن کشی' : 'Weighed';
    case 'EventDate':
      return fa ? 'تاریخ رویداد' : 'Event Date';
    case 'EventType':
      return fa ? 'نوع رویداد رو انتخاب کنید' : 'Select Event Type *';
    case 'Medicated':
      return fa ? 'تحت درمان/دارو' : 'Treated/Medicated';
    case 'Weaned':
      return fa ? 'از شیر گرفتن' : 'Weaned';
    case 'Castrated':
      return fa ? 'اخته شده' : 'Castrated';
    case 'Vaccinated':
      return fa ? 'واکسینه شده' : 'Vaccinated';
    case 'DryOff':
      return fa ? 'خشک شدن' : 'Dry Off';
    case 'Mated':
      return fa ? 'تلقیح/جفت شده' : 'Inseminated/Mated';
    case 'GiveBirth':
      return fa ? 'زایمان' : 'Give Birth';
    case 'Pregnant':
      return fa ? 'حامله' : 'Pregnant';
    case 'Yes':
      return fa ? 'بله' : 'Yes';
    case 'No':
      return fa ? 'خیر' : 'No';
  }
};
