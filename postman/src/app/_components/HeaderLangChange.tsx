'use client';

import LangLogo from '@/assets/icons/lang.svg';
import styles from '@/app/page.module.css';
import { useState, useEffect } from 'react';

type Lang = 'EN' | 'RU';

export default function HeaderLangChange() {
  const [lang, setLang] = useState<Lang>('EN');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const lsLang = localStorage.getItem('lang') as Lang;
    if (lsLang) {
      setLang(lsLang);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('lang', lang);
    }
  }, [lang, isMounted]);

  const handleClick = () => {
    setLang((prevLang) => (prevLang === 'EN' ? 'RU' : 'EN'));
  };

  return (
    <div className={styles.langBox}>
      <LangLogo
        className={`${styles.langLogo} ${styles.headerSvg}`}
        onClick={handleClick}
      />
      <p className={styles.lang}>{isMounted ? lang : '...'}</p>
    </div>
  );
}
