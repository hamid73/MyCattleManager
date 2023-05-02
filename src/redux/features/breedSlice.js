import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MESSAGES, ROUTES} from '../../constants';
import {BREEDQUERY} from '../../queries';

export const createBreed = createAsyncThunk(
  'breeds/createBreed',
  async ({formValue, toast, navigation}, {rejectWithValue}) => {
    try {
      const response = await BREEDQUERY.newBreed(formValue.name);
      toast.show(MESSAGES.setMessage('NewBreed'), {type: 'success'});
      navigation && navigation.goBack();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

//console.log("testzdz");
export const getBreeds = createAsyncThunk('breeds/getBreeds', async () => {
  try {
    return await BREEDQUERY.getBreeds();
  } catch (error) {
    console.log(error);
  }
});

export const deleteBreed = createAsyncThunk(
  'breeds/deleteBreed',
  async ({id, toast}, {rejectWithValue}) => {
    try {
      //console.log(id);
      // const response = await api.deleteCattele(id);
      toast.show('حذف دام با موفقیت انجام شد', {type: 'success'});
      //console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateBreed = createAsyncThunk(
  'breeds/updateBreed',
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

const breedSlice = createSlice({
  name: 'breed',
  initialState: {
    breed: {},
    breeds: [],

    error: '',
    loading: false,
  },
  extraReducers: builder => {
    builder.addCase(getBreeds.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.breeds = action?.payload;
      }),
      builder.addCase(getBreeds.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action?.payload?.message;
      }),
      builder.addCase(createBreed.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createBreed.fulfilled, (state, action) => {
        state.loading = false;
        state.breeds.push(action.payload);
      }),
      builder.addCase(createBreed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(deleteBreed.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteBreed.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("action", action);
        const {
          arg: {id},
        } = action.meta;
        if (id) {
          state.breeds = state.breeds.filter(item => item.id !== id);
          // state.tours = state.tours.filter((item) => item.id !== id);
        }
      }),
      builder.addCase(deleteBreed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }),
      builder.addCase(updateBreed.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateBreed.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: {id},
        } = action.meta;
        if (id) {
          state.breeds = state.breeds.map(item =>
            item.id === id ? action.payload : item,
          );
        }
      }),
      builder.addCase(updateBreed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default breedSlice.reducer;
