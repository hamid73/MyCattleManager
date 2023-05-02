import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGES, ROUTES } from "../../constants";
import { MATESQUERY } from "../../queries";
import { createEvent } from "./eventSlice";

export const createMates = createAsyncThunk(
  "mateses/createMates",
  async ({ formValue, toast, dispatch, navigation }, { rejectWithValue }) => {
    try {
      const response = await MATESQUERY.newMates(formValue);

      dispatch(
        createEvent({
          eventValues: {
            type: "mated",
            relationId: response.id,
            cattleId: formValue.cattleId,
            createdAt: formValue.createdAt,
            note: formValue.note,
            plaque: formValue.plaque,
          },
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
export const getMatesById = createAsyncThunk(
  "mateses/getMatesById",
  async (id) => {
    try {
      return await MATESQUERY.getMatesById(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteMates = createAsyncThunk(
  "mateses/deleteMates",
  async ({ id }, { rejectWithValue }) => {
    console.log("🚀 ~ file: mateseslice.js ~ line 56 ~ matesId", id);
    try {
      //console.log(id);
      const response = await MATESQUERY.deleteMates(id);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMates = createAsyncThunk(
  "mateses/updateMates",
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

const matesSlice = createSlice({
  name: "mates",
  initialState: {
    mates: {},
    mateses: [],

    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getMatesById.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getMatesById.fulfilled, (state, action) => {
        state.loading = false;
        state.mates = action?.payload;
      }),
      builder.addCase(getMatesById.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createMates.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createMates.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("sss");
        state.mateses.length > 0 && state.mateses.push(action.payload);
      }),
      builder.addCase(createMates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteMates.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteMates.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.mateses = state.mateses.filter((item) => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteMates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateMates.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateMates.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.mateses = state.mateses.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      }),
      builder.addCase(updateMates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default matesSlice.reducer;
