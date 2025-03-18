import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Param = {
  key: string;
  value: string;
  checked: boolean;
};

type ActiveTab = 'Params' | 'Headers' | 'Viarbles' | 'Body';

type ResponseType = {
  data: Record<string, string>;
  status: number;
  statusText: string;
  time: string;
  size: string;
};

type Request = {
  http_method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  url: string;
  variablesUrl: string;
};

type History = {
  request: Request;
  params: Param[];
  body: Param[];
  headers: Param[];
};

interface RequestState {
  requestValue: Request;
  params: Param[];
  headersParams: Param[];
  variables: Param[];
  activeTab: ActiveTab;
  body: Param[];
  response: ResponseType;
  history: History[];
}

const initialState: RequestState = {
  requestValue: { url: '', http_method: 'GET', variablesUrl: '' },
  params: [{ key: '', value: '', checked: true }],
  headersParams: [{ key: '', value: '', checked: true }],
  variables: [{ key: '', value: '', checked: true }],
  activeTab: 'Params',
  body: [{ key: '', value: '', checked: true }],
  response: { data: {}, status: 0, statusText: '', time: '', size: '' },
  history: [],
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequestValue: (state, action: PayloadAction<Partial<Request>>) => {
      state.requestValue = { ...state.requestValue, ...action.payload };
      console.log(state.requestValue);
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
      alert(123);
      if (state.headersParams[action.payload.index]) {
        state.headersParams = state.headersParams.map((p, i) =>
          i === action.payload.index ? action.payload.param : p,
        );
      }
    },
    setActiveTab: (state, action: PayloadAction<ActiveTab>) => {
      state.activeTab = action.payload;
    },
    setVariables: (state, action: PayloadAction<Param[]>) => {
      state.variables = action.payload;
      localStorage.setItem('viarbles', JSON.stringify(state.variables));
    },
    setBody: (state, action: PayloadAction<Param[]>) => {
      state.body = action.payload;
    },
    setResponse: (state, action: PayloadAction<ResponseType>) => {
      state.response = action.payload;
    },
    setHistory: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload;
      localStorage.setItem('history', JSON.stringify(state.history));
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
  setVariables,
  setBody,
  setResponse,
  setHistory,
} = requestSlice.actions;
export default requestSlice.reducer;
