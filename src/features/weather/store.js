/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestService } from '../../lib/services';
import {
  weatherApiToken, weatherApiUrl,
} from '../../lib/constants';

export const getUserCity = createAsyncThunk(
  'weather/getUserCountry',
  async (_, thunkAPI) => {
    try {
      const response = await RequestService(`${weatherApiUrl}/ip.json`, {
        params: { key: weatherApiToken, lang: 'ru', q: 'auto:ip' },
      });
      return response.city;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.payload.error.code);
    }
  },
);

export const getWeatherByCity = createAsyncThunk(
  'weather/getWeatherByCity',
  async (city, thunkAPI) => {
    try {
      const response = await RequestService(`${weatherApiUrl}/forecast.json`, {
        params: {
          key: weatherApiToken, lang: 'ru', q: city, days: 1,
        },
      });
      return { response, city };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.payload.error.code);
    }
  },
);

const initialState = {
  city: '',
  isLoading: true,
  isCityFetched: false,
  weather: null,
  isWeatherLoading: false,
  error: '',
  errorsCount: 0,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setIsCityFetched: (state, action) => {
      state.isCityFetched = action.payload;
    },
    setIsWeatherLoading: (state, action) => {
      state.isWeatherLoading = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCity.fulfilled, (state, action) => {
      state.city = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserCity.rejected, (state, action) => {
      state.error = `Не удалось определить Ваш город. Код ошибки ${action.payload}`;
      state.errorsCount += 1;
      state.isLoading = false;
    });
    builder.addCase(getWeatherByCity.rejected, (state, action) => {
      if (+action.payload === 1006) {
        state.error = 'Не найдено ни одной подходящей локации под Ваш запрос';
      } else {
        state.error = `Неизвестная ошибка. Код ошибки ${action.payload}. Попробуйте еще раз`;
      }
      state.errorsCount += 1;
      state.isWeatherLoading = false;
      state.weather = null;
      state.city = '';
    });
    builder.addCase(getWeatherByCity.fulfilled, (state, action) => {
      state.weather = action.payload.response;
      state.city = action.payload.city;
      state.isWeatherLoading = false;
    });
  },
});

export const {
  setIsCityFetched,
  setIsWeatherLoading,
  setCity,
  resetError,
} = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
