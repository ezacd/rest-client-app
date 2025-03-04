import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import {
  setParams,
  setHeadersParams,
  setRequestValue,
} from '../_store/requestSlice';
import { Param } from '../_components/RequestSection';

type UseParamsTableProps = {
  paramType: 'headersParams' | 'params';
  updateRequestValue?: boolean;
};

export function useParamsTable({
  paramType,
  updateRequestValue,
}: UseParamsTableProps) {
  const params = useSelector((state: RootState) => state.request[paramType]);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const requestValue = useSelector(
    (state: RootState) => state.request.requestValue,
  );
  const [allChecked, setAllChecked] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [params]);

  useEffect(() => {
    const lastParam = params.at(-1);
    if (lastParam && (lastParam.key !== '' || lastParam.value !== '')) {
      dispatch(
        (paramType === 'headersParams' ? setHeadersParams : setParams)([
          ...params,
          { key: '', value: '', checked: true },
        ]),
      );
    }
  }, [params, dispatch, paramType]);

  useEffect(() => {
    if (updateRequestValue) {
      const last = requestValue[requestValue.length - 1];
      const [baseUrl] = requestValue.split('?');

      dispatch(setRequestValue(baseUrl + stringifyQueryParams(params, last)));
    }
  }, [params, dispatch, updateRequestValue, requestValue]);

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

  const handleRemoveRow = useCallback(
    (index: number) => {
      if (params.length < 2) return;
      dispatch(
        (paramType === 'headersParams' ? setHeadersParams : setParams)(
          params.filter((_, i) => i !== index),
        ),
      );
    },
    [dispatch, params, paramType],
  );

  const handleChange = useCallback(
    (
      index: number,
      field: 'key' | 'value' | 'checked',
      value: string | boolean,
    ) => {
      dispatch(
        (paramType === 'headersParams' ? setHeadersParams : setParams)(
          params.map((param, i) =>
            i === index ? { ...param, [field]: value } : param,
          ),
        ),
      );
    },
    [dispatch, params, paramType],
  );

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    dispatch(
      (paramType === 'headersParams' ? setHeadersParams : setParams)(
        params.map((param) => ({ ...param, checked: newChecked })),
      ),
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
