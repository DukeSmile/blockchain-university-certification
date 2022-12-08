import { createSlice } from '@reduxjs/toolkit';
import { processProp } from '../../interfaces/base';

type initialStateProp = {
  processes: processProp[];
}

const initialState:initialStateProp = {
  processes: []
};

export const certificationSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initProcesses: (state, { payload }) => {
      state.processes = payload;
    },
    updateSubjectMark: (state, { payload }) => {
      state.processes[payload.pIndex]['subjects'][payload.sIndex]['mark'] = payload.value;
    },
    updateSubjectUnit: (state, { payload }) => {
      state.processes[payload.pIndex]['subjects'][payload.sIndex]['unit'] = payload.value;
    }
  }
});

export const { 
  initProcesses,
  updateSubjectMark,
  updateSubjectUnit
} = certificationSlice.actions;
export default certificationSlice.reducer;
