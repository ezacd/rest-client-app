import Trash from '@/assets/icons/trash.svg';
import CheckboxNo from '@/assets/icons/checkbox-no.svg';
import CheckboxYes from '@/assets/icons/checkbox-yes.svg';
import styles from '@/app/_components/components-styles/QueryParamsTable.module.css';
import { useTranslations } from 'next-intl';
import { useParamsTable } from '../_hooks/useParamsTable';

type ParamsTableProps = {
  title: string;
  paramType: 'headersParams' | 'params';
  updateRequestValue?: boolean;
};

export default function ParamsTable({
  title,
  paramType,
  updateRequestValue,
}: ParamsTableProps) {
  const {
    params,
    containerRef,
    allChecked,
    handleRemoveRow,
    handleChange,
    handleToggleAll,
  } = useParamsTable({ paramType, updateRequestValue });

  const t = useTranslations('HomePage');

  return (
    <div ref={containerRef} className={styles.container}>
      <h2 className={styles.queryParamsTableName}>{t(title)}</h2>
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
