'use client';

import Trash from '@/assets/icons/trash.svg';
import CheckboxNo from '@/assets/icons/checkbox-no.svg';
import CheckboxYes from '@/assets/icons/checkbox-yes.svg';
import styles from '@/app/_components/components-styles/QueryParamsTable.module.css';
import { useState } from 'react';

type Param = {
  key: string;
  value: string;
  checked: boolean;
};

export default function QueryParamsTable() {
  const [params, setParams] = useState<Param[]>([
    { key: '', value: '', checked: true },
  ]);
  const [allChecked, setAllChecked] = useState(true);

  const handleAddRow = () => {
    setParams([...params, { key: '', value: '', checked: true }]);
  };

  const handleRemoveRow = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Param,
    value: string | boolean,
  ) => {
    const updatedParams = [...params];
    if (field === 'checked') {
      updatedParams[index][field] = value as boolean;
    } else {
      updatedParams[index][field] = value as string;
    }
    setParams(updatedParams);
  };

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
              <label className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  className={styles.hiddenCheckbox}
                  checked={allChecked}
                  onChange={handleToggleAll}
                />
                {allChecked ? (
                  <CheckboxYes className={styles.checkIcon} />
                ) : (
                  <CheckboxNo className={styles.checkIcon} />
                )}
              </label>
            </th>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param, index) => (
            <tr key={index}>
              <td>
                <label className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    className={styles.hiddenCheckbox}
                    checked={param.checked}
                    onChange={() =>
                      handleChange(index, 'checked', !param.checked)
                    }
                  />
                  {param.checked ? (
                    <CheckboxYes className={styles.checkIcon} />
                  ) : (
                    <CheckboxNo className={styles.checkIcon} />
                  )}
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={param.key}
                  placeholder="Key"
                  onChange={(e) => handleChange(index, 'key', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={param.value}
                  placeholder="Value"
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
      <button onClick={handleAddRow}>➕ Add Param</button>
    </div>
  );
}
