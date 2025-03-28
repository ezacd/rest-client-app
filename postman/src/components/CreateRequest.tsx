import { useTranslations } from 'next-intl';
import HTTP from '@/assets/icons/http.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  setHistory,
  setParams,
  setRequestValue,
  setResponse,
} from '../store/requestSlice';
import { useForm } from 'react-hook-form';
import styles from '@/components/CreateRequest.module.css';
import { sendData } from '@/services/api';
import { RootState } from '@/store/store';

type DataType = {
  http_method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  url: string;
  variablesUrl: string;
};

export default function CreateRequest() {
  const requestValue = useSelector(
    (state: RootState) => state.request.requestValue,
  );
  const body = useSelector((state: RootState) => state.request.body);
  const headersParams = useSelector(
    (state: RootState) => state.request.headersParams,
  );
  const params = useSelector((state: RootState) => state.request.params);
  const variablesParams = useSelector(
    (state: RootState) => state.request.variables,
  );
  const history = useSelector((state: RootState) => state.request.history);
  const variables = Object.fromEntries(
    variablesParams
      .filter(({ key, checked }) => key && checked)
      .map(({ key, value }) => [key, value]),
  );

  const headers = Object.fromEntries(
    headersParams
      .filter(({ key, checked }) => key && checked)
      .map(({ key, value }) => [key, value]),
  );
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch } = useForm<DataType>();
  const [isValid, setIsValid] = useState(false);
  const t = useTranslations('HomePage');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const actualRequest = e.target.value;
    dispatch(
      setRequestValue({
        url: actualRequest,
        http_method: watch('http_method'),
      }),
    );

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

    const startTime = performance.now();

    const resData = {
      url: getInputText(),
      http_method: data.http_method,
      variablesUrl: getInputText(),
    };

    dispatch(
      setHistory([
        ...history,
        {
          request: resData,
          params: params,
          body: body,
          headers: headersParams,
        },
      ]),
    );

    const res = await sendData(resData, resBody, headers).catch((error) => {
      const errorResponse = error?.response;

      return {
        data: errorResponse?.data || {},
        status: errorResponse?.status || 500,
        statusText: errorResponse?.statusText || 'not_found',
        headers: errorResponse?.headers || {},
      };
    });

    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);

    const contentLength = res.headers?.['content-length'] ?? 'Unknown';
    const contentLengthKB =
      contentLength !== 'Unknown'
        ? (Number(contentLength) / 1024).toFixed(2) + ' KB'
        : 'Unknown';

    dispatch(
      setResponse({
        data: res?.data || {},
        status: res?.status || 500,
        statusText: res?.statusText || getStatusText(res.status),
        time: timeTaken + ' ms',
        size: contentLengthKB,
      }),
    );
  };

  const getInputText = useCallback(() => {
    let inputText = requestValue.url;
    const [baseUrl] = inputText.split('?');
    let detectedViarbles;

    if (baseUrl.includes('{{') && baseUrl.includes('}}')) {
      const matches = inputText.match(/{{(.*?)}}/g);
      detectedViarbles = matches
        ? matches.map((match) => match.slice(2, -2).trim())
        : [];
    }

    detectedViarbles?.forEach((variable) => {
      const variablePattern = new RegExp(`{{${variable}}}`, 'g');
      if (variables[variable]) {
        inputText = inputText.replace(variablePattern, variables[variable]);
      } else {
        inputText = inputText;
      }
    });

    return inputText;
  }, [requestValue, variables]);

  useEffect(() => {
    const newInputText = getInputText();
    if (newInputText !== requestValue.variablesUrl) {
      dispatch(setRequestValue({ variablesUrl: newInputText }));
    }
  }, [getInputText, requestValue.variablesUrl, dispatch]);

  //  disable send button
  useEffect(() => {
    setValue('url', requestValue.url);
    const inputText = getInputText();

    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (urlPattern.test(inputText)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [requestValue, setValue, getInputText]);

  const handleMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setRequestValue({
        http_method: e.target.value as DataType['http_method'],
      }),
    );
  };

  return (
    <div className={styles.request}>
      <div className={styles.requestName}>
        <HTTP className={styles.requestNameSVG} />
        <p className={styles.requestNameText}>{requestValue.url}</p>
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
              value={requestValue.http_method}
              onChange={handleMethodChange}
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
              value={requestValue.url}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <button
            className={
              isValid
                ? styles.createRequestButton
                : styles.createDisabledRequestButton
            }
            type="submit"
            disabled={!isValid}
          >
            {t('send')}
          </button>
        </form>
      </div>
    </div>
  );
}

function getStatusText(status: number) {
  let statusText;

  switch (status) {
    case 200:
      statusText = 'ok';
      break;
    case 201:
      statusText = 'created';
      break;
    case 204:
      statusText = 'no_content';
      break;
    case 400:
      statusText = 'bad_request';
      break;
    case 401:
      statusText = 'unauthorized';
      break;
    case 403:
      statusText = 'forbidden';
      break;
    case 404:
      statusText = 'not_found';
      break;
    case 405:
      statusText = 'method_not_allowed';
      break;
    case 408:
      statusText = 'request_timeout';
      break;
    case 409:
      statusText = 'conflict';
      break;
    case 415:
      statusText = 'unsupported_media_type';
      break;
    case 422:
      statusText = 'unprocessable_entity';
      break;
    case 429:
      statusText = 'too_many_requests';
      break;
    case 500:
      statusText = 'internal_server_error';
      break;
    case 502:
      statusText = 'bad_gateway';
      break;
    case 503:
      statusText = 'service_unavailable';
      break;
    case 504:
      statusText = 'gateway_timeout';
      break;
    default:
      statusText = 'unknown_status';
  }
  return statusText;
}
