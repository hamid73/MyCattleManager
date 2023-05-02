import AbortedPregnancyBox from "./AbortedPregnancyBox";
import AddEditGiveBirthInput from "./AddEditGiveBirthInput";
import AddEditMatedInput from "./AddEditMatedInput";
import AddEditMedicated from "./AddEditMedicated";
import AddEditOtherInput from "./AddEditOtherInput";
import AddEditPregnantInput from "./AddEditPregnantInput";
import AddEditVaccinatedInput from "./AddEditVaccinatedInput";
import AddEditWeighedInput from "./AddEditWeighedInput";
import GiveBirthBox from "./boxes/GiveBirthBox";
import MatesBox from "./boxes/MatesBox";
import MedicatedBox from "./boxes/MedicatedBox";
import PregnantBox from "./boxes/PregnantBox";
import VaccinatedBox from "./boxes/VaccinatedBox";
import CastratedBox from "./CastratedBox";
import DryOffBox from "./DryOffBox";
import OtherEventBox from "./OtherEventBox";
import WeanedBox from "./WeanedBox";
import WeighedBox from "./WeighedBox";

export const SetEvent = (type, eventData, { general }) => {
  // console.log("🚀 ~ file: index.js:21 ~ SetEvent ~ general", general);
  switch (type) {
    case "weight":
      return (
        <WeighedBox
          eventData={eventData}
          key={eventData.id}
          general={general}
        />
      );
    case "dryOff":
      return (
        <DryOffBox eventData={eventData} key={eventData.id} general={general} />
      );
    case "abortedPregnancy":
      return (
        <AbortedPregnancyBox
          eventData={eventData}
          key={eventData.id}
          general={general}
        />
      );
    case "otherEvent":
      return (
        <OtherEventBox
          eventData={eventData}
          key={eventData.id}
          general={general}
        />
      );
    case "weaned":
      return (
        <WeanedBox eventData={eventData} key={eventData.id} general={general} />
      );
    case "castrated":
      return (
        <CastratedBox
          eventData={eventData}
          key={eventData.id}
          general={general}
        />
      );
    case "medicated":
      return (
        <MedicatedBox
          eventData={eventData}
          key={eventData.id}
          general={general}
        />
      );
    case "mated":
      return (
        <MatesBox eventData={eventData} key={eventData.id} general={general} />
      );
    case "pregnant":
      return (
        <PregnantBox
          eventData={eventData}
          key={eventData.id}
          general={general}
        />
      );
    case "giveBirth":
      return <GiveBirthBox eventData={eventData} key={eventData.id} />;
    case "vaccinated":
      return <VaccinatedBox eventData={eventData} key={eventData.id} />;
  }
};

export const SetInputEvent = (
  type,
  setEventValues,
  setModalDeliveryDateVisible,
  setModalVisible,
  getMatingDate,
  getDeliveryDate
) => {
  // console.log("🚀 ~ file: index.js:13 ~ SetInputEvent ~ type", type);
  switch (type) {
    case "weight":
      return <AddEditWeighedInput setEventValues={setEventValues} />;
    case "medicated":
      return <AddEditMedicated setEventValues={setEventValues} />;
    case "vaccinated":
      return <AddEditVaccinatedInput setEventValues={setEventValues} />;
    case "otherEvent":
      return <AddEditOtherInput setEventValues={setEventValues} />;
    case "mated":
      return <AddEditMatedInput setEventValues={setEventValues} />;
    case "giveBirth":
      return <AddEditGiveBirthInput setEventValues={setEventValues} />;
    case "pregnant":
      return (
        <AddEditPregnantInput
          setEventValues={setEventValues}
          setModalDeliveryDateVisible={setModalDeliveryDateVisible}
          setModalVisible={setModalVisible}
          getMatingDate={getMatingDate}
          getDeliveryDate={getDeliveryDate}
        />
      );
  }
};
