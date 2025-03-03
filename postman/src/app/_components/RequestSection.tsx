'use client';

import { useState } from 'react';
import CreateRequest from './CreateRequest';
import QueryParamsTable from './QueryParamsTable';
import styles from '@/app/_components/components-styles/SelectTable.module.css';
// Импортируем Headers (если его нет, нужно создать)
import Headers from './Headers';

export type Param = {
  key: string;
  value: string;
  checked: boolean;
};

export default function RequestSection() {
  const [requestValue, setRequestValue] = useState('');
  const [params, setParams] = useState<Param[]>([
    { key: '', value: '', checked: true },
  ]);
  const [activeTab, setActiveTab] = useState('Params');
  const [headersParams, setHeadersParams] = useState<Param[]>([
    { key: '', value: '', checked: true },
  ]);

  return (
    <>
      <CreateRequest
        requestValue={requestValue}
        setRequestValue={setRequestValue}
        setParams={setParams}
      />
      <SelectTable activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Params' ? (
        <QueryParamsTable
          requestValue={requestValue}
          setRequestValue={setRequestValue}
          params={params}
          setParams={setParams}
        />
      ) : (
        <Headers
          headersParams={headersParams}
          setHeadersParams={setHeadersParams}
        />
      )}
    </>
  );
}

type SelectTableProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

function SelectTable({ activeTab, setActiveTab }: SelectTableProps) {
  return (
    <div className={styles.selectBox}>
      <ul className={styles.selectBoxUl}>
        <li
          className={activeTab === 'Params' ? styles.active : ''}
          onClick={() => setActiveTab('Params')}
        >
          Params
        </li>
        <li
          className={activeTab === 'Headers' ? styles.active : ''}
          onClick={() => setActiveTab('Headers')}
        >
          Headers
        </li>
      </ul>
    </div>
  );
}
