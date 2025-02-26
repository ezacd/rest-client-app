'use client';

import Trash from '@/assets/icons/trash.svg';
import CheckboxNo from '@/assets/icons/checkbox-no.svg';
import CheckboxYes from '@/assets/icons/checkbox-yes.svg';
import styles from '@/app/_components/components-styles/QueryParamsTable.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Param = {
  key: string;
  value: string;
  checked: boolean;
};

type Props = {
  requestValue: string;
  setRequestValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function QueryParamsTable({
  requestValue,
  setRequestValue,
}: Props) {
  const [params, setParams] = useState<Param[]>([
    { key: '', value: '', checked: true },
  ]);
  const [allChecked, setAllChecked] = useState(true);
  const t = useTranslations('HomePage');

  // add new row
  useEffect(() => {
    const lastParam = params.at(-1);
    if (lastParam && (lastParam.key !== '' || lastParam.value !== '')) {
      setParams((prevParams) => [
        ...prevParams,
        { key: '', value: '', checked: true },
      ]);
    }
  }, [params]);

  //  add query params
  useEffect(() => {
    const validParams = params.filter(
      (param) => param.key !== '' && param.checked,
    );

    const queryParams = validParams
      .map((param) => `${param.key}=${param.value}`)
      .join('&');

    try {
      const url = new URL(requestValue);
      const finalUrl =
        url.origin +
        url.pathname +
        (queryParams ? '?' + queryParams : queryParams);
      setRequestValue(finalUrl);
    } catch {}
  }, [params, requestValue, setRequestValue]);

  const handleRemoveRow = useCallback(
    (index: number) => {
      if (params.length < 2) return;
      setParams(params.filter((_, i) => i !== index));
    },
    [params],
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
    [],
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
            <th>Key</th>
            <th>Value</th>
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
