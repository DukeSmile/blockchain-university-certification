import { createSlice } from '@reduxjs/toolkit';
import { processProp } from '../../interfaces/base';

type initialStateProp = {
  certProcesses:string[];
  certProcessIds:{[key:string]: string};
  certSubjects:{[key:string]: string[]};
  processes: processProp[];
  student_info: {[key:string]: string};
  role: number;
}

const initialState:initialStateProp = {
  certProcesses: [],
  certProcessIds: {},
  certSubjects: {},
  processes: [],
  student_info: {},
  role: 0
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
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setCertProcesses: (state, { payload }) => {
      state.certProcesses = payload;
    },
    setCertProcessIds: (state, { payload }) => {
      state.certProcessIds = payload;
    },
    setCertSubjects: (state, { payload }) => {
      state.certSubjects = payload;
    },
    addCertProcess: (state, { payload }) => {
      if (state.certProcesses.findIndex((process:string) => process === payload) >= 0) {
        alert('duplicated');
      }
      else {
        state.certProcesses.push(payload);
        state.certSubjects[payload] = [];
      }
    },
    updateCertProcess: (state, { payload }) => {
      const index = state.certProcesses.findIndex((process:string) => process === payload.former);
      if ( index >= 0) {
        state.certProcesses[index] = payload.value;
        state.certSubjects[payload.value] = state.certSubjects[payload.former];
        state.certSubjects[payload.former] = [];
        state.certProcessIds[payload.value] = state.certProcessIds[payload.former];
        state.certProcessIds[payload.former] = '';
      }
    },
    addCertSubject: (state, { payload }) => {
      const index = state.certSubjects[payload.process]?.findIndex((subject:string) => subject === payload.value);
      if ( index < 0 || index === undefined) {
        state.certSubjects[payload.process].push(payload.value);
      }
      else
        alert('Current subject is existed!');
    },
    deleteCertSubject: (state, { payload }) => {
      const index = state.certSubjects[payload.process]?.findIndex((subject:string) => subject === payload.subject);
      if ( index >= 0) {
        state.certSubjects[payload.process].splice(index, 1);
      }
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
  setCertProcesses,
  setCertProcessIds,
  setCertSubjects,
  addCertProcess,
  updateCertProcess,
  addCertSubject,
  deleteCertSubject,
  setRole,
  updateSubjectMark,
  updateSubjectUnit
} = certificationSlice.actions;
export default certificationSlice.reducer;
