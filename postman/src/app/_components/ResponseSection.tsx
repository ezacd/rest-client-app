'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import styles from '@/app/_components/components-styles/ResponseSection.module.css';
import Copy from '@/assets/icons/copy.svg';
import Check from '@/assets/icons/check.svg';

export default function ResponseSection() {
  return (
    <section className={styles.responseSection}>
      <ResponseData />
      <JsonViewer />
    </section>
  );
}

function JsonViewer() {
  const response = useSelector((state: RootState) => state.request.response);
  const json = JSON.stringify(response.data, null, 2);

  const styleJson = (json: string) => {
    const keyRegex = /"([^"]+)":/g;
    const stringRegex = /"([^"]+)"(?=\s*[:\s,}])(?![^<]*<\/span>)/g;
    const numberRegex = /(?<!["\/.])(?:-?\b\d+\.\d+\b|\b\d+\b)(?!["\/a-zA-Z])/g;
    let styledJson = json.replace(keyRegex, (match, p1) => {
      return `<span class="${styles.jsonKey}">"${p1}":</span>`;
    });

    styledJson = styledJson.replace(stringRegex, (match, p1) => {
      return `<span class="${styles.jsonString}">"${p1}"</span>`;
    });

    styledJson = styledJson.replace(numberRegex, (match) => {
      return `<span class="${styles.jsonNumber}">${match}</span>`;
    });

    return styledJson;
  };

  return (
    <pre
      className={styles.jsonViewer}
      dangerouslySetInnerHTML={{ __html: styleJson(json) }}
    />
  );
}

function ResponseData() {
  const response = useSelector((state: RootState) => state.request.response);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const jsonData = JSON.stringify(response.data, null, 2);
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const statusClass =
    response.status >= 400 ? styles.errorStatus : styles.successStatus;

  return (
    <div className={styles.responseContainer}>
      <ul className={styles.responseList}>
        <li className={`${styles.status} ${statusClass}`}>
          {response.status} {response.statusText || 'OK'}
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
