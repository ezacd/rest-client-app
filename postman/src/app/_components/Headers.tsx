'use client';

import Trash from '@/assets/icons/trash.svg';
import CheckboxNo from '@/assets/icons/checkbox-no.svg';
import CheckboxYes from '@/assets/icons/checkbox-yes.svg';
import styles from '@/app/_components/components-styles/QueryParamsTable.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import { setHeadersParams } from '../_store/requestSlice';

export default function HeadersTable() {
  const headersParams = useSelector(
    (state: RootState) => state.request.headersParams,
  );
  const dispatch = useDispatch();
  const [allChecked, setAllChecked] = useState(true);
  const t = useTranslations('HomePage');

  useEffect(() => {
    const lastParam = headersParams.at(-1);
    if (lastParam && (lastParam.key !== '' || lastParam.value !== '')) {
      dispatch(
        setHeadersParams([
          ...headersParams,
          { key: '', value: '', checked: true },
        ]),
      );
    }
  }, [headersParams, dispatch]);

  const handleRemoveRow = useCallback(
    (index: number) => {
      if (headersParams.length < 2) return;
      dispatch(setHeadersParams(headersParams.filter((_, i) => i !== index)));
    },
    [headersParams, dispatch],
  );

  const handleChange = useCallback(
    (
      index: number,
      field: 'key' | 'value' | 'checked',
      value: string | boolean,
    ) => {
      dispatch(
        setHeadersParams(
          headersParams.map((param, i) =>
            i === index ? { ...param, [field]: value } : param,
          ),
        ),
      );
    },
    [headersParams, dispatch],
  );

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    dispatch(
      setHeadersParams(
        headersParams.map((param) => ({ ...param, checked: newChecked })),
      ),
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.queryParamsTableName}>{t('headers')}</h2>
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
          {headersParams.map((param, index) => (
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
