'use client';

import { useState } from 'react';
import CreateRequest from './CreateRequest';
import QueryParamsTable from './QueryParamsTable';

export default function RequestSection() {
  const [requestValue, setRequestValue] = useState('');
  return (
    <>
      <CreateRequest
        requestValue={requestValue}
        setRequestValue={setRequestValue}
      />
      <QueryParamsTable
        requestValue={requestValue}
        setRequestValue={setRequestValue}
      />
    </>
  );
}
