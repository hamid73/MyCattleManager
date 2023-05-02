import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "jalali-moment";
import { LABELS, MESSAGES, ROUTES } from "../../constants";
import { SetNameStage, SetNameStatus } from "../../constants/setIcon";
import { CATTLESQUERY } from "../../queries";
import { createWeighed } from "./weighedSlice";

export const createCattle = createAsyncThunk(
  "cattles/createCattle",
  async ({ formValue, navigation, toast, dispatch }, { rejectWithValue }) => {
    try {
      const response = await CATTLESQUERY.newCattle(formValue);
      const newEvent = {
        cattleId: response.id,
        note: "",
        createdAt: moment.from(new Date()).format("jYYYY/jMM/jDD"),
        plaque: response.plaque,
        type: "weight",
      };
      if (formValue.weight) {
        dispatch &&
          dispatch(
            createWeighed({
              formValue: { ...newEvent, result: formValue.weight },
              toast: null,
              dispatch,
            })
          );
      }
      toast &&
        toast.show(MESSAGES.setMessage("NewCattle"), { type: "success" });
      navigation && navigation.goBack();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//console.log("testzdz");
export const getCattles = createAsyncThunk(
  "cattles/getCattles",
  async ({ type }) => {
    try {
      switch (type) {
        case "archive":
          return await CATTLESQUERY.getCattles(true);

        default:
          return await CATTLESQUERY.getCattles();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCattlesByStage = createAsyncThunk(
  "cattles/getCattlesByStage",
  async ({ stage }) => {
    try {
      return await CATTLESQUERY.getCattlesByStage(stage);
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCattlesByStatus = createAsyncThunk(
  "cattles/getCattlesByStatus",
  async ({ status }) => {
    try {
      return await CATTLESQUERY.getCattlesByStatus(status);
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchCattle = createAsyncThunk(
  "cattles/searchCattle",
  async ({ value }) => {
    try {
      return await CATTLESQUERY.searchCattle(value);
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCattleByPlaque = createAsyncThunk(
  "cattles/getCattleByPlaque",
  async ({ plaque, navigation }) => {
    try {
      const data = await CATTLESQUERY.getCattleByPlaque(plaque);
      //console.log("🚀 ~ file: cattleSlice.js:32 ~ data", data);
      navigation && navigation.push(ROUTES.VIEWRECORDTAB, { cattles: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCattlesByGender = createAsyncThunk(
  "cattles/getCattlesByGender",
  async ({ sex, setData }, { rejectWithValue }) => {
    try {
      const data = await CATTLESQUERY.getCattlesByGender(sex);

      setData && setData(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getCattlesOffspring = createAsyncThunk(
  "cattles/getCattlesOffspring",
  async ({ id }) => {
    try {
      //const [data, setData] = useState();
      return await CATTLESQUERY.getCattlesOffspring(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const archiveCattle = createAsyncThunk(
  "cattles/archiveCattle",
  async ({ id, archive, toast, navigation }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await CATTLESQUERY.setArchive(id, archive);
      toast.show(
        archive
          ? MESSAGES.setMessage("ArchiveCattle")
          : MESSAGES.setMessage("UnArchiveCattle"),
        { type: "success" }
      );
      navigation.goBack();
      //console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeCattleStage = createAsyncThunk(
  "cattles/changeCattleStage",
  async ({ id, newStage, toast, navigation }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await CATTLESQUERY.setNewStage(id, newStage);
      toast &&
        toast.show(MESSAGES.setMessage("ChangeStage", SetNameStage(newStage)), {
          type: "success",
        });
      navigation && navigation.goBack();
      //console.log(response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const changeCattleStatus = createAsyncThunk(
  "cattles/changeCattleStatus",
  async ({ id, newStatus, toast, navigation }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await CATTLESQUERY.setNewStatus(id, newStatus);
      toast &&
        toast.show(
          MESSAGES.setMessage("ChangeStatus", SetNameStatus(newStatus)),
          {
            type: "success",
          }
        );
      navigation && navigation.goBack();
      //console.log(response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteCattle = createAsyncThunk(
  "cattles/deleteCattle",
  async ({ id, toast, navigation }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await CATTLESQUERY.deleteCattle(id);
      toast &&
        toast.show(MESSAGES.setMessage("DeletedSuccessfully"), {
          type: "success",
        });
      navigation && navigation.goBack();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCattle = createAsyncThunk(
  "cattles/updateCattle",
  async ({ id, formValue, navigation, toast }, { rejectWithValue }) => {
    try {
      //console.log(id);
      const response = await CATTLESQUERY.updateCattle(formValue, id);
      //console.log("🚀 ~ file: cattleSlice.js:159 ~ response", response);

      toast.show(LABELS.setLabel("UpdatedSuccessfully"), {
        type: "success",
      });
      navigation.navigate(ROUTES.HOME);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cattleSlice = createSlice({
  name: "cattle",
  initialState: {
    cattle: {},
    cattles: [],
    cattlesOffspring: [],
    cattlesByGender: [],
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCattles.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getCattles.fulfilled, (state, action) => {
        state.loading = false;
        state.cattles = action?.payload;
      }),
      builder.addCase(getCattles.rejected, (state, action) => {
        //console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(searchCattle.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(searchCattle.fulfilled, (state, action) => {
        state.loading = false;
        state.cattles = action?.payload;
      }),
      builder.addCase(searchCattle.rejected, (state, action) => {
        //console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(getCattlesByStatus.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getCattlesByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.cattles = action?.payload;
      }),
      builder.addCase(getCattlesByStatus.rejected, (state, action) => {
        //console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(getCattlesByStage.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getCattlesByStage.fulfilled, (state, action) => {
        state.loading = false;
        state.cattles = action?.payload;
      }),
      builder.addCase(getCattlesByStage.rejected, (state, action) => {
        // console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(getCattlesByGender.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getCattlesByGender.fulfilled, (state, action) => {
        state.loading = false;
        state.cattlesByGender = action?.payload;
      }),
      builder.addCase(getCattlesByGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        // console.log(action.error.message);
      }),
      builder.addCase(getCattlesOffspring.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getCattlesOffspring.fulfilled, (state, action) => {
        state.loading = false;
        state.cattlesOffspring = action?.payload;
      }),
      builder.addCase(getCattlesOffspring.rejected, (state, action) => {
        //console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(getCattleByPlaque.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getCattleByPlaque.fulfilled, (state, action) => {
        state.loading = false;
        state.cattle = action?.payload;
      }),
      builder.addCase(getCattleByPlaque.rejected, (state, action) => {
        //console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createCattle.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createCattle.fulfilled, (state, action) => {
        state.loading = false;
        state.cattles.push(action.payload);
      }),
      builder.addCase(createCattle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteCattle.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteCattle.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.cattles = state.cattles.filter((item) => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteCattle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateCattle.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateCattle.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.cattles = state.cattles.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      }),
      builder.addCase(updateCattle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    builder.addCase(changeCattleStage.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(changeCattleStage.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id, newStage },
        } = action.meta;
        if (id) {
          state.cattles = state.cattles.map((item) =>
            item.id === id ? { ...item, cattleStage: newStage } : item
          );
        }
      }),
      builder.addCase(changeCattleStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      });
    builder.addCase(changeCattleStatus.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(changeCattleStatus.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id, newStatus },
        } = action.meta;
        if (id) {
          state.cattles = state.cattles.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          );
        }
      }),
      builder.addCase(changeCattleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      });
    builder.addCase(archiveCattle.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(archiveCattle.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.cattles = state.cattles.filter((item) => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(archiveCattle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default cattleSlice.reducer;
