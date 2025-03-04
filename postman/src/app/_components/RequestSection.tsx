'use client';

import CreateRequest from './CreateRequest';
import QueryParamsTable from './QueryParamsTable';
import styles from '@/app/_components/components-styles/SelectTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Headers from './Headers';
import { RootState } from '../_store/store';
import { setActiveTab } from '../_store/requestSlice';

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
      {activeTab === 'Params' ? <QueryParamsTable /> : <Headers />}
    </>
  );
}

function SelectTable() {
  const activeTab = useSelector((state: RootState) => state.request.activeTab);
  const dispatch = useDispatch();

  return (
    <div className={styles.selectBox}>
      <ul className={styles.selectBoxUl}>
        <li
          className={activeTab === 'Params' ? styles.active : ''}
          onClick={() => dispatch(setActiveTab('Params'))}
        >
          Params
        </li>
        <li
          className={activeTab === 'Headers' ? styles.active : ''}
          onClick={() => dispatch(setActiveTab('Headers'))}
        >
          Headers
        </li>
      </ul>
    </div>
  );
}
