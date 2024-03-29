import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DispositionsState {
  tasks: { [sid: string]: DispositionsTaskState };
}

export interface DispositionsTaskState {
  disposition: string;
  notes: string;
  custom_attributes: { [key: string]: string };
}

export interface DispositionsTaskUpdate extends DispositionsTaskState {
  taskSid: string;
}

const initialState = {
  tasks: {},
} as DispositionsState;

const dispositionsSlice = createSlice({
  name: 'dispositions',
  initialState,
  reducers: {
    updateDisposition(state, action: PayloadAction<DispositionsTaskUpdate>) {
      state.tasks = {
        ...state.tasks,
        [action.payload.taskSid]: {
          disposition: action.payload.disposition,
          notes: action.payload.notes,
          custom_attributes: { ...action.payload.custom_attributes },
        },
      };
    },
  },
});

export const { updateDisposition } = dispositionsSlice.actions;
export const reducerHook = () => ({ dispositions: dispositionsSlice.reducer });
