import {configureStore} from '@reduxjs/toolkit';

// Reducers
import AuthReducer from './reducer/AuthReducer';

export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
  },
});
