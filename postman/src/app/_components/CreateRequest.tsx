import { useTranslations } from 'next-intl';
import HTTP from '@/assets/icons/http.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect } from 'react';
import { RootState } from '../_store/store';
import {
  setParams,
  setRequestValue,
  setResponse,
} from '../_store/requestSlice';
import { useForm } from 'react-hook-form';
import styles from '@/app/_components/components-styles/CreateRequest.module.css';
import { sendData } from '@/services/api';

type DataType = {
  http_method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  url: string;
};

export default function CreateRequest() {
  const requestValue = useSelector(
    (state: RootState) => state.request.requestValue,
  );
  const body = useSelector((state: RootState) => state.request.body);

  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm<DataType>();
  const t = useTranslations('HomePage');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const actualRequest = e.target.value;
    dispatch(setRequestValue(actualRequest));

    const queryIndex = actualRequest.indexOf('?');
    if (queryIndex !== -1) {
      dispatch(
        setParams(parseQueryParams(actualRequest.slice(queryIndex + 1))),
      );
    } else {
      dispatch(setParams([{ key: '', value: '', checked: true }]));
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

  const submitData = async (data: DataType) => {
    const filteredBody = body.filter((item) => item.key && item.checked);
    const resBody = Object.fromEntries(
      filteredBody.map(({ key, value }) => [key, value]),
    );
    const res = await sendData(data, resBody);
    dispatch(
      setResponse({
        data: res.data,
        status: res.status,
        statusText: res.statusText,
      }),
    );
  };

  useEffect(() => {
    setValue('url', requestValue);
  }, [requestValue, setValue]);

  return (
    <div className={styles.request}>
      <div className={styles.requestName}>
        <HTTP className={styles.requestNameSVG} />
        <p className={styles.requestNameText}>{requestValue}</p>
      </div>
      <div className={styles.requestEditor}>
        <form
          className={styles.createRequest}
          onSubmit={handleSubmit(submitData)}
        >
          <div className={styles.createRequestField}>
            <select
              className={styles.selectMethod}
              id="http-method"
              {...register('http_method')}
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
              {...register('url')}
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
