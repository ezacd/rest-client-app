'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import styles from '@/app/_components/components-styles/ResponseSection.module.css';

export default function ResponseSection() {
  return (
    <section className={styles.responseSection}>
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
    const numberRegex = /(?<!")-?\b\d+\.\d+\b|\b\d+\b(?!")(?=\s*[^a-zA-Z])/g;

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
