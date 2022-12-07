import { configureStore } from '@reduxjs/toolkit';

import certificationSlice from './slices/certificationReducer';

const store = configureStore({
  reducer: {
    app: certificationSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});
export default store;