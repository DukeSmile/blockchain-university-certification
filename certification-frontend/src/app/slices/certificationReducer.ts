import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

export const certificationSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCharities: (state, { payload }) => {
      state.value = payload;
    }
  }
});

export const { 
  setCharities
} = certificationSlice.actions;
export default certificationSlice.reducer;
