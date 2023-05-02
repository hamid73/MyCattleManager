import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGES, ROUTES } from "../../constants";
import { PREGNANTQUERY } from "../../queries";
import { createEvent } from "./eventSlice";

export const createPregnant = createAsyncThunk(
  "pregnants/createPregnant",
  async ({ formValue, toast, dispatch, navigation }, { rejectWithValue }) => {
    try {
      const response = await PREGNANTQUERY.newPregnant(formValue);

      dispatch(
        createEvent({
          eventValues: {
            type: "pregnant",
            relationId: response.id,
            cattleId: formValue.cattleId,
            createdAt: formValue.createdAt,
            note: formValue.note,
            plaque: formValue.plaque,
            status: formValue.status,
          },
          toast: null,
          navigation,
          dispatch,
        })
      );

      toast.show(MESSAGES.setMessage("NewEvent"), { type: "success" });
      navigation && navigation.goBack();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//console.log("testzdz");
export const getPregnantById = createAsyncThunk(
  "pregnants/getPregnantById",
  async (id) => {
    try {
      return await PREGNANTQUERY.getPregnantById(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePregnant = createAsyncThunk(
  "pregnants/deletePregnant",
  async ({ id }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await PREGNANTQUERY.deletePregnant(id);
      //console.log("🚀 ~ file: pregnantSlice.js:56 ~ response", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePregnant = createAsyncThunk(
  "pregnants/updatePregnant",
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

const pregnantSlice = createSlice({
  name: "pregnant",
  initialState: {
    pregnant: {},
    pregnants: [],

    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getPregnantById.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getPregnantById.fulfilled, (state, action) => {
        state.loading = false;
        state.pregnant = action?.payload;
      }),
      builder.addCase(getPregnantById.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createPregnant.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createPregnant.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("sss");
        state.pregnants.length > 0 && state.pregnants.push(action.payload);
      }),
      builder.addCase(createPregnant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deletePregnant.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deletePregnant.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.pregnants = state.pregnants.filter((item) => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deletePregnant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updatePregnant.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updatePregnant.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.pregnants = state.pregnants.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      }),
      builder.addCase(updatePregnant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default pregnantSlice.reducer;
