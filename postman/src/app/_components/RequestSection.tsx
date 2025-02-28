'use client';

import { useState } from 'react';
import CreateRequest from './CreateRequest';
import QueryParamsTable from './QueryParamsTable';

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
  return (
    <>
      <CreateRequest
        requestValue={requestValue}
        setRequestValue={setRequestValue}
        setParams={setParams}
      />
      <QueryParamsTable
        requestValue={requestValue}
        setRequestValue={setRequestValue}
        params={params}
        setParams={setParams}
      />
    </>
  );
}
