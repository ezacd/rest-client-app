import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Param = {
  key: string;
  value: string;
  checked: boolean;
};

type ActiveTab = 'Params' | 'Headers' | 'Viarbles' | 'Body';

interface RequestState {
  requestValue: string;
  params: Param[];
  headersParams: Param[];
  viarbles: Param[];
  activeTab: ActiveTab;
  body: Param[];
}

const initialState: RequestState = {
  requestValue: '',
  params: [{ key: '', value: '', checked: true }],
  headersParams: [{ key: '', value: '', checked: true }],
  viarbles: [{ key: '', value: '', checked: true }],
  activeTab: 'Params',
  body: [{ key: '', value: '', checked: true }],
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequestValue: (state, action: PayloadAction<string>) => {
      state.requestValue = action.payload;
    },
    setParams: (state, action: PayloadAction<Param[]>) => {
      state.params = action.payload;
    },
    updateParam: (
      state,
      action: PayloadAction<{ index: number; param: Param }>,
    ) => {
      if (state.params[action.payload.index]) {
        state.params = state.params.map((p, i) =>
          i === action.payload.index ? action.payload.param : p,
        );
      }
    },
    setHeadersParams: (state, action: PayloadAction<Param[]>) => {
      state.headersParams = action.payload;
    },
    updateHeadersParams: (
      state,
      action: PayloadAction<{ index: number; param: Param }>,
    ) => {
      if (state.headersParams[action.payload.index]) {
        state.headersParams = state.headersParams.map((p, i) =>
          i === action.payload.index ? action.payload.param : p,
        );
      }
    },
    setActiveTab: (state, action: PayloadAction<ActiveTab>) => {
      state.activeTab = action.payload;
    },
    setViarbles: (state, action: PayloadAction<Param[]>) => {
      state.viarbles = action.payload;
    },
    setBody: (state, action: PayloadAction<Param[]>) => {
      state.body = action.payload;
    },
  },
});

export const {
  setRequestValue,
  setParams,
  updateParam,
  setHeadersParams,
  updateHeadersParams,
  setActiveTab,
  setViarbles,
  setBody,
} = requestSlice.actions;
export default requestSlice.reducer;
