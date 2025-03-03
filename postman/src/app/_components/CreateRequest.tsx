import { useTranslations } from 'next-intl';
import styles from '@/app/_components/components-styles/CreateRequest.module.css';
import HTTP from '@/assets/icons/http.svg';
import { Param } from './RequestSection';
import { ChangeEvent } from 'react';

type Props = {
  requestValue: string;
  setRequestValue: React.Dispatch<React.SetStateAction<string>>;
  setParams: React.Dispatch<React.SetStateAction<Param[]>>;
};

export default function CreateRequest({
  requestValue,
  setRequestValue,
  setParams,
}: Props) {
  const t = useTranslations('HomePage');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const actualRequest = e.target.value;
    setRequestValue(actualRequest);

    const queryIndex = actualRequest.indexOf('?');
    if (queryIndex !== -1) {
      setParams(parseQueryParams(actualRequest.slice(queryIndex + 1)));
    } else {
      setParams([{ key: '', value: '', checked: true }]); // Если нет ?, очищаем параметры
    }
  };

  const parseQueryParams = (query: string) => {
    return query
      ? query.split('&').map((param) => {
          const [key = '', value = ''] = param.split('=');
          return { key, value, checked: true };
        })
      : [{ key: '', value: '', checked: true }];
  };

  return (
    <div className={styles.request}>
      <div className={styles.requestName}>
        <HTTP className={styles.requestNameSVG} />
        <p className={styles.requestNameText}>
          https://restcountries.com/v3.1/all
        </p>
      </div>
      <div className={styles.requestEditor}>
        <form className={styles.createRequest}>
          <div className={styles.createRequestField}>
            <select
              className={styles.selectMethod}
              name="http-method"
              id="http-method"
            >
              <option className={styles.selectMethodOptionGet} value="GET">
                GET
              </option>
              <option className={styles.selectMethodOptionPost} value="POST">
                POST
              </option>
              <option className={styles.selectMethodOptionPut} value="PUT">
                PUT
              </option>
              <option
                className={styles.selectMethodOptionDelete}
                value="DELETE"
              >
                DELETE
              </option>
              <option className={styles.selectMethodOptionPatch} value="PATCH">
                PATCH
              </option>
              <option className={styles.selectMethodOptionHead} value="HEAD">
                HEAD
              </option>
              <option
                className={styles.selectMethodOptionOptiont}
                value="OPTIONS"
              >
                OPTIONS
              </option>
            </select>
            <div className={styles.createRequestLine}></div>
            <input
              className={styles.requestInput}
              name="url"
              placeholder={t('enterURL')}
              value={requestValue}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <button className={styles.createRequestButton} type="submit">
            {t('send')}
          </button>
        </form>
      </div>
    </div>
  );
}
