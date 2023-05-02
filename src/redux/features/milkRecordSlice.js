import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGES, ROUTES } from "../../constants";
import { MILKRECORDQUERY } from "../../queries";

export const createMilkRecord = createAsyncThunk(
  "milkRecords/createMilkRecord",
  async ({ formValue, toast, dispatch, navigation }, { rejectWithValue }) => {
    //console.log("🚀 ~ file: milkRecordSlice.js:8 ~ formValue", formValue);
    try {
      const response = await MILKRECORDQUERY.newMilkRecord(formValue);
      //console.log("🚀 ~ file: milkRecordSlice.js:11 ~ response", response);

      toast.show(MESSAGES.setMessage("NewMilkRecord"), { type: "success" });
      navigation && navigation.goBack();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//console.log("testzdz");
export const getMilkRecordById = createAsyncThunk(
  "milkRecords/getMilkRecordById",
  async (id) => {
    try {
      return await MILKRECORDQUERY.getMilkRecordById(id);
    } catch (error) {
      console.log(error);
    }
  }
);
export const getMilkingRecords = createAsyncThunk(
  "milkRecords/getMilkingRecords",
  async (id) => {
    try {
      return await MILKRECORDQUERY.getMilkRecords();
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteMilkRecord = createAsyncThunk(
  "milkRecords/deleteMilkRecord",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await MILKRECORDQUERY.deleteMilkRecord(id);
      toast.show(MESSAGES.setMessage("DeletedMilkingRecord"), {
        type: "success",
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMilkRecord = createAsyncThunk(
  "milkRecords/updateMilkRecord",
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

const milkRecordSlice = createSlice({
  name: "milkRecord",
  initialState: {
    milkRecord: {},
    milkRecords: [],

    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getMilkingRecords.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getMilkingRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.milkRecords = action?.payload;
      }),
      builder.addCase(getMilkingRecords.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(getMilkRecordById.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getMilkRecordById.fulfilled, (state, action) => {
        state.loading = false;
        state.milkRecord = action?.payload;
      }),
      builder.addCase(getMilkRecordById.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createMilkRecord.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createMilkRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.milkRecords.push(action.payload);
      }),
      builder.addCase(createMilkRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteMilkRecord.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteMilkRecord.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.milkRecords = state.milkRecords.filter(
            (item) => item.id !== id
          );
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteMilkRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateMilkRecord.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateMilkRecord.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.milkRecords = state.milkRecords.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      }),
      builder.addCase(updateMilkRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default milkRecordSlice.reducer;
