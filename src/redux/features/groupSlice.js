import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGES, ROUTES } from "../../constants";
import { GROUPSQUERY } from "../../queries";

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async ({ formValue, toast, navigation }, { rejectWithValue }) => {
    try {
      const response = await GROUPSQUERY.newGroup(formValue.name);
      toast.show(MESSAGES.setMessage("NewGroup"), { type: "success" });
      navigation && navigation.goBack();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//console.log("testzdz");
export const getGroups = createAsyncThunk("groups/getGroups", async () => {
  try {
    return await GROUPSQUERY.getGroups();
  } catch (error) {
    console.log(error);
  }
});

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async ({ id, toast }, { rejectWithValue }) => {
    console.log("🚀 ~ file: groupSlice.js ~ line 56 ~ groupId", id);
    try {
      //console.log(id);
      // const response = await api.deleteCattele(id);
      toast.show("حذف دام با موفقیت انجام شد", { type: "success" });
      //console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
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

const groupSlice = createSlice({
  name: "group",
  initialState: {
    group: {},
    groups: [],

    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getGroups.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action?.payload;
      }),
      builder.addCase(getGroups.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createGroup.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload);
      }),
      builder.addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteGroup.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.groups = state.groups.filter((item) => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateGroup.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.groups = state.groups.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      }),
      builder.addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default groupSlice.reducer;
