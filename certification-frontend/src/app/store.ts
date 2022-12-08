import { configureStore } from '@reduxjs/toolkit';

import certificationSlice from './slices/certificationReducer';

export const store = configureStore({
  reducer: {
    app: certificationSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});