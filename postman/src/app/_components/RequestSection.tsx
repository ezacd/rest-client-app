'use client';

import CreateRequest from './CreateRequest';
import styles from '@/app/_components/components-styles/SelectTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import { setActiveTab } from '../_store/requestSlice';
import ParamsTable from './ParamsTable';
import { useTranslations } from 'next-intl';

export type Param = {
  key: string;
  value: string;
  checked: boolean;
};

export default function RequestSection() {
  const activeTab = useSelector((state: RootState) => state.request.activeTab);
  return (
    <>
      <CreateRequest />
      <SelectTable />
      {activeTab === 'Params' ? (
        <QueryParamsTable />
      ) : activeTab === 'Headers' ? (
        <HeadersTable />
      ) : (
        <ViarblesTable />
      )}
    </>
  );
}

function SelectTable() {
  const activeTab = useSelector((state: RootState) => state.request.activeTab);
  const dispatch = useDispatch();
  const t = useTranslations('HomePage');

  return (
    <div className={styles.selectBox}>
      <ul className={styles.selectBoxUl}>
        <li
          className={activeTab === 'Params' ? styles.active : ''}
          onClick={() => dispatch(setActiveTab('Params'))}
        >
          {t('query-params')}
        </li>
        <li
          className={activeTab === 'Headers' ? styles.active : ''}
          onClick={() => dispatch(setActiveTab('Headers'))}
        >
          {t('headers')}
        </li>
        <li
          className={activeTab === 'Viarbles' ? styles.active : ''}
          onClick={() => dispatch(setActiveTab('Viarbles'))}
        >
          {t('viarbles')}
        </li>
      </ul>
    </div>
  );
}

function HeadersTable() {
  return <ParamsTable title="headers" paramType="headersParams" />;
}

function QueryParamsTable() {
  return (
    <ParamsTable title="query-params" paramType="params" updateRequestParams />
  );
}

function ViarblesTable() {
  return <ParamsTable title="viarbles" paramType="viarbles" />;
}
