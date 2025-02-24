import { useTranslations } from 'next-intl';
import styles from '@/app/_components/components-styles/CreateRequest.module.css';
import HTTP from '@/assets/icons/http.svg';

export default function CreateRequest() {
  const t = useTranslations('HomePage');

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
