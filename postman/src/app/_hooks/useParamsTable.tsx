import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import {
  setParams,
  setHeadersParams,
  setRequestValue,
  setVariables,
  setBody,
  setHistory,
} from '../_store/requestSlice';
import { Param } from '../_components/RequestSection';

type UseParamsTableProps = {
  paramType: 'headersParams' | 'params' | 'variables' | 'body';
  updateRequestParams?: boolean;
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

export function useParamsTable({
  paramType,
  updateRequestParams,
}: UseParamsTableProps) {
  const params = useSelector((state: RootState) => state.request[paramType]);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const requestValue = useSelector(
    (state: RootState) => state.request.requestValue,
  );
  const [allChecked, setAllChecked] = useState(true);

  //  scroll to the end
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [params]);

  //  add new last row
  useEffect(() => {
    const lastParam = params.at(-1);

    if (lastParam && (lastParam.key !== '' || lastParam.value !== '')) {
      let updateAction;

      if (paramType === 'headersParams') {
        updateAction = setHeadersParams;
      } else if (paramType === 'variables') {
        updateAction = setVariables;
      } else if (paramType === 'params') {
        updateAction = setParams;
      } else {
        updateAction = setBody;
      }

      dispatch(
        updateAction([...params, { key: '', value: '', checked: true }]),
      );
    }
  }, [params, dispatch, paramType]);

  //  set request value props
  useEffect(() => {
    if (updateRequestParams) {
      const last = requestValue.url[requestValue.url.length - 1];
      const [baseUrl] = requestValue.url.split('?');
      const newUrl = baseUrl + stringifyQueryParams(params, last);

      if (newUrl !== requestValue.url) {
        dispatch(setRequestValue({ url: newUrl }));
      }
    }
  }, [params, dispatch, updateRequestParams, requestValue]);

  //  add viarbles from localStorage
  useEffect(() => {
    const viarbles = localStorage.getItem('viarbles');
    const history = localStorage.getItem('history');
    if (viarbles) {
      dispatch(setVariables(JSON.parse(viarbles) as Param[]));
    }
    if (history) {
      dispatch(setHistory(JSON.parse(history) as History[]));
    }
  }, [dispatch]);

  //  transformation json to string
  const stringifyQueryParams = (params: Param[], last: string) => {
    const filtered = params.filter(
      ({ key, checked }) => key.trim() !== '' && checked,
    );
    if (last === '?' && params.length <= 1) return '?';

    const encodedParams = filtered.map(({ key, value }) =>
      value ? `${key}=${value}` : key,
    );
    let queryString = encodedParams.join('&');

    if (['=', '&'].includes(last)) queryString += last;
    return queryString ? '?' + queryString : '';
  };

  //  remove row
  const handleRemoveRow = useCallback(
    (index: number) => {
      if (params.length < 2) return;

      let updateAction;

      if (paramType === 'headersParams') {
        updateAction = setHeadersParams;
      } else if (paramType === 'variables') {
        updateAction = setVariables;
      } else if (paramType === 'params') {
        updateAction = setParams;
      } else {
        updateAction = setBody;
      }

      dispatch(updateAction(params.filter((_, i) => i !== index)));
    },
    [dispatch, params, paramType],
  );
  //  change row
  const handleChange = useCallback(
    (
      index: number,
      field: 'key' | 'value' | 'checked',
      value: string | boolean,
    ) => {
      let updateAction;

      if (paramType === 'headersParams') {
        updateAction = setHeadersParams;
      } else if (paramType === 'variables') {
        updateAction = setVariables;
      } else if (paramType === 'params') {
        updateAction = setParams;
      } else {
        updateAction = setBody;
      }

      const updatedParams = params.map((param, i) =>
        i === index ? { ...param, [field]: value } : param,
      );

      dispatch(updateAction(updatedParams));
    },
    [dispatch, params, paramType],
  );

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);

    let updateAction;

    if (paramType === 'headersParams') {
      updateAction = setHeadersParams;
    } else if (paramType === 'variables') {
      updateAction = setVariables;
    } else if (paramType === 'params') {
      updateAction = setParams;
    } else {
      updateAction = setBody;
    }

    dispatch(
      updateAction(params.map((param) => ({ ...param, checked: newChecked }))),
    );
  };

  return {
    params,
    containerRef,
    allChecked,
    handleRemoveRow,
    handleChange,
    handleToggleAll,
  };
}
