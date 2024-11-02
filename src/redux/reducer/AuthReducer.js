import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  type: '',
  isLoading: true,
  registrationUsers: {},
  loginResponse: {},
  error: {},
  isToken: null,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      state.isToken = action.payload;
      state.type = action.type;
    },

    logOutSuccess(state, action) {
      state.isToken = null;
      state.type = action.type;
    },
  },
});

export const {logOutSuccess, signInSuccess} = AuthSlice.actions;

export default AuthSlice.reducer;
