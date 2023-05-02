import { ICONS, LABELS } from ".";

export const SetIcon = (icoName, sex) => {
  switch (icoName) {
    case "calf":
      return sex && sex === 0 ? ICONS.calf : ICONS.calfMale || ICONS.calf;
    case "calves":
      return ICONS.calves;
    case "steer":
      return ICONS.steer;
    case "steers":
      return ICONS.steers;
    case "weaner":
      return sex && sex === 0 ? ICONS.weaner : ICONS.weanerMale || ICONS.weaner;
    case "weaners":
      return ICONS.weaners;
    case "heifer":
      return ICONS.heifer;
    case "heifers":
      return ICONS.heifers;
    case "bull":
      return ICONS.bull;
    case "bulls":
      return ICONS.bulls;
    case "cow":
      return ICONS.cow;
    case "cows":
      return ICONS.cows;
    case "event":
      return ICONS.event;
    case "convert":
      return ICONS.convert;
    case "Status":
      return ICONS.status;
    case "unarchive":
      return ICONS.unarchive;
    case "pregnanc":
      return ICONS.pregnanc;
    case "lactating":
      return ICONS.lactating;
    case "dryoffs":
      return ICONS.dryoffs;
  }
};

export const SetNameStage = (name) => {
  switch (name) {
    case "calf":
      return LABELS.setLabel("Calf");
    case "steer":
      return LABELS.setLabel("Steer");
    case "weaner":
      return LABELS.setLabel("Weaner");
    case "heifer":
      return LABELS.setLabel("Heifer");
    case "bull":
      return LABELS.setLabel("Bull");
    case "cow":
      return LABELS.setLabel("Cow");
  }
};
export const SetNameStatus = (name) => {
  switch (name) {
    case "lactating":
      return LABELS.setLabel("Lactating");
    case "nonLactating":
      return LABELS.setLabel("NonLactating");
    case "pregnant":
      return LABELS.setLabel("Pregnant");
    case "lac&preg":
      return LABELS.setLabel("Lac&Preg");
    default:
      return LABELS.setLabel("NonLactating");
  }
};
