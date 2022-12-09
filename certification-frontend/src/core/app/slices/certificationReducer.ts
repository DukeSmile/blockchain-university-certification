import { createSlice } from '@reduxjs/toolkit';
import { processProp } from '../../interfaces/base';

type initialStateProp = {
  processes: processProp[];
  student_info: {[key:string]: string};
}

const initialState:initialStateProp = {
  processes: [],
  student_info: {}
};

export const certificationSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initProcesses: (state, { payload }) => {
      state.processes = payload;
    },
    initStudentInfo: (state, { payload }) => {
      state.student_info = payload;
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
  initStudentInfo,
  updateSubjectMark,
  updateSubjectUnit
} = certificationSlice.actions;
export default certificationSlice.reducer;
