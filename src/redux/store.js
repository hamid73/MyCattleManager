import { configureStore } from "@reduxjs/toolkit";

import CattleReducer from "./features/cattleSlice";
import BreedReducer from "./features/breedSlice";
import GroupReducer from "./features/groupSlice";
import EventReducer from "./features/eventSlice";
import WeighedReducer from "./features/weighedSlice";
import SicknesReducer from "./features/sicknesSlice";
import MatesReducer from "./features/matesSlice";
import PregnantReducer from "./features/pregnantSlice";
import MilkRecordReducer from "./features/milkRecordSlice";

export default configureStore({
  reducer: {
    cattle: CattleReducer,
    breed: BreedReducer,
    group: GroupReducer,
    event: EventReducer,
    weighed: WeighedReducer,
    sicknes: SicknesReducer,
    mated: MatesReducer,
    pregnant: PregnantReducer,
    milkRecord: MilkRecordReducer,
  },
});
