import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGES, ROUTES } from "../../constants";
import { CATTLESQUERY, EVENTSQUERY } from "../../queries";
import { changeCattleStage, changeCattleStatus } from "./cattleSlice";
import { deleteMates } from "./matesSlice";
import { deletePregnant } from "./pregnantSlice";
import { deleteSicknes } from "./sicknesSlice";
import { deleteWeighed } from "./weighedSlice";

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (
    { eventValues, toast, navigation, dispatch, cattleStage },
    { rejectWithValue }
  ) => {
    //console.log("🚀 ~ file: eventSlice.js:9 ~ eventValues", eventValues);
    try {
      const response = await EVENTSQUERY.newEvent(eventValues);
      if (dispatch) {
        switch (eventValues.type) {
          case "dryOff":
            dispatch(
              changeCattleStatus({
                id: eventValues.cattleId,
                newStatus: "nonLactating",
              })
            );
            navigation && navigation.navigate(ROUTES.HOME);
            break;
          case "giveBirth":
            dispatch(
              changeCattleStatus({
                id: eventValues.cattleId,
                newStatus: "lactating",
              })
            );
            navigation && navigation.navigate(ROUTES.HOME);
            break;
          case "pregnant":
            dispatch(
              changeCattleStatus({
                id: eventValues.cattleId,
                newStatus:
                  eventValues.status === "lactating" ? "lac&preg" : "preg",
              })
            );
            navigation && navigation.navigate(ROUTES.HOME);
            break;
          case "weaned":
            if (cattleStage === "calf") {
              dispatch(
                changeCattleStage({
                  id: eventValues.cattleId,
                  newStage: "weaner",
                })
              );
            }
            navigation && navigation.navigate(ROUTES.HOME);
            break;
          default:
            navigation && navigation.goBack();
            break;
        }
      } else {
        navigation && navigation.goBack();
      }

      toast && toast.show(MESSAGES.setMessage("NewEvent"), { type: "success" });

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//console.log("testzdz");
export const getEvents = createAsyncThunk("events/getEvents", async () => {
  try {
    return await EVENTSQUERY.getEvents();
  } catch (error) {
    console.log(error);
  }
});

export const getEventsByCattleId = createAsyncThunk(
  "events/getEventsByCattleId",
  async ({ cattleId }) => {
    try {
      return await EVENTSQUERY.getEventsByCattleId(cattleId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEventByArchive = createAsyncThunk(
  "events/getEventByArchive",
  async ({ cattleId }) => {
    try {
      return await EVENTSQUERY.getEventsByArchive(cattleId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async ({ id, relationId, type, toast, dispatch }, { rejectWithValue }) => {
    try {
      //console.log(id);
      switch (type) {
        case "mated":
          dispatch(deleteMates({ id: relationId }));
          break;
        case "pregnant":
          dispatch(deletePregnant({ id: relationId }));
          break;
        case "weight":
          dispatch(deleteWeighed({ id: relationId }));
          break;
        case "medicated":
          dispatch(deleteSicknes({ id: relationId }));
          break;
      }
      const response = await EVENTSQUERY.deleteEvent(id);
      toast.show(MESSAGES.setMessage("DeletedEvent"), { type: "success" });
      //console.log(response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteArchiveEvent = createAsyncThunk(
  "events/deleteArchiveEvent",
  async ({ cattleId, toast }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await EVENTSQUERY.deleteEventByArchive(cattleId);
      toast &&
        toast.show(MESSAGES.setMessage("UnArchiveCattle"), { type: "success" });
      //console.log(response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, formValue, toast, navigation }, { rejectWithValue }) => {
    try {
      // console.log(id);
      // const response = await api.updateCattele(formValue, id);

      toast.show("پلاک " + formValue.plaque + " ویرایش شد.", {
        type: "success",
      });
      navigation.goBack();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    event: {},
    events: [],
    allEvents: [],

    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.allEvents = action?.payload;
      }),
      builder.addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(getEventByArchive.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getEventByArchive.fulfilled, (state, action) => {
        state.loading = false;

        state.event = action?.payload;
      }),
      builder.addCase(getEventByArchive.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(getEventsByCattleId.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getEventsByCattleId.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action?.payload;
      }),
      builder.addCase(getEventsByCattleId.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createEvent.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        state.allEvents.push(action.payload);
      }),
      builder.addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteEvent.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.events = state.events.filter((item) => item.id !== id);
          state.allEvents = state.allEvents.filter((item) => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteArchiveEvent.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteArchiveEvent.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.events = state.events.filter((item) => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteArchiveEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateEvent.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.events = state.events.map((item) =>
            item.id === id ? action.payload : item
          );
          state.allEvents = state.allEvents.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      }),
      builder.addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default eventSlice.reducer;
