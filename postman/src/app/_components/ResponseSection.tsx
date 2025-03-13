'use client';

import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import { FixedSizeList as List } from 'react-window';
import styles from '@/app/_components/ResponseSection.module.css';
import Copy from '@/assets/icons/copy.svg';
import Check from '@/assets/icons/check.svg';
import { useTranslations } from 'next-intl';

export default function ResponseSection() {
  return (
    <section className={styles.responseSection}>
      <ResponseData />
      <JsonViewerMemoized />
    </section>
  );
}

function JsonViewer() {
  const responseData = useSelector(
    (state: RootState) => state.request.response.data,
  );

  const styleJson = (json: string) => {
    const keyRegex = /"([^"]+)"\s*:/g;
    const stringRegex = /:\s*"([^"]*)"|(?<=\[)([^"]+)(?=\])/g;
    const numberRegex = /(?<![\d/"\s])\b\d+(\.\d+)?\b(?![\d"\/\s])/g;

    return json
      .replace(stringRegex, (match, p1) => {
        return `: <span class="${styles.jsonString}">"${p1}"</span>`;
      })
      .replace(keyRegex, (match, p1) => {
        return `<span class="${styles.jsonKey}">"${p1}"</span>:`;
      })
      .replace(numberRegex, (match) => {
        return `<span class="${styles.jsonNumber}">${match}</span>`;
      });
  };

  const json = useMemo(
    () => JSON.stringify(responseData, null, 2),
    [responseData],
  );
  const jsonLines = useMemo(() => json.split(/\r?\n/), [json]);

  return (
    <div className={styles.jsonViewer}>
      <List
        height={500}
        itemCount={jsonLines.length}
        itemSize={20}
        width="100%"
      >
        {({ index, style }) => (
          <pre
            style={style}
            className={styles.jsonLine}
            dangerouslySetInnerHTML={{ __html: styleJson(jsonLines[index]) }}
          />
        )}
      </List>
    </div>
  );
}

const JsonViewerMemoized = React.memo(JsonViewer);

function ResponseData() {
  const response = useSelector((state: RootState) => state.request.response);
  const [copied, setCopied] = useState(false);
  const t = useTranslations('HomePage');

  const handleCopy = async () => {
    try {
      const jsonData = JSON.stringify(response.data, null, 2);
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const statusClass =
    response.status >= 400 ? styles.errorStatus : styles.successStatus;

  return (
    <div className={styles.responseContainer}>
      <ul className={styles.responseList}>
        <li className={`${styles.status} ${statusClass}`}>
          {response.status} {t(response.statusText || 'ok')}
        </li>
        <li>{response.time}</li>
        <li>{response.size}</li>
        <li className={styles.copy} onClick={handleCopy}>
          {copied ? <Check /> : <Copy />}
        </li>
      </ul>
    </div>
  );
}
