import HistorySvg from '@/assets/icons/history.svg';
import styles from '@/app/_components/asideMenu/asideMenuButtons/History.module.css';
import { useTranslations } from 'next-intl';

export default function History() {
  const t = useTranslations('HomePage');

  const handleClick = () => {};

  return (
    <>
      {' '}
      <button className={styles.asideButton} onClick={handleClick}>
        <HistorySvg className={styles.asideSVG} />
        <p className={styles.asideButtonsText}>{t('history')}</p>
      </button>
    </>
  );
}
