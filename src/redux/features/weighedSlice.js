import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {MESSAGES, ROUTES} from '../../constants';
import {WEIGHTQUERY} from '../../queries';
import {createEvent} from './eventSlice';

export const createWeighed = createAsyncThunk(
  'weigheds/createWeighed',
  async ({formValue, toast, dispatch, navigation}, {rejectWithValue}) => {
    console.log('🚀 ~ file: weighedSlice.js:10 ~ formValue', formValue);
    try {
      const response = await WEIGHTQUERY.newWeight(formValue);
      console.log('🚀 ~ file: weighedSlice.js:13 ~ response', response);

      dispatch(
        createEvent({
          eventValues: {
            type: 'weight',
            relationId: response.id,
            cattleId: formValue.cattleId,
            createdAt: formValue.createdAt,
            note: formValue.note,
            plaque: formValue.plaque,
          },
        }),
      );

      toast && toast.show(MESSAGES.setMessage('NewWeight'), {type: 'success'});
      navigation && navigation.goBack();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

//console.log("testzdz");
export const getWeighedsById = createAsyncThunk(
  'weigheds/getWeighedsById',
  async id => {
    try {
      return await WEIGHTQUERY.getWeightById(id);
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteWeighed = createAsyncThunk(
  'weigheds/deleteWeighed',
  async ({id}, {rejectWithValue}) => {
    try {
      //console.log(id);
      const response = await WEIGHTQUERY.deleteWeight(id);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateWeighed = createAsyncThunk(
  'weigheds/updateWeighed',
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

const weighedSlice = createSlice({
  name: 'weighed',
  initialState: {
    weighed: {},
    weigheds: [],

    error: '',
    loading: false,
  },
  extraReducers: builder => {
    builder.addCase(getWeighedsById.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getWeighedsById.fulfilled, (state, action) => {
        state.loading = false;
        state.weighed = action?.payload;
      }),
      builder.addCase(getWeighedsById.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createWeighed.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createWeighed.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("sss");
        state.weigheds.length > 0 && state.weigheds.push(action.payload);
      }),
      builder.addCase(createWeighed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteWeighed.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteWeighed.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: {id},
        } = action.meta;
        if (id) {
          state.weigheds = state.weigheds.filter(item => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteWeighed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateWeighed.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateWeighed.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: {id},
        } = action.meta;
        if (id) {
          state.weigheds = state.weigheds.map(item =>
            item.id === id ? action.payload : item,
          );
        }
      }),
      builder.addCase(updateWeighed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default weighedSlice.reducer;
