import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAdddress = createAsyncThunk('user/fetchAddress', async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

const initialState = {
  username: '',
  status: 'error',
  address: '',
  error: 'test',
  position: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateName: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAdddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
