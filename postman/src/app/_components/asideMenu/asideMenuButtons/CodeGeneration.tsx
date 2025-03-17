import HistorySvg from '@/assets/icons/history.svg';
import styles from '@/app/_components/asideMenu/asideMenuButtons/CodeGeneration.module.css';
import { useTranslations } from 'next-intl';
import CloseSvg from '@/assets/icons/close.svg';
import Copy from '@/assets/icons/copy.svg';
import Check from '@/assets/icons/check.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/_store/store';
import HTTPSnippet from 'httpsnippet';

type BurgerMenuState = {
  isOpen: boolean;
  menuType: 'history' | 'codeGeneration' | null;
};

type HistoryProps = {
  burgerMenu: BurgerMenuState;
  setBurgerMenu: (value: BurgerMenuState) => void;
};

type setHistoryProps = {
  setBurgerMenu: (value: BurgerMenuState) => void;
};

export default function Code({ burgerMenu, setBurgerMenu }: HistoryProps) {
  const t = useTranslations('HomePage');

  const handleClick = () => {
    setBurgerMenu({
      isOpen: !burgerMenu.isOpen,
      menuType: 'codeGeneration',
    });
  };

  return (
    <>
      <button className={styles.asideButton} onClick={handleClick}>
        <HistorySvg className={styles.asideSVG} />
        <p className={styles.asideButtonsText}>{t('code')}</p>
      </button>
    </>
  );
}

export function CodeGenerationAsideMenu({ setBurgerMenu }: setHistoryProps) {
  const t = useTranslations('HomePage');
  const requestValue = useSelector(
    (state: RootState) => state.request.requestValue,
  );
  const headersProps = useSelector(
    (state: RootState) => state.request.headersParams,
  );
  const body = useSelector((state: RootState) => state.request.body);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [lang, setLang] = useState('jsFetch');

  const handleClick = () => {
    setBurgerMenu({ isOpen: false, menuType: 'codeGeneration' });
  };
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const jsonData = JSON.stringify(codeSnippet, null, 2);
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    try {
      const request = {
        method: requestValue.http_method,
        url: requestValue.url,
        headers: headersProps.map((header) => ({
          name: header.key,
          value: header.value,
        })),
        postData: {
          mimeType: 'application/json',
          text: JSON.stringify(
            body
              .filter((item) => item.checked)
              .map(({ key, value }) => ({ key, value })),
          ),
        },
        httpVersion: 'HTTP/1.1',
        cookies: [],
        queryString: [],
        headersSize: 0,
        bodySize: body ? body.length : 0,
      };

      const snippet = new HTTPSnippet(request);

      let generatedCode;
      if (lang === 'jsXHR') {
        generatedCode = snippet.convert('javascript', 'xhr') || '';
      } else if (lang === 'jsFetch') {
        generatedCode = snippet.convert('javascript', 'fetch') || '';
      } else {
        generatedCode = snippet.convert(lang) || '';
      }

      setCodeSnippet(generatedCode);
    } catch {}
  }, [requestValue, headersProps, body, lang]);

  return (
    <div className={styles.codeGenerationSectionBox}>
      <h2 className={styles.codeGenerationH2}>{t('codeGeneration')}</h2>
      <div className={styles.closeSvgBox} onClick={handleClick}>
        <CloseSvg className={styles.closeSvg} />
      </div>
      <div className={styles.codeGenerationSection}>
        <div className={styles.codeGenerationSectionHeader}>
          <select
            className={styles.selectMethod}
            id="select-lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option className={styles.selectMethodOptionPost} value="jsFetch">
              JavaScript (Fetch api)
            </option>
            <option className={styles.selectMethodOptionPut} value="jsXHR">
              JavaScript (XHR)
            </option>
            <option className={styles.selectMethodOptionDelete} value="node">
              NodeJS
            </option>
            <option className={styles.selectMethodOptionPatch} value="python">
              Python
            </option>
            <option className={styles.selectMethodOptionHead} value="java">
              Java
            </option>
            <option className={styles.selectMethodOptionOptiont} value="csharp">
              C#
            </option>
            <option className={styles.selectMethodOptionOptiont} value="go">
              Go
            </option>
          </select>
          <div
            className={styles.codeGenerationSectionCopy}
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </div>
        </div>
        <pre>{codeSnippet}</pre>
      </div>
    </div>
  );
}
