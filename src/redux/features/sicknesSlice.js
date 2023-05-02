import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MESSAGES, ROUTES} from '../../constants';
import {SICKNESQUERY} from '../../queries';
import {createEvent} from './eventSlice';

export const createSicknes = createAsyncThunk(
  'sickneses/createSicknes',
  async ({formValue, toast, dispatch, navigation}, {rejectWithValue}) => {
    // console.log("🚀 ~ file: sickneseslice.js:10 ~ formValue", formValue);
    try {
      const response = await SICKNESQUERY.newSicknes(formValue);

      dispatch(
        createEvent({
          eventValues: {
            type: 'medicated',
            relationId: response.id,
            cattleId: formValue.cattleId,
            createdAt: formValue.createdAt,
            note: formValue.note,
            plaque: formValue.plaque,
          },
        }),
      );

      toast.show(MESSAGES.setMessage('NewSicknes'), {type: 'success'});
      navigation && navigation.goBack();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

//console.log("testzdz");
export const getSicknesesById = createAsyncThunk(
  'sickneses/getSicknesesById',
  async id => {
    try {
      return await SICKNESQUERY.getSicknesesById(id);
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteSicknes = createAsyncThunk(
  'sickneses/deleteSicknes',
  async ({id}, {rejectWithValue}) => {
    console.log('🚀 ~ file: sickneseslice.js ~ line 56 ~ sicknesId', id);
    try {
      //console.log(id);
      const response = await SICKNESQUERY.deleteSicknes(id);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateSicknes = createAsyncThunk(
  'sickneses/updateSicknes',
  async ({id, formValue, toast, navigation}, {rejectWithValue}) => {
    try {
      // console.log(id);
      // const response = await api.updateCattele(formValue, id);

      toast.show('پلاک ' + formValue.plaque + ' ویرایش شد.', {
        type: 'success',
      });
      navigation.goBack();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const sicknesSlice = createSlice({
  name: 'sicknes',
  initialState: {
    sicknes: {},
    sickneses: [],

    error: '',
    loading: false,
  },
  extraReducers: builder => {
    builder.addCase(getSicknesesById.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getSicknesesById.fulfilled, (state, action) => {
        state.loading = false;
        state.sicknes = action?.payload;
      }),
      builder.addCase(getSicknesesById.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createSicknes.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createSicknes.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("sss");
        state.sickneses.length > 0 && state.sickneses.push(action.payload);
      }),
      builder.addCase(createSicknes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteSicknes.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteSicknes.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: {id},
        } = action.meta;
        if (id) {
          state.sickneses = state.sickneses.filter(item => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteSicknes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateSicknes.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateSicknes.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: {id},
        } = action.meta;
        if (id) {
          state.sickneses = state.sickneses.map(item =>
            item.id === id ? action.payload : item,
          );
        }
      }),
      builder.addCase(updateSicknes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default sicknesSlice.reducer;
