import Code from '@/assets/icons/code.svg';
import styles from '@/app/_components/asideMenu/asideMenuButtons/CodeGeneration.module.css';
import { useTranslations } from 'next-intl';

export default function CodeGeneration() {
  const t = useTranslations('HomePage');

  return (
    <>
      {' '}
      <button className={styles.asideButton}>
        <Code className={styles.asideSVG} />
        <p className={styles.asideButtonsText}>{t('code')}</p>
      </button>
    </>
  );
}
