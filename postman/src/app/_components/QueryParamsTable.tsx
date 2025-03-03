'use client';

import Trash from '@/assets/icons/trash.svg';
import CheckboxNo from '@/assets/icons/checkbox-no.svg';
import CheckboxYes from '@/assets/icons/checkbox-yes.svg';
import styles from '@/app/_components/components-styles/QueryParamsTable.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Param } from './RequestSection';

type Props = {
  params: Param[];
  setParams: React.Dispatch<React.SetStateAction<Param[]>>;
  requestValue: string;
  setRequestValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function QueryParamsTable({
  requestValue,
  params,
  setParams,
  setRequestValue,
}: Props) {
  const [allChecked, setAllChecked] = useState(true);
  const t = useTranslations('HomePage');

  useEffect(() => {
    const lastParam = params.at(-1);
    if (lastParam && (lastParam.key !== '' || lastParam.value !== '')) {
      setParams((prevParams) => [
        ...prevParams,
        { key: '', value: '', checked: true },
      ]);
    }
  }, [params, setParams, requestValue]);

  useEffect(() => {
    setRequestValue((prev) => {
      const last = prev[prev.length - 1];
      const [baseUrl] = prev.split('?');
      return baseUrl + stringifyQueryParams(params, last);
    });
  }, [params, setRequestValue]);

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
      setParams(params.filter((_, i) => i !== index));
    },
    [params, setParams],
  );

  const handleChange = useCallback(
    (
      index: number,
      field: 'key' | 'value' | 'checked',
      value: string | boolean,
    ) => {
      setParams((prevParams) =>
        prevParams.map((param, i) =>
          i === index ? { ...param, [field]: value } : param,
        ),
      );
    },
    [setParams],
  );

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setParams((prevParams) =>
      prevParams.map((param) => ({ ...param, checked: newChecked })),
    );
  };

  return (
    <div className={styles.container}>
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
