'use client';

import Trash from '@/assets/icons/trash.svg';
import CheckboxNo from '@/assets/icons/checkbox-no.svg';
import CheckboxYes from '@/assets/icons/checkbox-yes.svg';
import styles from '@/app/_components/components-styles/QueryParamsTable.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Param } from './RequestSection';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../_store/store';
import { setParams, setRequestValue } from '../_store/requestSlice';

export default function QueryParamsTable() {
  const [allChecked, setAllChecked] = useState(true);
  const requestValue = useSelector(
    (state: RootState) => state.request.requestValue,
  );
  const params = useSelector((state: RootState) => state.request.params);
  const dispatch = useDispatch();
  const t = useTranslations('HomePage');

  useEffect(() => {
    const lastParam = params.at(-1);
    if (lastParam && (lastParam.key !== '' || lastParam.value !== '')) {
      dispatch(setParams([...params, { key: '', value: '', checked: true }]));
    }
  }, [params, requestValue, dispatch]);

  useEffect(() => {
    const last = requestValue[requestValue.length - 1];
    const [baseUrl] = requestValue.split('?');
    dispatch(setRequestValue(baseUrl + stringifyQueryParams(params, last)));
  }, [params, requestValue, dispatch]);

  const stringifyQueryParams = (params: Param[], last: string) => {
    const filtered = params.filter(
      ({ key, checked }) => key.trim() !== '' && checked,
    );

    if (last === '?' && params.length <= 1) {
      return '?';
    }

    const encodedParams = filtered.map(({ key, value }) => {
      if (key && value) {
        return `${key}=${value}`;
      } else if (key) {
        return key;
      }
    });

    let queryString = encodedParams.join('&');

    if (last === '=') {
      queryString = queryString + '=';
    }

    if (last === '&') {
      queryString += '&';
    }
    return queryString ? '?' + queryString : '';
  };

  const handleRemoveRow = useCallback(
    (index: number) => {
      if (params.length < 2) return;
      dispatch(setParams(params.filter((_, i) => i !== index)));
    },
    [dispatch, params],
  );

  const handleChange = useCallback(
    (
      index: number,
      field: 'key' | 'value' | 'checked',
      value: string | boolean,
    ) => {
      const newParams = params.map((param, i) =>
        i === index ? { ...param, [field]: value } : param,
      );
      dispatch(setParams(newParams));
    },
    [dispatch, params],
  );

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    dispatch(
      setParams(params.map((param) => ({ ...param, checked: newChecked }))),
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.queryParamsTableName}>{t('query-params')}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Checkbox checked={allChecked} onChange={handleToggleAll} />
            </th>
            <th>{t('key')}</th>
            <th>{t('value')}</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param, index) => (
            <tr key={index} id={String(index)}>
              <td>
                <Checkbox
                  checked={param.checked}
                  onChange={() =>
                    handleChange(index, 'checked', !param.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={param.key}
                  placeholder={t('key')}
                  onChange={(e) => handleChange(index, 'key', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={param.value}
                  placeholder={t('value')}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                />
              </td>
              <td className={styles.deleteRow}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveRow(index)}
                >
                  <Trash className={styles.trash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type CheckboxProps = { checked: boolean; onChange: () => void };

function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={styles.hiddenCheckbox}
        checked={checked}
        onChange={onChange}
      />
      {checked ? (
        <CheckboxYes className={styles.checkIcon} />
      ) : (
        <CheckboxNo className={styles.checkIcon} />
      )}
    </label>
  );
}
